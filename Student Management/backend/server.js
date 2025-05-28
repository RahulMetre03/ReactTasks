import db from './config/db.js';
import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

console.log('SECRET_KEY:', process.env.SECRET_KEY);



const app = express();
const port = 5000;
app.use(cors());

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database ✅');
});

app.use(express.json());      // for parsing JSON bodies
app.use('/api', router);      // mount your routes under /api

app.get('/', (req, res) => {
    res.send('Hello! Backend is working 🚀');
});

app.listen(port, () => {
    console.log(`Backend is setup on port ${port}`);
});
