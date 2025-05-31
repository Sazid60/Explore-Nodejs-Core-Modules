const http = require("http")
const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname, "./db/todo.json")




const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log(url)

    const pathname = url.pathname;

    console.log(pathname)


    // get all todos
    if (pathname === "/todos" && req.method === "GET") {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(data)
    }
    // post a todo
    else if (pathname === "/todos/create-todo" && req.method === "POST") {
        let data = ""

        req.on("data", (chunk) => {
            data = data + chunk
        })

        req.on("end", () => {
            const { title, body } = JSON.parse(data)
            console.log({ title, body })

            const createdAt = new Date().toLocaleString()
            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" })
            const parsedAllTodos = JSON.parse(allTodos)
            parsedAllTodos.push({ title, body, createdAt })
            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), { encoding: "utf-8" })
            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })

    } else if (pathname === "/todo" && req.method === "GET") {
        const title = url.searchParams.get("title")
        console.log(title)
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        const parsedData = JSON.parse(data)

        const todo = parsedData.find((todo) => todo.title === title)

        const stringifiedTodo = JSON.stringify(todo)

        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(stringifiedTodo)
    } else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
        const title = url.searchParams.get("title")

        let data = ""

        req.on("data", (chunk) => {
            data = data + chunk
        })

        req.on("end", () => {
            const { body } = JSON.parse(data)
            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" })
            const parsedAllTodos = JSON.parse(allTodos)

            const todoIndex = parsedAllTodos.findIndex((todo) => todo.title === title)

            parsedAllTodos[todoIndex].body = body

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), { encoding: "utf-8" })
            res.end(JSON.stringify({ title, body, createdAt: parsedAllTodos[todoIndex].createdAt }, null, 2))
        })

    } else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
        const title = url.searchParams.get("title")
        const todos = JSON.parse(fs.readFileSync(filePath, "utf-8"))
        const index = todos.findIndex((t) => t.title === title)
        if (index === -1) {
            res.writeHead(404)
            return res.end("Todo not found")
        }
        const deletedTodo = todos.splice(index, 1)[0]
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "Todo deleted", deletedTodo }))
    } else {
        res.end("Route Not Found")
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server Is Listening")
})