In this module, you’ll start by understanding the event-driven heart of Node.js and explore how it handles tasks synchronously and asynchronously, especially when it comes to reading files, working with buffers, and streaming data efficiently.

But that’s just the beginning…

By the end of this module, you’ll be:

- Building your own logger app to track `events and activities`
- Navigating the filesystem using the `Path module`
- Creating a basic ToDo app using Node’s `native HTTP server`
- Implementing `routing`, setting `custom response headers`, and using Postman to test your `API`
- Handling `CRUD operations` (Create, Read, Update, Delete) on ToDos with real HTTP requests—query params and all!

This module bridges the gap between learning and doing. It's where you transform knowledge into projects, gain confidence in Node.js fundamentals, and start thinking like a real backend developer.

Let’s go—your first full Node-powered app is just a few lessons away!

## 13-1 What is an event module?

- Node.js Follows Event Driven Architecture.
- Event Loop Plays an important role.
- Event Loop Always Looks for if any event/ user request/ action is running or not.
- Event Loop performs the task sending to thread pool. when task is done event loop send response through a callback function.
- When its I/O Intensive task it sends to thread pool and when its cpu intensive task Its done in main thread.

### Lets see in practical

- In event loop we get `event listener` which listens all the events and performs tasks and send response.
- We also get a `event emitter` which triggers the events.

