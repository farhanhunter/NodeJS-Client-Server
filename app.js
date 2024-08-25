const express = require("express");
const mangaRoutes = require("./routes/mangaRoutes");
const errorHandler = require("./middleware/errorHandler");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

app.use("/mangas", mangaRoutes);

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
