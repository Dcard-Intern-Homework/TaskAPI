var express = require('express');
var cors = require('cors')
const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')


const CLIENT_ID = "4b7feddfcd88aa615d89"
const CLIENT_SECRET = "f7385cd8126984315aee792b2f2c38add8c759f4"

var app = express()
app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);
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


app.get('/getUserData', async function (req, res) {
    req.get("Authorization")
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
})

app.listen(4000, function(){
 console.log('listening on http://localhost:4000')
})