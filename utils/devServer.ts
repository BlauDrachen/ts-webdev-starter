import express from 'express';
import path from 'path';

// Initialize objects
const port = 3000;
var app = express();

// Routing Configuration
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.get('/users', function(req, res) {
    // Hard coding for simplicity. Pretend this hits a real database
    res.json([
        {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
        {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
        {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
    ]);
});

// Run server on specified port
app.listen(port, function(err){
    if(err) {
        console.log(err);
    }else{
        console.log(`Express is now listening on port ${port}`);
    }
});