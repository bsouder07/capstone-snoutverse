import api from "../utils/api.utils";

export const signIn = (email,password) =>
api.post("/auth/signin",{email,password});

export const signUp = (email,password,confirmPassword) =>
api.post("/auth/signup",{email,password,confirmPassword});





