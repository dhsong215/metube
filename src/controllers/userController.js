import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
  if (user.socialOnly == true) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "this email can only login for github",
    });
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "check password or email" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};

export const logout = (req, res) => {
  res.send("this will be user remove page");
};

//깃헙 로그인시 controller의 config에 맞춰 url생성
export const githubLogin = (req, res) => {
  const config = {
    client_id: process.env.CL_ID,
    allow_signup: "false",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

export const githubLoginFinish = async (req, res) => {
  const config = {
    client_id: process.env.CL_ID,
    client_secret: process.env.CL_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `https://github.com/login/oauth/access_token?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if (!("access_token" in tokenRequest)) {
    return res.redirect("/login");
  }
  const { access_token } = tokenRequest;
  const userData = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
  ).json();
  console.log(userData);
  const emailData = await (
    await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
  ).json();
  const emailObj = await emailData.find(
    (email) => email.primary === true && email.verified === true
  );
  if (!emailObj) {
    return res.redirect("/login", {
      errorMessage: "there is no email on your github account,",
    });
  }
  const userExisting = await User.findOne({
    email: emailObj.email,
  });
  if (userExisting) {
    req.session.loggedIn = true;
    req.session.user = userExisting;
    return res.redirect("/");
  } else {
    await User.create({
      email: emailObj.email,
      username: userData.login,
      name: userData.login,
      password: "",
      location: userData.location,
      socialOnly: true,
      avatarURL: userData.avatarURL,
    });
    return res.redirect("/");
  }
};
