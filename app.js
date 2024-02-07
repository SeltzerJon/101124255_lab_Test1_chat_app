const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));;

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.send('Error signing up');
        } else {
            res.send('Signed up successfully!');
        }
    });
});
