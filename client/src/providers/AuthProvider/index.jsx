import {useReducer } from "react"
import authContext from "./AuthContext";
import useAuthProvider from "./useAuthProvider";

const initialState ={
    user:null,
    isAuthenticated: null,
};

export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";

const reducer = (state,action) => {
switch(action.type){
case "SIGNIN":{
    return{
        ...state,
        user: action.payload,
        isAuthenticated:true,
    };
}
case "SIGNOUT":
    return{
        ...state,
        user: null,
        isAuthenticated:false,
    };
    default:{
        return state;
    };
}

}

const AuthProvider = ({children}) => {

    const {state,dispatch}= useAuthProvider()
    return(  <authContext.Provider value={{state, dispatch}}>
        {children}
    </authContext.Provider>
    );
    }

    export default AuthProvider;