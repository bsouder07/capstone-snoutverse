import { useContext } from "react";
import authContext from "./AuthContext";
import {SIGNIN, SIGNOUT} from ".";
import {signIn, signUp } from "../../services/auth.services";


const useAuth = () =>{
const {state,dispatch} = useContext(authContext);

const handleSignUp = async (email,password,confirmPassword) =>{

 const response = await signUp(email,password,confirmPassword)
 console.log(response);
 await handleSignIn(email,password);
 
};

const handleSignIn = async (email,password) =>{
    return signIn(email,password).then((response) =>
    console.log(response.data)
    
    );
};

const handleSignOut = ()=>{
 dispatch({type: SIGNOUT});
};

return{
    ...state, handleSignUp, handleSignIn, handleSignOut

    
}

}

export default useAuth;