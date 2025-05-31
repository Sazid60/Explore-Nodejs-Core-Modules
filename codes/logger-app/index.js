const path = require("path")

const fs = require("node:fs");

console.log(process.argv)

const inputArguments = process.argv.slice(2)

console.log(inputArguments)

const text = inputArguments.join(" ").concat("\n");

const timeStamp = new Date().toString();

console.log(timeStamp)

const message = `${text} ${timeStamp} \n`

if (!message) {
    console.log("❌ Ballerina Kapuchina! Me me me me ! Please Provide a message To Log")
    console.log("Example : Node index.js Hellow World!")
    process.exit(1)
}
console.log(message)

// const filePath = __dirname + "/log.txt"
// D:\WORK\renew-level-2\PH-MODULES\Be-An-Express-And-Mongoose-Master\Explore-Nodejs-Core-Modules\codes\logger-app/log.txt
// this will join the path thought there is wrong with "\" so we can use join. 
// console.log(filePath)

const filePath = path.join(__dirname, "log.txt")

console.log(filePath) // D:\WORK\renew-level-2\PH-MODULES\Be-An-Express-And-Mongoose-Master\Explore-Nodejs-Core-Modules\codes\logger-app\log.txt

fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
    console.log("Your Log Added Successfully!")
})

