import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from 'lib/Supabase';
import LoadingScreen from 'components/LoadingScreen';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    }

    handleAuth();
  }, []);

  return <LoadingScreen />;
}

export default AuthCallback;
