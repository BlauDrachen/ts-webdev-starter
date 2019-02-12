import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../../webpack.config.dev';

// tslint:disable:no-console

// Initialize objects
const port = 3000;
const app = express();
const compiler = webpack(config);

// Use webpack during development
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

// Routing Configuration
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

// Simple hard coding in order to build a development output
app.get('/users', function(req, res) {
    res.json([
        {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
        {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
        {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
    ]);
});

// Run server on specified port
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Express is now listening on port ${port}`);
    }
});
