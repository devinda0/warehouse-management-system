import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const {accessToken, setAccessToken, role, username} = useContext(AuthContext);

  return {accessToken, setAccessToken, role, username};
}

export default useAuth;