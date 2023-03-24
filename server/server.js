var express = require('express');
var cors = require('cors')
const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')


const CLIENT_ID = "4b7feddfcd88aa615d89"
const CLIENT_SECRET = "f7385cd8126984315aee792b2f2c38add8c759f4"
const API_TOKEN = "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"
var app = express()
app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    const params = "?client_id=" + CLIENT_ID +"&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code


    await fetch("http://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        res.json(data)
    })
})


app.get('/getPrivateIssues', async function (req, res) {
    console.log("Getting issues...");
    await fetch("https://api.github.com/search/issues?q=author:YouMingYeh", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization"),
            "Accept": "application/vnd.github+json",
            'X-GitHub-Api-Version': '2022-11-28'
          }
    }).then((response)=>{
        
        return response.json()
    }).then((data)=>{
        console.log(data)
        res.json(data)
    })
})


app.patch('/patchData', async function (req, res) {
    
    const data = req.body;
    const body = {
        title: data.title,
        body: data.body,
        state: data.state,
    }
    
    await fetch(data.url, {
        method: "PATCH",
        headers: {
            "Authorization": 'Bearer '+API_TOKEN,
            "Accept": "application/vnd.github+json",
            'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify(body)
    }).then((response)=>{
        
        return response.json()
    }).then((data)=>{
        console.log(data)
        res.json(data)
    })
})


app.get('/getUserData', async function (req, res) {
    console.log("Getting user data...");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response)=>{
        
        return response.json()
    }).then((data)=>{
        console.log(data)
        res.json(data)
    })
    // const userName = req.query.userName; // retrieve user name from query parameter
    // const url = `https://api.github.com/issues`;
    // await fetch(url, {
    //   headers: {
    //     "Authorization": req.get("Authorization"),
    //     "Accept": "application/vnd.github+json",
    //     'X-GitHub-Api-Version': '2022-11-28'
    //   }
    // }).then((response) => {
    //   return response.json();
    // }).then((data) => {
    //   console.log(data);
    //   res.json(data);
    // }).catch((error) => {
    //   console.error(error);
    //   res.status(500).send(error.message);
    // });
  });
  
  


app.listen(4000, function(){
 console.log('listening on http://localhost:4000')
})