import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { useState, useEffect } from "react";
import LoadingScreen from "./loadingscreen/loadingScreen";

const PersistLogin = () => {
    const[isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }
            catch(error){
                console.error(error);
            }
            finally{
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false); 
    }, [])

    return(
        <>
            {isLoading
                ? <LoadingScreen />
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
