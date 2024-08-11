
import { getUserData } from "@/lib/secure-store";
import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkUser = async () => {
        return await getUserData();
    }

    useEffect(() => {
        checkUser().then((data) => {
            if (data.access_token && data.user_name) {
                setUser(data.user_name);
                setIsLoggedIn(true);
            } else if (data.access_token === "" && data.user_name === "") {
                setIsLoggedIn(false);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >{children}</GlobalContext.Provider>
    )
};

export default GlobalProvider
