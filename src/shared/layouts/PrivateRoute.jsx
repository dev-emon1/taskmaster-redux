import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../configs/firebase.config";
import { setUser } from "../../features/user/userSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.user);

  // local loading
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || "User",
            email: user.email,
          }),
        );
      } else {
        dispatch(
          setUser({
            name: "",
            email: "",
          }),
        );
      }

      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // auth checking phase
  if (checkingAuth) {
    return <Loading />;
  }

  // not logged in → redirect
  if (!email) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  // logged in → allow access
  return children;
};

export default PrivateRoute;
