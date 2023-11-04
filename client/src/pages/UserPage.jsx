import React from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";

export default function UserPage() {
  return (
    <div className="flex flex-row gap-7 align-middle">
      <div className="flex flex-col justify-around">
        <UserSide />
        <FriendSide />
      </div>
      <div className="flex flex-row">
        <PostCenter />
      </div>
    </div>
  );
}
