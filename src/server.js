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
    console.log(socket);
});

/*
const wss = new WebSocket.Server({server}); // 같은 서버에서 http, webSocket 둘 다 작동시킴
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case "new message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
    socket.on("close", () => console.log("Disconnected from browser!"));
});
*/

const port = 3000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`)); // http 서버에 접근