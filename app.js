const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');


const connectDB = require('./config/db');


connectDB();


const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

//Routes
app.use('/users', require('./routes/userRoute'));

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})