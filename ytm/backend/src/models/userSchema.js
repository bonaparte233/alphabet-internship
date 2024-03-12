const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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