import React, { useEffect } from "react";
import FriendItem from "./FriendItem";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../redux/userSlice";
import FriendBar from "./FriendBar";

export default function FriendSide() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.currentUser?.friends);

  const getFriends = async () => {
    const response = await fetch(`/api/user/${currentUser._id}/friends`, {
      method: "GET",
    });
    const data = await response.json();

    dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <div
        className="w-[352px] h-fit py-3 shadow-lg mx-10 mt-10 rounded-lg"
        style={{ background: "#B0D9B1" }}
      >
        <h1 className="text-2xl ml-7">Friends List</h1>
        <ul>
          {friends &&
            friends.map((friend) => (
              <li className="py-1" key={friend._id}>
                {/* <FriendItem
                  friendPicture={friend.picturePath}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  occupation={friend.occupation}
                /> */}
                <FriendBar
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
