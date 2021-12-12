import { useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import UserProfile from "../../components/profile/UserProfile";

const ProfilePage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, []);
  return <UserProfile />;
};

export default ProfilePage;
