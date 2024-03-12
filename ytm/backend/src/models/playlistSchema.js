const mongoose = require('mongoose');

const playlistIndexSchema = new mongoose.Schema({
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
  added: {
    type: Number,
    default: 0
  },
    liked: {
      type: Number,
      default: 0
    },
    shared: {
      type: Number,
      default: 0
    },
    played: {
      type: Number,
      default: 0
    },
  public: {
    type: Boolean,
    default: true
  },
    image: String,
    type: {
        type: String,
        enum: ['playlist', 'album']
    },
    last_update: Date
});

const PlaylistIndex = mongoose.model('PlaylistIndex', playlistIndexSchema);

function createPlaylistModel(pid) {
    const playlistSchema = new mongoose.Schema({
        track_id: {
            type: String,
            required: true
        },
        order: Number
    });

    return mongoose.model(`p_${pid}`, playlistSchema);
}

module.exports = { PlaylistIndex, createPlaylistModel };