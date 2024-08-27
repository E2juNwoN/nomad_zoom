const socket = new WebSocket(`ws://${window.location.host}`);
// socket : 서버로의 연결

socket.addEventListener("open", () => {
    console.log("Connected to Server!");
});

socket.addEventListener("message", (message) => {
    console.log('Got this: ', message, 'from server');
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server!");
});