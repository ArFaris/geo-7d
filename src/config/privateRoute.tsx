import LoadingScreen from "components/LoadingScreen";
import { useAuth } from "contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode}) => {
  const { user, loading } = useAuth()

  console.log(user, loading)

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" />

  return children;
}
