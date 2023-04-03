var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");
require("dotenv").config();
const API_TOKEN = process.env.API_TOKEN;
CLIENT_SECRET = "f7385cd8126984315aee792b2f2c38add8c759f4";
CLIENT_ID = "4b7feddfcd88aa615d89";

var app = express();
app.use(cors());
app.use(bodyParser.json());


const getAccessToken = require("./controller/getAccessToken");
app.get("/getAccessToken", getAccessToken);

const getPrivateIssues = require("./controller/getPrivateIssues")
app.get("/getPrivateIssues", getPrivateIssues);

const patchData = require("./controller/patchData")
app.patch("/patchData", patchData);

const createIssue = require("./controller/createIssue")
app.post("/createIssue", createIssue);


const getUserData = require("./controller/getUserData")
app.get("/getUserData", getUserData);


app.listen(4000, function () {
  console.log("listening on http://localhost:4000");
});
