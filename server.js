const express = require("express");
const app = expres();
const path = require("path");

app.use(express.static(__dirname + "/dist"));
app.listen(process.env.port || 4300);
app.get("/*",function(req,res){
    res.sendFile(path.join(__dirname + "/dist/index.html"));
});