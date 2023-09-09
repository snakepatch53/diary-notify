const fetch_query = require("./fetch_query");

async function watchNotify(callback) {
    // observ a fetch request for 10 minutes
    while (true) {
        // await timeout(600000);
        await timeout(10000);
        console.log("watching...");
        const tasks = await fetch_query("https://diary.gonzaloproducciones.com/api/task/select");
        callback(tasks);
        await timeout(10000);
    }
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = watchNotify;
