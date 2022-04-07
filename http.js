const express = require('express')
const app = express()
const client = require("./client");

app.get('/news', function (req, res) {
    client.GetAllNews({}, (error, response) => {

        res.send(response)
    })
})

app.get("/news/:id", function(req, res) {
    let id = req.params.id;
    client.GetNews({id}, (error, response) => {
        if(error) console.log(error);
        if (!response) {
            res.send("404 not found");
        }
        res.send(response)
    })
})

app.listen(3000)