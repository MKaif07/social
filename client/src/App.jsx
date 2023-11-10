import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/privateRoute";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LoggedIn from "./components/LoggedIn";
import UserPage from "./pages/UserPage";
import FriendPage from "./pages/FriendPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<LoggedIn />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/profile/edit" element={<Profile />} />
          <Route path="/user/:id" element={<FriendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
