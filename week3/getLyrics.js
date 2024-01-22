// Task 4
const axios = require('axios');

// set API key
const apiKey = '072ab0c4700a1c9f9d593962c1d9c0da';

// music info
const artistName = 'FIFTY FIFTY';
const trackName = 'Cupid - Twin Ver.';
const albumName = 'The Beginning';

// 获取歌词的函数
const getLyrics = async () => {
    try {
        const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${encodeURIComponent(trackName)}&q_artist=${encodeURIComponent(artistName)}&apikey=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.message.header.status_code !== 200) {
            throw new Error('Failed to retrieve lyrics');
        }

        const lyrics = response.data.message.body.lyrics.lyrics_body;
        console.log(lyrics);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

getLyrics();
