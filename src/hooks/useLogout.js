import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try{
            const response = await axios.get('/api/logout', {
                withCredentials: true
            })
        }
        catch(error){
            console.error(error);
        }
    }

    return logout;
}

