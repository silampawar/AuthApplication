const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const router = require("./router");
//DB setup 

mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // supp

//App setup
router(app);
app.use(morgan('combined'));
//server setup

const port = process.env.PORT || 3081;
const server  = http.createServer(app)
server.listen(port);
console.log('Server started.. listening on ',process.env.PORT)