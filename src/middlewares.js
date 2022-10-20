import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  console.log(req.session.user);
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadProfileImage = multer({
  dest: "uploads/profileImages/",
  limits: {
    fileSize: 10000000,
  },
});
export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 1000000000,
  },
});
