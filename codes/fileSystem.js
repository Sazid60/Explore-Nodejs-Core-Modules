const fs = require('node:fs');

console.log("Task-1")
const text = "Learning File System";
fs.writeFileSync("./hello.txt", text);

console.log("Task-3")

const data = fs.readFileSync("./hello.txt", { encoding: 'utf8' });
console.log("Task-4")
console.log(data)


// Asynchronous
let texts = "Default Text before set by callbacks";
console.log("Asyn Task-1")

fs.writeFile("./hello.txt", texts, { encoding: 'utf-8' }, (err) => {
    if (err) {
        console.log("Opps!! Error Occurred.", err);
        return
    }
    console.log("Written Successfully!")
})

fs.readFile("./hello.txt", { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log("Opps!! Error Occurred.", err);
        return
    }
    texts = data
    console.log(texts, "Text Inside Callback")
})



console.log(texts)
console.log("Asyn Task-3")