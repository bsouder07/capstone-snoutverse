import api from "../utils/api.utils";

export const signIn = (email, password) =>
  api.post("/auth/signin", { email, password });

export const signUp = (
  email,
  username,
  password,
  confirmPassword,
  file
) =>
  api.post(
    "/auth/signup",
    { email, username, password, confirmPassword, file },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
