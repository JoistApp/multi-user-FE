import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectUserData } from "../features/selectors/userSelector";

const useAuthenticate = () => {
  const user = useSelector(selectUserData);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (!user) {
      if (currentPath === '/signup') {
        return;
      } 
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [user, navigate]);
}

export default useAuthenticate;