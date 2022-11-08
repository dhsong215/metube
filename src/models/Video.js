import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  views: { type: Number, default: 0 },
  fileURL: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  //ref 가 없으면 해당 objectID만 가져오지만 ref로 참조하면 해당 id의 username, email 등등을 가져올수 있다
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : "#" + word));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
