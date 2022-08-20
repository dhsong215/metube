import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, () => console.log(`listening on PORT${PORT}`));

const middleware = (req, res, next) => {
  console.log("middleware working");
  next();
};

const controller = (req, res) => {
  res.send("controller respond");
};

app.get("/", middleware, controller);
