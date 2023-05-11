require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let PORT = 3001 || process.env.PORT;
const mongoose = require('mongoose');

// Importing our routes
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/user');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using our routes
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

//Connect to the DB with mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err))


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

module.exports = app;
