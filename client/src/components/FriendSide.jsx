import React, { useEffect } from "react";
import FriendItem from "./FriendItem";
import { useDispatch, useSelector } from "react-redux";
import { setFriendFriends, setFriends } from "../redux/userSlice";
import FriendBar from "./FriendBar";
import { useLocation } from "react-router-dom";

export default function FriendSide() {
  const dispatch = useDispatch();

  const location = useLocation();
  const currentPath = location.pathname;

  const { currentUser, theme } = useSelector((state) => state.user);
  const { friendData } = useSelector((state) => state.user);
  const isFriendPage = currentPath === `/user/${friendData?._id}`;

  const getFriends = async () => {
    let response;
    isFriendPage
      ? (response = await fetch(`/api/user/${friendData._id}/friends`, {
          method: "GET",
        }))
      : (response = await fetch(`/api/user/${currentUser._id}/friends`, {
          method: "GET",
        }));
    const data = await response.json();

    isFriendPage
      ? dispatch(setFriendFriends(data))
      : dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, [isFriendPage]);

  let friends;
  isFriendPage
    ? (friends = useSelector((state) => state.user.friendData?.friends))
    : (friends = useSelector((state) => state.user.currentUser?.friends));

  return (
    <>
      <div
        className={`w-[90%] bg-${theme}-secondary md:block lg:block lg:w-[352px] h-fit py-3 shadow-lg mx-auto mt-3 lg:mt-10 rounded-lg`}
        // style={{ background: "#B0D9B1" }}
      >
        <h1 className="text-2xl ml-7">Friends List</h1>
        <ul>
          {friends &&
            friends.map((friend) => (
              <li className="py-1" key={friend._id}>
                <FriendBar
                  friendId={friend._id}
                  userPicture={friend.picturePath}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  subtitle={friend.occupation}
                  userRef={friend._id}
                  userId={currentUser._id}
                  isFriend={true}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
