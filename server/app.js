require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const chatRoutes = require('./routes/chat');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const app = express();

mongoose.connect('mongodb://localhost/chatmastery', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to MongoDB.'));
db.on('open', () => console.log('Connect to MongoDB successfully.'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 172800000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/chat', chatRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.listen(8080, () => console.log('Server listening...'));

module.exports = app;