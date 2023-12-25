import mongoose from "mongoose";
const musicSchema = new mongoose.Schema(
  {
    logo: {
      data: Buffer,
      contentType: String,
    },
    music: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    type: {
      type: String,
    },
    language: {
      type: String,
    },
    movie: {
      type: String,
    },
    singer: {
      type: String,
    },
    release: {
      type: Date,
    },
    like: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Music", musicSchema);
