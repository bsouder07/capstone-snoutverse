import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
  },
  username: {
    type: String,
    required: [true, "A username is required."],
    unique: [true, "Username is already taken."],
    minLength: [3, "Username must be at least 4 characters long."],
    maxLength: [12, "Username must be less than 16 characters long."],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: Number,
    min: 1,
    max: 3,
    default: 3,
  },
});

const User = model("User", userSchema);

export default User;
