import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AllNotesFinal from "./NotesPages/AllNotesFinal.jsx";
import NewNotes from "./NotesPages/NewNotes.jsx";
import EditNotes from "./NotesPages/EditNotes.jsx";
import SingleNotes from "./NotesPages/SingleNotes.jsx";
import Auth from "./Auth/Auth.jsx";
import Logout from "./Auth/Logout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Health from "./AdminPages/Health.jsx";
import MyNavbar from "./Components/Navbar.jsx";
import Plan from "./AdminPages/Plan.jsx";
import api from "./init/instance.js";
import Home from "./Components/Home.jsx";
import NotFound from "./Components/NotFound.jsx";
import Dashboard from "./AdminPages/Dashboard/Dashboard.jsx";
import Msg from "./Components/AlertBoxes/Msg.jsx";
import { consumeFlashToast, createToast } from "./utils/toast.js";
import EditUsersProfile from "./UsersPages/EditUsersProfile.jsx";
import CurrentOwnerProfile from "./UsersPages/CurrentOwnerProfile.jsx";
import AllUsersFinal from "./UsersPages/AllUsersFinal.jsx";
import SingleUsers from "./UsersPages/SingleUsers.jsx";
import EditUsers from "./UsersPages/EditUsers.jsx";
import NewUsers from "./UsersPages/NewUsers.jsx";

function App() {
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await api.get("/auth/me");
        const rawRole = res.data.role;
        const uiRole = rawRole === "owner" || rawRole === "admin" ? "admin" : "user";
        setIsLoggedIn(true);
        setUserRole(uiRole);
        localStorage.setItem("role", uiRole);
        localStorage.setItem("userId", res.data._id);
      } catch (e) {
        setIsLoggedIn(false);
        setUserRole("");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    validateToken();
  }, [location.pathname]);

  useEffect(() => {
    const flashMessage = consumeFlashToast();
    if (flashMessage) {
      setMsg(createToast(flashMessage, flashMessage.type));
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <MyNavbar
        isLoggedIn={isLoggedIn}
        msg={msg}
        setMsg={setMsg}
        userRole={userRole}
      />
      <Msg msg={msg} setMsg={setMsg} />
      <div className="mx-auto px-3 py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isCheckingAuth={isCheckingAuth}
              />
            }
          >
            <Route path="/users/:userId" element={<CurrentOwnerProfile />} />
            <Route path="/users/:userId/edit" element={<EditUsersProfile />} />
            <Route path="/notes" element={<AllNotesFinal />} />
            <Route path="/notes/new" element={<NewNotes />} />
            <Route path="/notes/:noteId" element={<SingleNotes />} />
            <Route path="/notes/:noteId/edit" element={<EditNotes />} />
            <Route path="/admin/users" element={<AllUsersFinal />} />
            <Route path="/admin/users/new" element={<NewUsers />} />
            <Route path="/admin/users/:userId" element={<SingleUsers />} />
            <Route path="/admin/users/:userId/edit" element={<EditUsers />} />
            <Route
              path="/admin/dashboard"
              element={
                userRole === "" ? (
                  <div className="bg-yellow-200 border-2 border-green-200 h-10 w-full text-center">Loading...</div>
                ) : userRole === "admin" ? (
                  <Dashboard isLoggedIn={isLoggedIn} />
                ) : (
                  <Navigate to="/notes" />
                )
              }
            />
            <Route path="/admin/plan" element={<Plan />} />
          </Route>
          <Route
            path="/auth"
            element={
              <Auth setIsLoggedIn={setIsLoggedIn} setMsg={setMsg} msg={msg} />
            }
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
