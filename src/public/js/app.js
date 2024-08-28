function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

const socket = io();

const welcome = document.getElementById("welcome");

let roomName;

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", { payload: input.value }, showRoom);
    roomName = input.value;
    input.value = "";
});

const room = document.getElementById("room");
room.hidden = true;