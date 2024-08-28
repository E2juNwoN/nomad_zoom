import express from "express";
import http from "http";
import SocketIO from "socket.io"

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname은 프로젝트의 루트 디렉토리

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); // catchall url

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        console.log(socket.id);
        socket.join(roomName);
        console.log(socket.rooms); // socket이 현재 어떤 room에 있는지
        setTimeout(() => {done();}, 5000);
    });
});

const port = 3000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`)); // http 서버에 접근