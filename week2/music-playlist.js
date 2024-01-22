// task4

class MusicPlaylist {
    constructor() {
        this.tracks = [];
    }

    add(track, position) {
        if (position === undefined || position >= this.tracks.length) {
            this.tracks.push(track);
        } else {
            this.tracks.splice(position, 0, track);
        }
    }

    remove(track) {
        const index = this.tracks.indexOf(track);
        if (index > -1) {
            this.tracks.splice(index, 1);
        }
    }

    display() {
        console.log("Playlist:");
        this.tracks.forEach((track, index) => {
            console.log(`${index + 1}: ${track}`);
        });
    }
}

module.exports = MusicPlaylist;
