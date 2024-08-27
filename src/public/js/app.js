const messageList = document.querySelector("ul");

const messageForm = document.querySelector("form");
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
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