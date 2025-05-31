const http = require("http")

const server = http.createServer((req, res) => {
    console.log({ req, res })
    res.end("Welcome To Server")
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server Is Listening")
})