const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:T6rBEQ6B2OFPV5NC@cluster0.ekup6bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
