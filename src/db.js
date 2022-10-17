require("dotenv").config();
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleError = (error) => console.log("db.js: error! : ", error);
const handleOpen = () => console.log("db.js connected succesfully!");

db.on("error", handleError);
db.once("open", handleOpen);
