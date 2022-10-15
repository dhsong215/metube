import bcrypt from "bcrypt";

import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const postJoin = async (req, res) => {
  const { email, username, password, passwordCheck, name, location } = req.body;
  const exists = await User.exists({ $or: [{ email }, { username }] });
  const pageTitle = "join";
  if (exists) {
    if (await User.exists({ email })) {
      const errorMessage = "email already exists";
      return res.stauts(400).render("join", { pageTitle, errorMessage });
    }
    if (await User.exists({ username })) {
      const errorMessage = "username already exists";
      return res.status(400).render("join", { pageTitle, errorMessage });
    }
  }
  if (password != passwordCheck) {
    const errorMessage = "passwordcheck incorrect";
    return res.render("join", { pageTitle, errorMessage });
  }
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const errorMessage = "email doesn't exist";
    return res.status(400).render("login", { pageTitle, errorMessage });
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "check password or email" });
  }
  res.redirect("/");
};

export const logout = (req, res) => {
  res.send("this will be user remove page");
};
