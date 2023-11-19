import React from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";
import Feed from "../components/Feed";
import { useSelector } from "react-redux";

export default function UserPage() {
  const { currentUser, theme } = useSelector((state) => state.user);
  return (
    <div
      className={` bg-${theme}-primary text-${theme}-tertiary md:flex md:justify-around w-full`}
    >
      <div className="lg:flex lg:gap-28">
        <div className="flex flex-col">
          <UserSide
            picture={currentUser.picturePath}
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
            subtitle={currentUser.friends.length}
            location={currentUser.location}
            occupation={currentUser.occupation}
            viewedProfile={currentUser.viewedProfile}
            impressions={currentUser.impressions}
          />
          <FriendSide />
          <div className="sm:hidden sm:bg-black flex flex-col">
            <PostCenter />
            <Feed />
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col">
          <PostCenter />
          <Feed />
        </div>
      </div>
    </div>
  );
}
