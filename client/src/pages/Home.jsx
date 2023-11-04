import React from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="flex flex-row justify-around">
      <UserSide />
      <div className="flex flex-col">
        <PostCenter />
        <Feed />
      </div>
      <FriendSide />
    </div>
  );
}
