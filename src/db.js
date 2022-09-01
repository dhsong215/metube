import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/metube");

const db = mongoose.connection;

const handleError = (error) => console.log("error! : ", error);
const handleOpen = () => console.log("db.js connected succesfully!");

db.on("error", handleError);
db.once("open", handleOpen);
