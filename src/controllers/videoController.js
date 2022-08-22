export const videoSearch = (req, res) => {
  res.send("search");
};

export const videoWatch = (req, res) => {
  res.send(`videoWatch /${req.params.id}`);
};

export const videoUpload = (req, res) => {
  res.send("videoUpload");
};

export const videoEdit = (req, res) => {
  res.send("videoEdit");
};

export const videoRemove = (req, res) => {
  res.send("videoRemove");
};
