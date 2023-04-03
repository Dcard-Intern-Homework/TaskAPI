const fetch = require("node-fetch");
require("dotenv").config();
const API_TOKEN = process.env.API_TOKEN;

async function createIssue(req, res) {
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
}

module.exports = createIssue;
