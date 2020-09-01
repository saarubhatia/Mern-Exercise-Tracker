const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

//MONGODB 
const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://mern123:mern123@cluster0.nqdnp.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use('./exercises', exercisesRouter);
app.use('./users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port' : ${port}`);
});