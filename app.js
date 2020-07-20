'use strict';
// Import express framework
const express = require('express');
const mongoose = require('mongoose');

let indexRouter = require('./routes/index');
let imageRouter = require('./routes/image');

// Initialize express
const app = express();

// Set up a view engine
app.set('view engine', 'ejs');

// Set a static folder
app.use(express.static('public'));

// body parser middleware
app.use(express.json())

// Define the index router
app.use('/', indexRouter);
app.use('/image', imageRouter);


// Connecting to the Database

let mongodb_url = 'mongodb://mongo/';
let dbName = 'darkroom';
mongoose.connect(mongodb_url + dbName, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error) => {
   console.log(error);
})

// Define the port number
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);