const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/chatmastery', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to MongoDB.'));
db.on('open', () => console.log('Connect to MongoDB successfully.'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(8080, () => console.log('Server listening...'));