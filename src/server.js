import { Socket } from "dgram";
import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname은 프로젝트의 루트 디렉토리

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); // catchall url

const server = http.createServer(app); // http 서버

const wss = new WebSocket.Server({server}); // 같은 서버에서 http, webSocket 둘 다 작동시킴

function handleConnection(socket) {
    console.log(socket);
}
wss.on("connection", handleConnection);

const port = 3000;
const handleListen = () => console.log(`Listening on http://localhost:${port}`);

server.listen(port, handleListen); // http 서버에 접근