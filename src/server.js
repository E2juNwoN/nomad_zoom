import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname은 프로젝트의 루트 디렉토리

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); // catchall url

const port = 3000;
const handleListen = () => console.log(`Listening on http://localhost:${port}`);
app.listen(port, handleListen);

const server = http.createServer(app); // http 서버

const wss = new WebSocket.Server();