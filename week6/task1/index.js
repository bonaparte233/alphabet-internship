const fs = require('fs-extra');
const mm = require('music-metadata');
const crypto = require('crypto');
const jpeg = require('jpeg-js');
const path = require('path');
const os = require('os');
const playlists = {};

async function libraryInit(libraryPath) {
    const files = await getMP3Files(libraryPath);
    const indexFilePath = path.join(libraryPath, 'index.json');
    const playlistFilePath = path.join(libraryPath, 'playlists.json');
    const poolSize = os.cpus().length;
    const processingPool = new Array(poolSize).fill(Promise.resolve());
    await Promise.all(files.map(file => {
        return (async () => {
            const freeIndex = await Promise.race(processingPool.map((p, index) => p.then(() => index)));
            processingPool[freeIndex] = processFile(file, libraryPath)
                .then(data => {
                    return fs.appendFile(indexFilePath, JSON.stringify(data) + '\n')
                        .then(() => data);
                })
                .then(data => {
                    console.log(`Index Created: ${data.track_id} ${file}`);
                });
        })();
    }));

    await Promise.all(processingPool);

    // Write playlists to file
    await fs.writeFile(playlistFilePath, JSON.stringify(playlists));
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

    // Create a playlist for each album
    if (tags.album) {
        if (!playlists[tags.album]) {
            playlists[tags.album] = {
                pid: crypto.randomBytes(16).toString('hex'),
                tracks: []
            };
        }
        playlists[tags.album].tracks.push(track_id);
    }

    if (tags.picture && tags.picture.length > 0) {
        const coverPath = path.join(libraryPath, 'cover', `${data.album_id}.jpg`);
        const jpegData = jpeg.encode({ data: tags.picture[0].data, width: tags.picture[0].width, height: tags.picture[0].height }, 100);
        await fs.writeFile(coverPath, jpegData.data);
    }

    return data;
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

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function libraryLoad(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const tracks = fileContent.trim().split('\n').map(line => JSON.parse(line));
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
    const existingFilePaths = new Set(existingFiles);
    const updatedLib = {};

    for (const filePath of existingFiles) {
        let track = lib[getTrackIdFromFilePath(filePath)];
        if (!track) {
            track = await processFile(filePath, libraryPath);
            await fs.appendFile(path.join(libraryPath, 'index.json'), JSON.stringify(track) + '\n');
        }
        updatedLib[track.track_id] = track;
    }

    for (const track_id in lib) {
        if (lib.hasOwnProperty(track_id) && !existingFilePaths.has(lib[track_id].file)) {
            console.log(`Removing track: ${track_id}`);
            continue;
        }
        updatedLib[track_id] = lib[track_id];
    }

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
    const indexPath = path.join(libraryPath, 'index.json');

    try {
        await fs.access(indexPath, fs.constants.F_OK);
        const lib = await libraryLoad(indexPath);
        await libraryUpdate(lib, libraryPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Index file not found. Initializing library...');
            await libraryInit(libraryPath);
        } else {
            throw error;
        }
    }
}

main();