[Node.js Events](https://nodejs.org/api/events.html)

- less play with this considering a school bell

```js
// 📢 Step 1: Import the EventEmitter class from Node's built-in 'events' module
const EventEmitter = require("node:events");

// 🛒 Step 2: Bought a school bell from the shop by creating a class that can emit events
//           'SchoolBell' extends EventEmitter so it can emit and handle events like 'ring' or 'broken'
class SchoolBell extends EventEmitter {}

// 🔔 Step 3: Set up the bell (create an instance of the SchoolBell)
//           This 'schoolBell' is our event emitter (it will emit or broadcast events)
const schoolBell = new SchoolBell();

// 👂 Step 4: Students are now listening for the school bell to ring or break

// 📚 Listener 1: A student hears the bell ring and responds
schoolBell.on("ring", () => {
  console.log("🎒 Wow! Class session started!");
});

// 📚 Listener 2: Another student hears the bell ring and gives a different response
//               👉 This shows multiple listeners for the same event ('ring')
schoolBell.on("ring", () => {
  console.log("📓 Aha! Another class is coming up!");
});

// 😩 Listener 3: A student reacts when the bell is broken
//               👉 This shows we can have different types of events on the same emitter
schoolBell.on("broken", () => {
  console.log("😩 Will this class ever end?");
});

// 🏫 Step 5: The bell starts ringing and breaks

// 🔔 Emit the 'ring' event → all registered listeners for 'ring' will respond
schoolBell.emit("ring"); // Students react to the first bell ring

// 🔔 Emit 'ring' again → same listeners react again
schoolBell.emit("ring"); // Students react again for another bell

// 💥 Emit 'broken' event → only the listener for 'broken' responds
schoolBell.emit("broken"); // One student reacts to the broken bell
```

- we can create multiple listener (ring, broken) on one event and the listeners will give different different callback response.
- we can also create multiple event listener based on one event emitter like ring is returning two responses.

| Concept                | Example in Code                        | Description                               |
| ---------------------- | -------------------------------------- | ----------------------------------------- |
| **Emitter**            | `schoolBell`                           | An object that triggers events (`emit`)   |
| **Event**              | `"ring"`, `"broken"`                   | Named signals you emit                    |
| **Listener**           | `schoolBell.on("ring", () => { ... })` | A function that reacts to an event        |
| **Multiple Listeners** | Two `on("ring", ...)`                  | More than one response for a single event |
| **Multiple Events**    | `"ring"`, `"broken"` on `schoolBell`   | One emitter can have different events     |

#### use case of event module in node.js

1. 🔄 _Asynchronous Operations_

- File I/O: Emits events like open, data, end, error for non-blocking file handling.
- HTTP Requests: Emits request, response to handle multiple web requests concurrently.
- Streams: Emits data, end, error, finish while reading/writing data in chunks.

2. 🧠 _Custom Events_

- Application Logic: Trigger actions based on user interactions or app state changes.
- Inter-Process Communication: Pass messages between services or app modules.
- Modular Code: Decouple components for cleaner, maintainable architecture.

3. 📦 _EventEmitter Class_

- Core Class: Built-in EventEmitter from events module handles all event-based ops.

_Methods_:

- .emit('event') – Trigger an event
- .on('event', callback) – Listen for an event
- .removeListener() / .removeAllListeners() – Clean up listeners
- Async Support: Event handlers can be async for non-blocking behavior.

## 13-2 Synchronous way to read and write files

- This file system means we can read the data from our machine where the files are stored.
- We can also create new files in our machine and do data entry. And we can do update and delete the data.

### Lets see how we can read the data from Machine using File system

[Filesystem Of Node.js](https://nodejs.org/api/fs.html)

- we can read data in `Synchronous` way. here we will tell node.js files system the file path and tell him to grab the data. This operation will happen in `Single Thread/ Main Thread` because the synchronous works are not sent in `thread pool`. An this will block the single thread until the task is finished.

#### Synchronous File System `Read`

[Read File sync Blog](https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/)

```js
fs.readFileSync(path[, options])
```

- read file system

```js
const fs = require("node:fs");
//  synchronous
const data = fs.readFileSync("./hello.txt", { encoding: "utf8" });
// if we do not giv the option it will show buffer <Buffer 48 65 6c 6c 6f 20 49 20 61 6d 20 52 65 61 64 69 6e 67 20 54 68 65 20 74 65 78 74>
console.log(data);
```

- it will grab the text from the `hello.txt` file and show.

#### Synchronous File System `Write`

```js
fs.writeFileSync(file, data[, options])
```

![alt text](image.png)

```js
const fs = require("node:fs");

const text = "Learning File System";
fs.writeFileSync("./hello.txt", text);
const data = fs.readFileSync("./hello.txt", { encoding: "utf8" });
console.log(data);
```

#### Now Lets Understand how its blocking other process.

```js
const fs = require("node:fs");

console.log("Task-1");
const text = "Learning File System";
fs.writeFileSync("./hello.txt", text);

console.log("Task-3");

const data = fs.readFileSync("./hello.txt", { encoding: "utf8" });
console.log("Task-4");
console.log(data);
```

#### Asynchronous File System

- we can read data in `Asynchronous` way. This operation will happen in `Thread Pool`.File read --> single thread --> event loop --> thread pool --> finish task and send response

- `readFile` works on asynchronous way by default.

## 13-3 Asynchronous way to read and write files

#### Asynchronous File System `Read`

[Async Read](https://www.geeksforgeeks.org/node-js-fs-readfile-method/)

```js
fs.readFile(path, options, callback);
```

- As its asynchronous operation it will be solved by thread pool. so we need a callback here as well. Callback helps to send response of the complete task to user.

![alt text](image-1.png)

```js
const fs = require("fs");

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
});
```

- This called error back pattern, if there is any error it will show the error.
- now lets see our made asynchronous read example

```js
const fs = require("node:fs");
let texts = "Default Text before set by callbacks";
console.log("Asyn Task-1");

fs.readFile("./hello.txt", { encoding: "utf8" }, (err, data) => {
  if (err) {
    console.log("Opps!! Error Occurred.", err);
    return;
  }
  texts = data;
  console.log(texts, "Text Inside Callback");
});
console.log(texts);
console.log("Asyn Task-3");
```

#### Asynchronous File System `Write`

[Write File Async](https://www.geeksforgeeks.org/node-js-fs-writefile-method/)

```js
fs.writeFile(file, data, options, callback);
```

- lets see wite and read of async

```js
let texts = "Default Text before set by callbacks";
console.log("Asyn Task-1");

fs.writeFile("./hello.txt", texts, { encoding: "utf-8" }, (err) => {
  if (err) {
    console.log("Opps!! Error Occurred.", err);
    return;
  }
  console.log("Written Successfully!");
});

fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("Opps!! Error Occurred.", err);
    return;
  }
  texts = data;
  console.log(texts, "Text Inside Callback");
});
console.log(texts);
console.log("Asyn Task-3");
```
