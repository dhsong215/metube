import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
  socialOnly: { type: Boolean, default: false },
  avatarURL: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.pre("updateOne", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model("User", userSchema);

export default User;
