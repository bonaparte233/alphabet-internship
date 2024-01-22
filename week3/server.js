// Task 3
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h2>Welcome to the Login and Signup App</h2>');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

function encrypt(secret) {
    const cipher = crypto.createCipher('aes-128-ecb', 'this_is_a_secret_key');
    let encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

app.post('/login', (req, res) => {
    const user = req.body.user;
    const encryptedSecret = encrypt(req.body.secret);
    const remember = req.body.remember === 'on';
    console.log({ user, encryptedSecret, remember });
    res.send('Login successful');
});

app.post('/signup', (req, res) => {
    const user = req.body.user;
    const encryptedSecret = encrypt(req.body.secret);
    const secret2 = encrypt(req.body.secret2);
    if (encryptedSecret !== secret2) {
        return res.send('Passwords do not match');
    }
    console.log({ user, encryptedSecret });
    res.send('Signup successful');
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:8080`);
});
