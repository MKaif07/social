import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Bugs() {
  const { theme } = useSelector((state) => state.user);
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    text: "",
  });
  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className={`bg-${theme}-primary text-lg p-4 text-${theme}-tertiary h-[100vh] overflow-hidden`}
    >
      <form
        className={`flex flex-col my-4 p-3 max-w-lg mx-auto bg-${theme}-secondary rounded-xl`}
      >
        <h1 className="mb-7 text-2xl">Report a Bug</h1>
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
          style={{ borderColor: "#618264" }}
          minLength={3}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
          style={{ borderColor: "#618264" }}
          onChange={handleChange}
        />
        <textarea
          type="text"
          placeholder="Report bug..."
          id="text"
          className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
          minLength={5}
          style={{ borderColor: "#618264" }}
          onChange={handleChange}
        />
        <button
          onClick={"sendEmail"}
          className={`bg-${theme}-primary rounded-full py-3`}
        >
          Send Email
        </button>
      </form>
    </div>
  );
}
