const http = require("http");

const server = http.createServer((req, res) => {
    console.log("request received");
})

server.listen(3000, "localhost", () => {
    console.log("Listening for requests on port 3000");
})