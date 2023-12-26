import { useContext } from "react";
import authContext from "./AuthContext";
import { SIGNIN, SIGNOUT } from ".";
import { signIn, signUp } from "../../services/auth.services";
import { setAccessToken } from "../../utils/api.utils";

const useAuth = () => {
  const { state, dispatch } = useContext(authContext);

  const handleSignUp = async (email,password,confirmPassword) =>{
   
 const response = await signUp(email,password,confirmPassword)
console.log(response);
   await handleSignIn(email,password);
 
  };

  const handleSignIn = async (email, password) =>
    signIn(email, password).then((response) => {
      dispatch({ type: SIGNIN, payload: response.data.user });
      setAccessToken(response.data.accessToken);

      const localAuth = { ...response.data };
      localStorage.setItem("test-auth", JSON.stringify(localAuth));
    });

  const handleSignOut = ()=>{
    dispatch({type: SIGNOUT});
    localStorage.clearItem("test-auth");
  };

  return {
    ...state,
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
