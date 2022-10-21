import bcrypt from "bcrypt";
import fetch from "node-fetch";

import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("users/join", { pageTitle: "join" });
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
  res.render("users/login", { pageTitle: "Login" });
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
  req.session.destroy();
  res.redirect("/");
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
  if (!userExisting) {
    await User.create({
      email: emailObj.email,
      username: userData.login,
      name: userData.login,
      password: "",
      location: userData.location,
      socialOnly: true,
      avatarURL: userData.avatarURL,
    });
  }
  req.session.loggedIn = true;
  req.session.user = userExisting;
  return res.redirect("/");
};

export const getUserEdit = (req, res) => {
  res.render("users/userEdit", {
    pageTitle: `Edit ${res.locals.loggedInUser.username}'s profile`,
  });
};

export const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarURL },
    },
    body: { email, username, name, location },
    file,
  } = req;
  await User.findByIdAndUpdate(_id, {
    email,
    username,
    name,
    location,
    avatarURL: file ? file.path : avatarURL,
  });
  req.session.user.email = email;
  req.session.user.username = username;
  req.session.user.name = name;
  req.session.user.location = location;
  if (file) {
    req.session.user.avatarURL = file.path;
  }
  res.redirect("/");
};

export const getChangePassword = (req, res) => {
  return res.render("users/changePassword");
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { password, passwordCheck },
  } = req;
  if (password === passwordCheck) {
    console.log(password);
    const user = await User.findById(_id);
    console.log(user);
    user.password = password;
    user.save();
  } else {
    return res.render("changePassword", {
      errorMessage: "check password confirm",
    });
  }
  //send notification
  return res.redirect("/");
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ id });
  if (!user) {
    return res.status(404).render("404");
  }
  res.render("users/profilePage", { PageTitle: user.username, user });
};
