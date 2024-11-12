import BaseApi from "@/api/baseApi";
import {AuthUserData} from "@/types/auth";
import {SignInDetails} from "@/types/forms";
import {useContext, createContext, useState} from "react";

const AuthContext = createContext({
    isAuth: false,
    user: {},
    loginAction: async (_data: SignInDetails) => {
        return false;
    },
    logOut: async () => {},
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isAuth, setAuth] = useState(false);
    const loginAction = async (data: SignInDetails): Promise<boolean> => {
        const res = await BaseApi.post("/auth/login", data);
        if (res.status === 200) {
            const userData: AuthUserData = res.data;
            setUser(userData);
            setAuth(true);
            return true;
        }
        return false;
    };

    const logOut = async () => {
        await BaseApi.get("/auth/logout");
        setUser({});
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{isAuth, user, loginAction, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
