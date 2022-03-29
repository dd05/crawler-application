/////////// required dependencies ////////////

const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

/////////// required paths //////////////////

const mainRoutes = require("./routes/mainRoutes");
const medium = require("./controllers/medium");
const db = require('./models/index');

db.init();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/", mainRoutes);

io.on('connection', (socket) =>  {
    socket.on('tag' , (tag) => {
        medium.stream(socket,tag,[]);
    })
    socket.on('more' , (data) => {
        medium.stream(socket,data.tag,data.ignoredIds)
    })
});

server.listen(3000 , () => {
    console.log("Running...");
});

module.exports = app;