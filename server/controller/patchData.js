const fetch = require("node-fetch");
require("dotenv").config();
const API_TOKEN = process.env.API_TOKEN;

async function patchData(req, res) {
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
}

module.exports = patchData;
