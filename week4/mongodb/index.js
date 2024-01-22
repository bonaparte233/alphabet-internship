const { User, LibraryIndex, createUserLibraryModel, PlaylistIndex, createPlaylistModel } = require('./database');
const fs = require('fs-extra');
const mm = require('music-metadata');
const crypto = require('crypto');
const jpeg = require('jpeg-js');
const path = require('path');
const os = require('os');

async function libraryInit(libraryPath) {
    const files = await getMP3Files(libraryPath);
    const indexFilePath = path.join(libraryPath, 'index.json');
    const poolSize = os.cpus().length;
    const processingPool = new Array(poolSize).fill(Promise.resolve());

    await Promise.all(files.map(file => {
        return (async () => {
            const freeIndex = await Promise.race(processingPool.map((p, index) => p.then(() => index)));
            processingPool[freeIndex] = processFile(file, libraryPath)
                .then(data => {
                const libraryEntry = new LibraryIndex(data);
                return libraryEntry.save();
                })
                .then(data => {
                    console.log(`Index Created: ${data.track_id} ${file}`);
                });
        })();
    }));

    await Promise.all(processingPool);
}

async function getMP3Files(directory) {
    let files = [];

    async function readDirectory(directory) {
        const dirContents = await fs.readdir(directory, { withFileTypes: true });
        await Promise.all(dirContents.map(async (dirent) => {
            if (dirent.isDirectory()) {
                await readDirectory(path.join(directory, dirent.name));
            } else if (dirent.isFile() && dirent.name.endsWith('.mp3')) {
                files.push(path.join(directory, dirent.name));
            }
        }));
    }

    await readDirectory(directory);
    return files;
}

async function processFile(filePath, libraryPath) {
    const metadata = await mm.parseFile(filePath);
    const tags = metadata.common;

    const track_id = crypto.createHash('md5').update(`${tags.artist}${tags.title}${tags.album}`).digest('hex').substring(0, 16);

    const data = {
        track_id: track_id,
        title: tags.title || '',
        artist: tags.artist ? tags.artist.split(/,|;|\//) : [],
        album: tags.album || '',
        album_id: crypto.randomBytes(16).toString('hex'),
        genre: tags.genre ? tags.genre.join(', ') : '',
        copyright: tags.copyright || '',
        length: metadata.format.duration ? formatDuration(metadata.format.duration) : '00:00',
        track_number: tags.track.no || 0,
        quality: 'STD',
        file: filePath
    };

    if (tags.picture && tags.picture.length > 0) {
        const coverPath = path.join(libraryPath, 'cover', `${data.album_id}.jpg`);
        const jpegData = jpeg.encode({ data: tags.picture[0].data, width: tags.picture[0].width, height: tags.picture[0].height }, 100);
        await fs.writeFile(coverPath, jpegData.data);
    }

    return data;
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function libraryLoad(filePath) {
    try {
        const tracks = await LibraryIndex.find();
        return tracks.reduce((lib, track) => {
            lib[track.track_id] = track;
            return lib;
        }, {});
    } catch (error) {
        throw new Error(`Error loading library: ${error.message}`);
    }
}

async function libraryUpdate(lib, libraryPath) {
    const existingFiles = await getMP3Files(libraryPath);
    const updatedLib = {};

    for (const filePath of existingFiles) {
        const track_id = await getTrackIdFromFilePath(filePath);
        let track = await LibraryIndex.findOne({ track_id: track_id });

        if (!track) {
            const trackData = await processFile(filePath, libraryPath);
            track = new LibraryIndex(trackData);
            await track.save();
        }
        updatedLib[track.track_id] = track;
    }
    const allTrackIds = Object.keys(updatedLib);
    await LibraryIndex.deleteMany({ track_id: { $nin: allTrackIds } });

    return updatedLib;

}

async function getTrackIdFromFilePath(filePath) {
    try {
        const metadata = await mm.parseFile(filePath);
        const tags = metadata.common;
        const artist = tags.artist || '';
        const title = tags.title || '';
        const album = tags.album || '';

        return crypto.createHash('md5')
            .update(`${artist}${title}${album}`)
            .digest('hex')
            .substring(0, 16);
    } catch (error) {
        throw new Error(`Error extracting track ID from file path: ${error.message}`);
    }
}


async function main() {
    const libraryPath = './Library';

    try {
        const trackCount = await LibraryIndex.countDocuments();
        if (trackCount > 0) {
            console.log('Library data found in database. Updating library...');
            const lib = await libraryLoad();
            await libraryUpdate(lib, libraryPath);
        } else {
            console.log('Initializing library...');
            await libraryInit(libraryPath);
        }
    } catch (error) {
        throw error
    }
}

main();
