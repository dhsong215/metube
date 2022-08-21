import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.listen(PORT, () => console.log(`listening on PORT${PORT}`));

const controller = (req, res) => {
  res.send("hi");
};

app.use(logger);
app.get("/", controller);
app.get("/protected", controller);
