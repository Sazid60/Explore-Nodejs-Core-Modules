// const fs = require("node:fs");

// fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
//     if (err) {
//         console.log("Opps!! Error Occurred.", err);
//         return;
//     }

//     fs.writeFile("./hello-world.txt", data, { encoding: "utf-8" }, (err) => {
//         if (err) {
//             console.log("Opps!! Error Occurred.", err);
//             return;
//         }
//         console.log("Written Successfully!");
//     });
// });


const fs = require("node:fs");

const readStream = fs.createReadStream("./hello.txt", { encoding: "utf-8" })
const writeStream = fs.createWriteStream("./hello-world.txt", { encoding: "utf-8" })
// readStream.on("eventName", callback);
readStream.on("data", (data) => {
    console.log(data)

    writeStream.write(data, (err) => {
        if (err) {
            console.log("Opps!! Error Occurred.", err);
            return;
        }
    })
})

readStream.on("error", (err) => {
    if (err) {
        throw Error("Error", err)
    }
})

// writeStream.on("error", (err) => {
//     if (err) {
//         throw Error("Error", err)
//     }
// })


readStream.on("end", () => {
    console.log("Reading Ended")
    writeStream.end()
})

writeStream.on("finish", () => {
    console.log("Writing Is Finish")
})