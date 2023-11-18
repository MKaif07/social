import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/userSlice";

export default function Switch() {
  const { theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleDarkMode = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
      setIsDarkMode(false);
    } else {
      dispatch(setTheme("dark"));
      setIsDarkMode(true);
    }
  };

  console.log("dark mode: ", isDarkMode);

  return (
    <>
      <div
        onClick={toggleDarkMode}
        className="flex flex-row justify-between items-center toggle"
      >
        <label
          htmlFor="dark-toggle"
          className="flex items-center cursor-pointer"
        >
          <div
            // className={`relative ${theme === "dark" ? "translate-x-full" : ""}`}
            className="items-center"
          >
            <input
              type="checkbox"
              name="dark-mode"
              id="dark-toggle"
              className="checkbox hidden"
            />
            <div className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full transition-transform duration-300 ease-in-out transform">
              {/* This is the background */}
            </div>
            <div
              className={`relative ${
                theme === "dark" ? "translate-x-full" : ""
              } dot absolute top-[-28px] left-1 dark:bg-white bg-gray-800 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out transform`}
            >
              {/* This is the dot */}
            </div>
          </div>
          <div className="ml-3 dark:text-white text-gray-900 font-medium uppercase">
            {theme} Mode
          </div>
        </label>
      </div>
    </>
  );
}
