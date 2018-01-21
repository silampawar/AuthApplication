const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const router = require("./router");
//DB setup 
mongoose.connect('mongodb://silam:silam@ds046357.mlab.com:46357/authapplication?replicaSet=rs-ds046357');
console.log('DB_URL:',process.env.DB_URL);
console.log('secret:',process.env.SECRET);
//mongoose.connect(process.env.DB_URL);
//authapplication-tztcv
//mongoose.connect('mongodb://localhost:27017/auth');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // supp

//App setup
router(app);
app.use(morgan('combined'));
//server setup

const port = process.env.PORT | 3081;
const server  = http.createServer(app)
server.listen(port);
