function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
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

socket.on("welcome", () => {
    addMessage("Someone joined!");
});

socket.on("bye", () => {
    socket.emit("leave_room");
    addMessage("Someone left...");
});