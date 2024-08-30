function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#message");
    msgForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = room.querySelector("#message input");
        const value = input.value;
        socket.emit("new_message", input.value, roomName, () => {
            addMessage(`You: ${value}`);
        });
        input.value = "";
    });
    const nameForm = room.querySelector("#name");
    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = room.querySelector("#name input");
        const value = input.value;
        socket.emit("nickname", value);
        input.value = "";
    });
}

function addMessage(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.appendChild(li);
}

const socket = io();

const welcome = document.getElementById("welcome");

let roomName;

let nickname;

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
});

const room = document.getElementById("room");
room.hidden = true;

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
    socket.emit("leave_room");
    addMessage(`${user} left...`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});