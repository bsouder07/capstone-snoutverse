import api from "../utils/api.utils";

export const signIn = (email, password) =>
  api.post("/auth/signin", { email, password });

export const signUp = (email, password, confirmPassword, file) =>
  api.post(
    "/auth/signup",
    { email, password, confirmPassword, file },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
