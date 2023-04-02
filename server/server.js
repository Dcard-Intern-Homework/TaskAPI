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

app.get("/getAccessToken", async function (req, res) {
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("http://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.get("/getPrivateIssues", async function (req, res) {
  const page = req.query.page;
  await fetch(
    "https://api.github.com/search/issues?q=author:YouMingYeh&per_page=10&page=" +
      page,
    {
      method: "GET",
      headers: {
        Authorization: req.get("Authorization"),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.patch("/patchData", async function (req, res) {
  const data = req.body;
  const body = {
    title: data.title,
    body: data.body,
    state: data.state,
    labels: data.labels,
  };

  await fetch(data.url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + API_TOKEN,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.post("/createIssue", async function (req, res) {
  const { owner, repo, title, body, state } = req.body;

  const postBody = {
    title: title,
    body: body,
    labels: [state],
  };

  await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_TOKEN,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify(postBody),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.get("/getUserData", async function (req, res) {
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.post("/postNewIssue", async function (req, res) {
  const data = req.body;
  const body = {
    title: data.title,
    body: data.body,
    state: data.state,
    labels: data.labels,
  };

  await fetch("https://api.github.com/user", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_TOKEN,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.listen(4000, function () {
  console.log("listening on http://localhost:4000");
});
