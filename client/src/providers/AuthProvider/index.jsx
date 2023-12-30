import authContext from "./AuthContext";
import useAuthProvider from "./useAuthProvider";

const AuthProvider = ({ children }) => {
  const { state, dispatch } = useAuthProvider();
  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
