import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, () => console.log(`listening on PORT${PORT}`));

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url == "protected") {
    res.send("protected site");
  }
  next();
};

const middleware = (req, res, next) => {
  console.log(`${req.method},${req.url}`);
  next();
};

const controller = (req, res) => {
  res.send("controller respond");
};

app.use(privateMiddleware);

app.get("/", middleware, controller);
app.get("/protected", middleware, controller);
