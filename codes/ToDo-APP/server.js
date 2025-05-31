const http = require("http")

const server = http.createServer((req, res) => {
    // console.log({ req, res })

    if (req.url === "/todos" && req.method === "GET") {
        res.end("All Todos Here")
    }
    if (req.url === "/todos/create-todo" && req.method === "POST") {
        res.end("Todo Created")
    } else {
        res.end("Route Not Found")
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server Is Listening")
})