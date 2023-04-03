const fetch = require('node-fetch');
const CLIENT_SECRET = "f7385cd8126984315aee792b2f2c38add8c759f4";
const CLIENT_ID = "4b7feddfcd88aa615d89";

async function getAccessToken (req, res) {
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
}

module.exports = getAccessToken;
