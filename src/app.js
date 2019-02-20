const Session = require("express-session");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const routes = require("./router");
const app = express();

global.appRoot = path.resolve(__dirname);
global.isDev = process.argv[2] && process.argv[2] === "dev";
const port = process.env.__PORT__ || config.get("port") || 3000;

//use session for interaction and authentication
const session = {
  secret: config.get("secret"),
  cookie: { maxAge: 30 * 60 * 1000, httpOnly: false },
  resave: true,
  saveUninitialized: true,
  error: "",
  success: "",
  isLoading: false
};

//set EJS as rendering engine
app.set("view engine", "ejs");

//nodejs-specific stuff
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.use(Session(session));
app.use("/", routes);

/* serve app */
app.listen(port, console.log("Listening on port", port));
