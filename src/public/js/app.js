function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

const messageList = document.querySelector("ul");

const nicknameForm = document.querySelector("#nickname");
nicknameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
});

const messageForm = document.querySelector("#message");
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new message", input.value));
    input.value = "";
});

const socket = new WebSocket(`ws://${window.location.host}`);
// socket : 서버로의 연결

socket.addEventListener("open", () => {
    console.log("Connected to Server!");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server!");
});