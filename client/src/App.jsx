import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LoggedIn from "./components/LoggedIn";
import UserPage from "./pages/UserPage";
import FriendPage from "./pages/FriendPage";
import Chat from "./pages/Chat";
import Bugs from "./pages/Bugs";

export default function App() {
  const colors = [
    "bg-light-primary",
    "bg-light-secondary",
    "border-light-secondary",
    "bg-light-contrasting",
    "bg-dark-primary",
    "bg-dark-secondary",
    "border-dark-secondary",
    "bg-dark-contrasting",
    "text-light-tertiary",
    "text-dark-tertiary",
    "shadow-light-tertiary",
    "shadow-dark-tertiary",
  ];
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<LoggedIn />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/bug" element={<Bugs />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/profile/edit" element={<Profile />} />
          <Route path="/user/:id" element={<FriendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
