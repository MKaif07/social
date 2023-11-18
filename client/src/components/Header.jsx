import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/userSlice";
import { IoMdSearch } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
export default function Header() {
  const theme = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  const handleTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className={`w-full`}>
      <div
        className={`bg-${theme}-primary flex flex-row mx-auto justify-around items-center py-3 shadow-boxShadow-${theme}`}
        // style={{ background: "#B0D9B1" }}
      >
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">Social</h1>
        </Link>
        <form>
          <div
            className={`flex justify-center text-${theme}-tertiary p-2 font-semibold border-${theme}-contrasting border-2 items-center`}
            // style={{ background: "#D0E7D2", border: "2px #618264 solid" }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none pr-2 placeholder-current"
            />
            <button>
              <IoMdSearch size={26} />
            </button>
          </div>
        </form>
        {/* Created a switch */}
        <div
          onClick={handleTheme}
          className={`border-${theme}-secondary border-2 p-1 rounded-full w-[4rem] h-9 text-${theme}-tertiary cursor-pointer`}
        >
          <button className={`relative ${theme === "dark" ? "left-6" : ""}`}>
            {theme === "dark" ? <FaMoon size={26} /> : <FaSun size={26} />}
          </button>
        </div>
        {/* theme */}
        <ul
          className={`flex gap-4 text-xl cursor-pointer text-${theme}-tertiary`}
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.picturePath}
                alt="profile pic"
                className="text-sm w-7 h-7 rounded-full"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
