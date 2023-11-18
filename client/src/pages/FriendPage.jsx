import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserSide from "../components/UserSide";
import PostCenter from "../components/PostCenter";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import {
  setFriendFail,
  setFriendStart,
  setFriendSuccess,
} from "../redux/userSlice";
import FriendSide from "../components/FriendSide";

export default function FriendPage() {
  const params = useParams();
  const { id } = params;
  const { friendData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const fetchFriend = async () => {
    dispatch(setFriendStart());
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "GET",
      });
      console.log("id:", id);
      const data = await res.json();

      if (data.success === false) {
        dispatch(setFriendFail(data.message));
        return;
      }
      dispatch(setFriendSuccess(data));
    } catch (error) {
      dispatch(setFriendFail(error));
    }
  };

  useEffect(() => {
    fetchFriend();
  }, [id]);

  return (
    <div className="md:flex md:justify-around w-full">
      <div className="lg:flex lg:gap-28">
        <div className="flex flex-col">
          <UserSide
            picture={friendData?.picturePath}
            firstName={friendData?.firstName}
            lastName={friendData?.lastName}
            subtitle={friendData?.friends.length}
            location={friendData?.location}
            occupation={friendData?.occupation}
            viewedProfile={friendData?.viewedProfile}
            impressions={friendData?.impressions}
          />
          <FriendSide />
          <div className="sm:hidden sm:bg-black flex flex-col">
            <div className=""></div>
            <Feed />
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col">
          {/* <div className="mt-10"></div> */}
          <Feed />
        </div>
      </div>
    </div>
  );
}
