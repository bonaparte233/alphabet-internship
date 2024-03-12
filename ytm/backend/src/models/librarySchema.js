const mongoose = require('mongoose');


const libraryIndexSchema = new mongoose.Schema({
    track_id: {
        type: String,
        required: true
    },
    title: String,
    artist: [String],
    album: String,
    album_id: String,
    genre: String,
    copyright: String,
    length: String,
    track_number: Number,
    quality: {
        type: String,
        default: 'STD'
    },
    file: String
});

const LibraryIndex = mongoose.model('LibraryIndex', libraryIndexSchema);

function createUserLibraryModel(uid) {
    const userLibrarySchema = new Schema({
        type: {
            type: String,
            enum: ['track', 'album', 'playlist'],
            required: true
        },
        id: {
            type: String,
            required: true
        },
        added_date: Number
    });

    return mongoose.model(`u_${uid}`, userLibrarySchema);
}

module.exports = { LibraryIndex, createUserLibraryModel };