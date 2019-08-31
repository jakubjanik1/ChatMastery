import './config/env';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import chatRoutes from './routes/chat';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';
import { notFound, catchErrors } from './middlewares/errors';
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false });
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
    app.use(/\/[^\/]+/, (req, res, next) => {
        if (req.header('Referer')) {
            return next();
        }
    
        return res.redirect('/');
    });

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get(/^(\/|\/users\/resetPassword\/.+)$/, (req, res) => {
        return res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
} 

app.use('/chat', chatRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

app.use(notFound);
app.use(catchErrors);

export default app;