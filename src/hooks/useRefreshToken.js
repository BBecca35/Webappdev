import axios from '../api/axios'
import useAuth from './useAuth'
import { jwtDecode } from 'jwt-decode';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/api/token/refresh", {
            withCredentials: true
        });
        const accessToken = response.data.accessToken;
        const decodedToken = jwtDecode(accessToken);
        const role = decodedToken.UserInfo.role;
        const username = decodedToken.UserInfo.username;
        const userId = localStorage.getItem("userId");

        setAuth({accessToken: accessToken, UserInfo: {
            id: userId,
            username: username,
            role: role
        }});

    }
    return refresh;
};

export default useRefreshToken;