import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../utils/firebase.config";
import { loadingToggle, setUser } from "../../redux/reducers/userReducer";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();

  const { email, isLoading } = useSelector((state) => state.user);

  console.log(email);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
          }),
        );
        dispatch(loadingToggle(false));
      } else {
        dispatch(loadingToggle(false));
      }
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
