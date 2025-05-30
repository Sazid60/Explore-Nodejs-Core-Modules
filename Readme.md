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
.emit('event') – Trigger an event
.on('event', callback) – Listen for an event
.removeListener() / .removeAllListeners() – Clean up listeners
Async Support: Event handlers can be async for non-blocking behavior.
