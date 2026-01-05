const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");

  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config/config.env" });
}

//connecting to database
database();

//start the server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server is working on http://localhost:${PORT}`);
});

//unhaldled promise rejaction
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(err.stack);
  console.log("Shutting down the server due to unhaldled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
