import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ready,
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error, theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(ready());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFail(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error.message));
    }
    // console.log(formData);
  };

  return (
    <div className={`bg-${theme}-primary text-${theme}-tertiary h-[100vh]`}>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            className="bg-transparent placeholder-current focus:outline-none p-2 my-3"
            style={{ border: "2px #618264 dashed" }}
            placeholder="email"
            id="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            className="bg-transparent placeholder-current focus:outline-none p-2 my-3"
            style={{ border: "2px #618264 dashed" }}
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
          <button
            className="placeholder-current focus:outline-none p-2 my-3 font-semibold text-xl rounded-lg uppercase text-slate-500"
            style={{ background: "#B0D9B1", border: "2px #618264 solid" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign in"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-1">
          <p style={{ color: "#79AC78" }}>Don't Have an account?</p>
          <Link to="/sign-up">
            <span>Sign up</span>
          </Link>
        </div>
        {error && <span className="text-red-700">{error}</span>}
      </div>
    </div>
  );
}
