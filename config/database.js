const dns = require("dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

let connectPromise = null;

module.exports.connect = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URL) {
        throw new Error("Missing MONGO_URL environment variable");
    }

    if (connectPromise) {
        return connectPromise;
    }

    try {
        connectPromise = mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000
        });
        await connectPromise;
        console.log("Connect success")
    } catch (error) {
        connectPromise = null;
        console.error("MongoDB connection error:", error.message)
        throw error;
    }
}
