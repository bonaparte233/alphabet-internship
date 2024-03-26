const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb.orb.local:27017/music', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));






