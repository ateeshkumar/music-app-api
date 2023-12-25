import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    auth: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    likesmusic: [
      {
        type: mongoose.Types.ObjectId,
        ref: "music",
      },
    ],
    likesplaylist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "music",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    playlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "playlist",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
