import mongoose, { Schema, model } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a group name."],
      maxLength: 50,
      minLength: 3,
    },
    description: {
      type: String,
      required: [true, "You must provide a group description."],
      maxLength: 120,
      minLength: 10,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    groupIcon: {
      type: String,
      default: "/default-grp-img.png",
    },
  },
  { timestamps: true }
);

const Group = model("Group", groupSchema);

export default Group;
