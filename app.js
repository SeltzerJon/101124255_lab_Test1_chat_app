const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());


// K8gFPXYMjDjbKw5u
mongoose.connect('');

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

app.post('/login', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
        //   Hash passwords securely
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          req.session.user = user;
          res.status(200).json({ message: 'Login successful' });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        res.status(200).json({ message: 'Logout successful' });
        }
    });
    });
});
