require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const chatRoutes = require('./routes/chat');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to MongoDB.'));
db.on('open', () => console.log('Connect to MongoDB successfully.'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV == 'development') {
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 172800000
    }
});

app.use(sessionConfig);
app.set('session', sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('/', (req, res) => {
        return res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
} 

app.use('/chat', chatRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

module.exports = app;