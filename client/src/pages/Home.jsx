import React, { useEffect } from "react";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import FriendSide from "../components/FriendSide";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setFriendFriends, setFriendSuccess } from "../redux/userSlice";
import { setPost } from "../redux/postSlice";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  dispatch(setFriendSuccess(null));

  return (
    <>
      <div className="hidden md:flex md:flex-row justify-around">
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
        <div className="flex flex-col">
          <PostCenter />
          <Feed />
        </div>
        <FriendSide />
      </div>

      <div className="md:hidden flex flex-col">
        <PostCenter />
        <Feed />
      </div>
    </>
  );
}
