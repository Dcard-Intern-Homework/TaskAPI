// in ./controller/getPrivateIssues.js
const fetch = require("node-fetch");

async function getPrivateIssues(req, res) {
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
}

module.exports = getPrivateIssues;
