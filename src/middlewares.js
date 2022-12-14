import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  console.log(req.session.user);
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
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

export const videoOwnerProtector = async (req, res, next) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (_id !== String(video.owner._id)) {
    return res.status(403).redirect("/");
  }
};
