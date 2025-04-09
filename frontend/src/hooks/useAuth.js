import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const {accessToken, setAccessToken, role} = useContext(AuthContext);

  return {accessToken, setAccessToken, role};
}

export default useAuth;