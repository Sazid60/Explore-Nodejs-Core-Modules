const fs = require('node:fs');

console.log("Task-1")
const text = "Learning File System";
fs.writeFileSync("./hello.txt", text);

console.log("Task-3")

const data = fs.readFileSync("./hello.txt", { encoding: 'utf8' });
console.log("Task-4")
console.log(data)
// Asynchronous