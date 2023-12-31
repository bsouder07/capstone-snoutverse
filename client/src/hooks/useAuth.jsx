import { useContext } from "react";
import authContext from "../providers/AuthProvider/authContext";

import {
  SIGNIN,
  SIGNOUT,
} from "../providers/AuthProvider/useAuthProvider";
import { signIn, signUp } from "../services/auth.services";
import { setAccessToken } from "../utils/api.utils";

const useAuth = () => {
  const { state, dispatch } = useContext(authContext);

  const handleSignUp = async (
    email,
    username,
    password,
    confirmPassword,
    file
  ) => {
    const response = await signUp(
      email,
      username,
      password,
      confirmPassword,
      file
    );
    console.log(response);
    await handleSignIn(email, password);
  };

  const handleSignIn = async (email, password) =>
    signIn(email, password).then((response) => {
      dispatch({ type: SIGNIN, payload: response.data.user });
      setAccessToken(response.data.accessToken);

      const localAuth = { ...response.data };
      localStorage.setItem("test-auth", JSON.stringify(localAuth));
    });

  const handleSignOut = () => {
    dispatch({ type: SIGNOUT });
    localStorage.removeItem("test-auth");
  };

  return {
    ...state,
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
