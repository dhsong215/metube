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
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  res.render("videos/videoPage", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  res.render("videos/videoEdit", { pageTitle: `Edit`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
  res.render("videos/upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const { file } = req;
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileURL: file.path,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("videos/upload", {
      pageTitle: "upload video",
      errorMessage: error._message,
    });
  }
};

export const videoDelete = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const videoSearch = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({ title: { $regex: new RegExp(keyword, "i") } });
  }
  res.render("search", { pageTitle: "Video Search", videos });
};
