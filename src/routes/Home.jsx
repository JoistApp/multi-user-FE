import useAuthenticate from "../hooks/useAuthenticate";
import { useSelector } from "react-redux";
import { selectUserData } from "../features/user/userSelector";

export default function Home() {
  useAuthenticate();
  const user = useSelector(selectUserData);

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};