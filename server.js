const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const authRouter = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');
const app = express(); 

const allowedOrigins = [process.env.ORIGIN];
app.use(cors({
    origin: function (origin, callback) {
      // allow requests from allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      // do not allow requests without an origin (like curl or mobile app requests)
      if (!origin) {
        return callback(new Error('Not allowed by CORS'), false);
      }
      // otherwise, deny the request
      return callback(new Error('Not allowed by CORS'), false);
    }
  }));

// app.use(express.cors());

// get the body data middleware
app.use(express.json());

//auth router middleware
app.use('/api/auth', authRouter);

//task router middleware
app.use('/api/tasks', taskRouter);

// set up mongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => {
    console.log('Connected to MongoDB');
    // start the server
    app.listen(process.env.PORT, () => console.log(`Server listening on PORT: ${process.env.PORT}`));
})
.catch((e) => {
    console.log({error: e.message});
});