const { readdirSync } = require('fs');
const express = require('express');
require('dotenv').config();
const app = express();


const mongoose = require('mongoose');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(hpp());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, )
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});


readdirSync("./src/routes").map(file => app.use('/api/v1', require(`./src/routes/${file}`)));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
