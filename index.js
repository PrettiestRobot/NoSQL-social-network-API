const express = require("express");
const db = require("./config/conection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost:${PORT}`);
  });
});
