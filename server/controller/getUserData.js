const fetch = require("node-fetch")

async function getUserData (req, res) {
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
  }
module.exports = getUserData