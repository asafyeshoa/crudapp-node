const express = require('express');
// dotenv allows you to separate secrets from your source code
const dotenv = require('dotenv');
// simplifies the process of logging requests to your application.
const morgan = require('morgan');
// responsible for parsing the incoming request bodies in a middleware before you handle it
const bodyparser = require("body-parser");

const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
