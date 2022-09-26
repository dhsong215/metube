import Video from "../models/Video";

export const getHome = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "metube", videos });
  } catch {
    return res.render("error on videofind");
  }
};

export const videoWatch = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  res.render("videoPage", { pageTitle: video.title, video });
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

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "upload video",
      errorMessage: error._message,
    });
  }
};
