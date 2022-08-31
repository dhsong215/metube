let videos = [
  {
    title: "awsome",
    rating: 3,
    comments: 3,
    createdAt: "22/2/2",
    views: 1,
    id: 1,
  },
  {
    title: "beautiful",
    rating: 3,
    comments: 3,
    createdAt: "22/2/2",
    views: 59,
    id: 2,
  },
  {
    title: "amazing",
    rating: 3,
    comments: 3,
    createdAt: "22/2/2",
    views: 59,
    id: 3,
  },
];

export const getHome = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const videoSearch = (req, res) => {
  res.send("search");
};

export const videoWatch = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  res.render("videoPage", { pageTitle: video.title, video });
};

export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  res.render("videoEdit", { pageTitle: `Edit ${video.title}` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const video = videos[id - 1];
  video.title = title;
  return res.redirect(`/video/${id}`);
};
