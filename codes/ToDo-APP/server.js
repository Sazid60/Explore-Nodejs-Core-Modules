const http = require("http")


const data = [
    {
        "title": "Morning Routines",
        "body": "Boost your day with simple habits.",
        "createdAt": "2025-05-30T08:45:00Z"
    },
    {
        "title": "AI in Life",
        "body": "How AI is changing everything.",
        "createdAt": "2025-05-29T17:20:00Z"
    }
]

const server = http.createServer((req, res) => {
    // console.log({ req, res })

    if (req.url === "/todos" && req.method === "GET") {
        res.writeHead(200, {
            // "content-type": "text/plain",
            // "content-type": "application/json",
            "content-type": "text/html",
            // "email": "ph@gmail.com"
        })
        // res.end(JSON.stringify(data))

        res.end(`<h1> Hello I am HTmL</h1>`)
    }
    else if (req.url === "/todos/create-todo" && req.method === "POST") {
        res.end("Todo Created")
    } else {
        res.end("Route Not Found")
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server Is Listening")
})