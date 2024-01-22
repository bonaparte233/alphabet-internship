const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/27017/database', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// User
const userSchema = new Schema({
    uid: String,
    name: String,
    secret: String,
    subscribe: {
        type: String,
        default: 'Premium'
    },
    subscribe_expired: Number,
    last_login: Number,
    playing: String
});

const User = mongoose.model('User', userSchema);

// Library
const libraryIndexSchema = new Schema({
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

// Playlist
const playlistIndexSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    added: Number,
    liked: Number,
    shared: Number,
    played: Number,
    public: Boolean,
    image: String,
    type: {
        type: String,
        enum: ['playlist', 'album']
    },
    last_update: Date
});

const PlaylistIndex = mongoose.model('PlaylistIndex', playlistIndexSchema);

function createPlaylistModel(pid) {
    const playlistSchema = new Schema({
        track_id: {
            type: String,
            required: true
        },
        order: Number
    });

    return mongoose.model(`p_${pid}`, playlistSchema);
}

module.exports = User, LibraryIndex, createUserLibraryModel, PlaylistIndex, createPlaylistModel;
