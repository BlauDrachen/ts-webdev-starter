import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.config.dev";

// tslint:disable:no-console

// Initialize objects
const port = 3000;
const app = express();
// TODO: remove ts-ignore and ensure object typing is correct
// @ts-ignore
const compiler = webpack(config);

// Use webpack during development
app.use("/favicon.ico", express.static("images/favicon.ico"));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

// Routing Configuration
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.get("/users", (req, res) => {
  res.status(301).redirect("http://localhost:3001/users");
});

// Run server on specified port
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Express is now listening on port ${port}`);
    }
});
