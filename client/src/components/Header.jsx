import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="w-full shadow-md shadow-current">
      <div
        className="flex flex-row mx-auto justify-around py-3 items-center"
        style={{ background: "#B0D9B1" }}
      >
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">Social</h1>
        </Link>
        <form>
          <div
            className="p-2 font-semibold"
            style={{ background: "#D0E7D2", border: "2px #618264 solid" }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none pr-2 placeholder-current"
            />
            <button>O</button>
          </div>
        </form>
        <ul className="flex gap-4 text-xl cursor-pointer">
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
