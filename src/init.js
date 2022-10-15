import app from "./server";
import "./db";

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
