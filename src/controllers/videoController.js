import Video from "../models/Video";

export const getHome = (req, res) => {
  Video.find({}, (error, videos) => {
    res.render("home", { pageTitle: "Home", videos });
  });
};

export const videoWatch = (req, res) => {
  const id = req.params.id;
  res.render("videoPage", { pageTitle: video.title });
};

export const getEdit = (req, res) => {
  const id = req.params.id;
  res.render("videoEdit", { pageTitle: `Edit` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  res.redirect(`/video/${id}`);
};
