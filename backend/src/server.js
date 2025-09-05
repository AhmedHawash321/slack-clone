import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

console.log('mongo uri:', process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})