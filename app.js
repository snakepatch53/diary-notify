const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const watchNotify = require("./whatch_notify");

// function getMessage(client_name) {
//     return ``;
// }

const client = new Client({
    authStrategy: new LocalAuth(),
});

// const client = new Client();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message", async (message) => {
    console.log(message.body);
    if (message.body === "Hi") {
        watchNotify((tasks) => {
            console.log(tasks);
            // client.sendMessage(message.from, getMessage(message.sender.pushname));
        });
    }
});

client.initialize();
