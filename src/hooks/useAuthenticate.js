import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../features/user/userSelector";

const useAuthenticate = () => {
  const user = useSelector(selectUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [user, navigate]);
}

export default useAuthenticate;