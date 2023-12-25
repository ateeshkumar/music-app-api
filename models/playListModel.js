import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    like: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    music: [
      {
        type: mongoose.Types.ObjectId,
        ref: "music",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Playlist", playlistSchema);
