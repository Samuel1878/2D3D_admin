import { useReducer,useEffect,useMemo } from "react";
import AuthContext from "./authContext";
let initialValue = {
    isLoading:true,
    userToken:null,
    isSignout:false,
}

const AuthProvider = ({children}) => {
    const [state,dispatch] = useReducer((prevState,action)=>{
        switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.userToken,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },initialValue)
    useEffect(() => {
      const restoreToken = async () => {
        let userToken;
        try {
          userToken = localStorage.getItem("token")
        } catch (e) {
          //Restoring failed
          console.error("Restoring token failed:" + e.message);
        }
        dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
      };
      restoreToken();
    }, []);
    const authMethods = useMemo(()=>({
      signIn:(userToken) => {
        dispatch({ type: "SIGN_IN", userToken: userToken });
        localStorage.setItem("token", userToken);
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
        localStorage.removeItem("token")
      },
      userToken: state.userToken,
    }));
    return(
        <AuthContext.Provider value={authMethods}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider