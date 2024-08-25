const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const errorHandler = require("./middleware/errorHandler");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

app.use("/items", itemRoutes);

app.use(errorHandler);

// Sync database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = app;
