import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/userSlice";
import { IoMdChatbubbles, IoMdSearch } from "react-icons/io";
import { FaBug, FaMoon, FaSun } from "react-icons/fa";
export default function Header() {
  const dispatch = useDispatch();
  const handleTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  const { currentUser, theme } = useSelector((state) => state.user);
  return (
    <nav className={`w-full`}>
      <div
        className={`bg-${theme}-secondary flex flex-row mx-auto justify-around items-center py-3 shadow-boxShadow-${theme}`}
        // style={{ background: "#B0D9B1" }}
      >
        <Link to="/">
          <h1 className="title font-bold cursor-pointer">
            <span className="title-word title-word-1">So</span>
            <span className="title-word title-word-2">ci</span>
            <span className="title-word title-word-3">al</span>
          </h1>
        </Link>
        {currentUser && (
          <form>
            <div
              className={`flex justify-center w-28 md:w-full relative text-${theme}-tertiary p-2 font-semibold border-${theme}-contrasting border-2 items-center rounded-full`}
              // style={{ background: "#D0E7D2", border: "2px #618264 solid" }}
            >
              <input
                type="text"
                placeholder="Search..."
                className=" w-[80%] bg-transparent focus:outline-none pr-2 placeholder-current"
              />
              <button>
                <IoMdSearch size={26} />
              </button>
            </div>
          </form>
        )}
        {/* Created a switch */}

        <div
          onClick={handleTheme}
          className={`hidden md:block border-${theme}-tertiary border-2 p-1 rounded-full w-[4rem] h-9 text-${theme}-tertiary cursor-pointer`}
        >
          <button className={`relative ${theme === "dark" ? "left-6" : ""}`}>
            {theme === "dark" ? <FaMoon size={26} /> : <FaSun size={26} />}
          </button>
        </div>
        <button
          onClick={handleTheme}
          className={`md:hidden relative text-${theme}-tertiary`}
        >
          {theme === "dark" ? <FaMoon size={26} /> : <FaSun size={26} />}
        </button>
        {/* add a page to report bugs */}
        <ul
          className={`hidden md:flex gap-9 text-xl cursor-pointer text-${theme}-tertiary px-3`}
        >
          {currentUser && (
            <>
              <Link to="/chat">
                <li>
                  <IoMdChatbubbles size={26} />
                </li>
              </Link>
              {/* <Link to="/bug">
                <li className="hidden md:block">
                  <FaBug size={26} />
                </li>
              </Link> */}
            </>
          )}

          {currentUser ? (
            <Link to="/profile/edit">
              <div className="rounded-full object-cover">
                <img
                  src={currentUser.picturePath}
                  alt="profile pic"
                  className="text-sm w-7 h-7 rounded-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link to="/sign-in">
              <li>Sign in</li>
            </Link>
          )}
        </ul>
        <ul
          className={`md:hidden flex gap-3 text-xl cursor-pointer text-${theme}-tertiary px-3`}
        >
          {currentUser && (
            <>
              <Link to="/chat">
                <li>
                  <IoMdChatbubbles size={26} />
                </li>
              </Link>
              {/* <Link to="/bug">
                <li className="hidden md:block">
                  <FaBug size={26} />
                </li>
              </Link> */}
            </>
          )}

          {currentUser ? (
            <Link to="/profile/edit">
              <div className="rounded-full object-cover">
                <img
                  src={currentUser.picturePath}
                  alt="profile pic"
                  className="text-sm w-7 h-7 rounded-full object-cover"
                />
              </div>
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
