const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:T6rBEQ6B2OFPV5NC@cluster0.ekup6bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}

startServer();

// moongodb password for database access : T6rBEQ6B2OFPV5NC
