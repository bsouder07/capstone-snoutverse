import { useEffect,useReducer} from 'react'
import { setAccessToken } from '../../utils/api.utils';


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


const useAuthProvider = () => {
 const [state,dispatch] = useReducer(reducer,initialState);

 useEffect(() =>{
   const  localAuth = JSON.parse(localStorage.getItem("test-auth")) || false;
    if(localAuth){
        dispatch({type: SIGNIN, payload: localAuth.user});
        setAccessToken(localAuth.accessToken);
    } else {
        dispatch({type:SIGNOUT});
    }
 },[])

 return {state, dispatch}
  
};

export default useAuthProvider;