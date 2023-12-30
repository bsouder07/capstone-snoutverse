import api from "../utils/api.utils";

export const signIn = (email,password) =>
api.post("/auth/signin",{email,password});

export const signUp = (email,password,confirmPassword, profileImage) =>
api.post("/auth/signup",{email,password,confirmPassword,profileImage});






