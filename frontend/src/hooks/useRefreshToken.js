import { useCallback } from "react";
import { axiosWithCredential } from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refreshToken = useCallback(async () => {
        let accessToken;

        axiosWithCredential.post('/auth/refresh_token')
            .then((res) => {
                accessToken = res.data.access_token;
                setAccessToken(res.data.access_token);
            })
            .catch((err) => {
                console.log(err);
                setAccessToken(null);
            })
        
        return accessToken;
    },[setAccessToken])
    
    return refreshToken;
}

export default useRefreshToken;