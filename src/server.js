import express from "express";
import http from "http";
import SocketIO from "socket.io"

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // __dirname은 프로젝트의 루트 디렉토리

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/")); // catchall url

function publicRooms() {
    const {sockets: {adapter: {sids, rooms}}} = wsServer;
    // const sids = wsServer.sockets.adapter.sids;
    // const rooms = wsServer.sockets.adapter.rooms;

    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRoom(roomName) {
    return  wsServer.sockets.adapter.rooms.get(roomName)?.size
}

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anonymous";

    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });

    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // 메세지를 하나의 socket에만 보냄
        wsServer.sockets.emit("room_change", publicRooms()); // 메세지를 모든 소켓에게 보냄
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach(
            (room) => socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1) // 방을 아직 떠나지 않았으므로 자신도 계산되기 때문에 -1
        );
    });

    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });

    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

const port = 3000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`)); // http 서버에 접근