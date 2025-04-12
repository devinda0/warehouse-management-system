import { useCallback } from "react";
import { axiosWithCredential } from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refreshToken = useCallback(async () => {
        let accessToken;

        axiosWithCredential.post('/user/refresh_token')
            .then((res) => {
                accessToken = res.data.accessToken;
                setAccessToken(res.data.accessToken);
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