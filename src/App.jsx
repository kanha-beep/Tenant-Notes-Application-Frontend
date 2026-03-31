import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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
  const [isPage, setIsPage] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("tokens");

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const res = await api.get("/auth/me");
          setIsLoggedIn(true);
          setIsPage(true);
          setUserRole(res.data.role);
        } catch (e) {
          setIsLoggedIn(false);
          setIsPage(false);
          setUserRole("");
          console.log("User not authenticated", e.response?.data?.message);
        }
      } else {
        setIsLoggedIn(false);
        setIsPage(false);
        setUserRole("");
      }
    };

    validateToken();
  }, [token]);

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
          <Route element={<ProtectedRoute />}>
            <Route path="/users/:userId" element={<CurrentOwnerProfile />} />
            <Route path="/users/:userId/edit" element={<EditUsersProfile />} />
            <Route
              path="/notes"
              element={<AllNotesFinal setIsPage={setIsPage} isPage={isPage} />}
            />
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
                  <div>Loading...</div>
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
            element={<Auth setIsLoggedIn={setIsLoggedIn} setMsg={setMsg} msg={msg} />}
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} setIsPage={setIsPage} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
