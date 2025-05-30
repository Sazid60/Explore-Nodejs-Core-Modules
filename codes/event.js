// 📢 Import the EventEmitter class from Node's built-in 'events' module
const EventEmitter = require('node:events');

// 🛒 Bought a school bell from the shop (creating a custom bell class)
class SchoolBell extends EventEmitter { };

// 🔔 Set up the bell (creating an instance of the SchoolBell)
const schoolBell = new SchoolBell();

// 👂 Students are now listening for the school bell to ring

// 📚 Student 1 hears the bell and reacts
schoolBell.on("ring", () => {
    console.log("🎒 Wow! Class session started!");
});

// 📚 Student 2 hears the same bell and also reacts
schoolBell.on("ring", () => {
    console.log("📓 Aha! Another class is coming up!");
});

// 😩 Student hears a different sound: the bell is broken!
schoolBell.on("broken", () => {
    console.log("😩 Will this class ever end?");
});

// 🏫 Now let’s ring the bell

schoolBell.emit("ring");    // 🔔 Bell rings → both students respond
schoolBell.emit("ring");    // 🔔 Bell rings again → both students respond again
schoolBell.emit("broken");  // 💥 Bell is broken → one student reacts in despair
