import { useSelector } from "react-redux";
import { selectViewLink, selectEditLink } from "../features/selectors/userSelector";
import { useNavigate } from "react-router-dom";

const useProtectAccess = (pageName) => {
  const navigate = useNavigate();
  const {
    hasEditAccess,
    hasViewAccess,
  } = useSelector(state => {
    return {
      hasViewAccess: selectViewLink(state, pageName),
      hasEditAccess: selectEditLink(state, pageName),
    }
  });

  if (!hasViewAccess) {
    navigate('/');
  }

  return { hasEditAccess, hasViewAccess };
};

export default useProtectAccess;