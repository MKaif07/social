import React from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";

export default function UserPage() {
  return (
    <div className="flex justify-around">
      <div className="flex gap-7">
        <div className="flex flex-col justify-around">
          <UserSide />
          <FriendSide />
        </div>
        <div className="flex flex-row">
          <PostCenter />
        </div>
      </div>
    </div>
  );
}
