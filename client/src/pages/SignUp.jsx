import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { theme } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    console.log(formData);
  };
  return (
    <div className={`bg-${theme}-primary text-${theme}-tertiary h-[90.7vh]`}>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-2">
            <input
              required
              type="text"
              placeholder="first name"
              className="bg-transparent placeholder-current focus:outline-none p-2 my-3 flex-1"
              style={{ border: "2px #618264 dashed" }}
              id="firstName"
              onChange={handleChange}
            />
            <input
              required
              type="text"
              placeholder="last name"
              className="bg-transparent placeholder-current focus:outline-none p-2 my-3 flex-1"
              style={{ border: "2px #618264 dashed" }}
              id="lastName"
              onChange={handleChange}
            />
          </div>

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
          <div className="flex gap-4 flex-2">
            <input
              required
              type="text"
              placeholder="location"
              className="bg-transparent placeholder-current focus:outline-none p-2 my-3 flex-1"
              style={{ border: "2px #618264 dashed" }}
              id="location"
              onChange={handleChange}
            />
            <input
              required
              type="text"
              placeholder="occupation"
              className="bg-transparent placeholder-current focus:outline-none p-2 my-3 flex-1"
              style={{ border: "2px #618264 dashed" }}
              id="occupation"
              onChange={handleChange}
            />
          </div>

          <button
            className="placeholder-current focus:outline-none p-2 my-3 font-semibold text-xl rounded-lg uppercase text-slate-500"
            style={{ background: "#B0D9B1", border: "2px #618264 solid" }}
            type="submit"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-1">
          <p style={{ color: "#79AC78" }}>Already Have an account?</p>
          <Link to="/sign-in">
            <span>Sign in</span>
          </Link>
        </div>
        {error && <span className="text-red-700">{error}</span>}
      </div>
    </div>
  );
}
