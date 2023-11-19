import React from "react";
import { useSelector } from "react-redux";

export default function Chat() {
  const { theme } = useSelector((state) => state.user);
  return (
    <div
      className={`bg-${theme}-primary text-2xl p-4 text-${theme}-tertiary h-[90.7vh] overflow-hidden`}
    >
      <h1>This service will be available soon...</h1>
    </div>
  );
}
