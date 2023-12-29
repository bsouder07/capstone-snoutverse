import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
  },
  passwordHash: {
    type: String,
    required: true,
  },
profileImage:{
  type:String,
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
