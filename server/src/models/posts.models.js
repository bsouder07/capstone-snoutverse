import mongoose, { Schema, model } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 120,
    },
    image: {
      type: String,
      default: null,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
          maxlength: 120,
        },
        created: {
          type: Date,
          default: Date.now,
        },
        author: { type: ObjectId, ref: "User" },
      },
    ],

    group: {
      type: ObjectId,
      ref: "Group",
      default: null,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
