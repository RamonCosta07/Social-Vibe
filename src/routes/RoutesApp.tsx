// React Router Dom
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Pages
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import NotFound from "../pages/notFound/NotFound";
import Profile from "../pages/profile/Profile";
import Friends from "../pages/friends/Friends";
import Users from "../pages/users/Users";
// Hooks
import { useEffect, useState } from "react";
// Components
import PrivateRouteLogin from "./PrivateRouteLogin";
import PrivateRoute from "./PrivateRoute";
import Loading from "../components/loading/Loading";
import Layout from "../components/layout/Layout";
// Firebase
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
// Scroll
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({top: 0});
  }, [pathname]);
  return null;
}

const RoutesApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Layout />} />
        </Route>

        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="/profile" element={<Layout />} />
        </Route>

        <Route
          path="/friends"
          element={
            <PrivateRoute user={user}>
              <Friends />
            </PrivateRoute>
          }
        >
          <Route path="/friends" element={<Layout />} />
        </Route>

        <Route
          path="/users"
          element={
            <PrivateRoute user={user}>
              <Users />
            </PrivateRoute>
          }
        >
          <Route path="/users" element={<Layout />} />
        </Route>

        <Route
          path="/login"
          element={
            <PrivateRouteLogin user={user}>
              <Login />
            </PrivateRouteLogin>
          }
        />

        <Route
          path="/register"
          element={
            <PrivateRouteLogin user={user}>
              <SignUp />
            </PrivateRouteLogin>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
