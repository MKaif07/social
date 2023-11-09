import React from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";

export default function UserPage() {
  return (
    <div className="md:flex md:justify-around w-full">
      <div className="lg:flex lg:gap-28">
        <div className="flex flex-col justify-around">
          <UserSide />
          <FriendSide />
          <div className="sm:hidden sm:bg-black flex flex-row">
            <PostCenter />
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-row">
          <PostCenter />
        </div>
      </div>
    </div>
  );
}
