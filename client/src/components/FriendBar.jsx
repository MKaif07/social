import React from "react";
import { BiUserCircle, BiUserMinus, BiUserPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { setFriends } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FriendBar({
  userPicture,
  firstName,
  lastName,
  subtitle,
  userRef,
  userId,
  isFriend,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const patchFriend = async (postUserId) => {
    const res = await fetch(`/api/user/${currentUser._id}/${postUserId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends(data));
  };

  return (
    <div className="flex flex-row justify-between px-4 items-center">
      {
        (userPicture = "" && (
          <h1 className="text-3xl text-red-700">{userPicture}</h1>
        ))
      }
      <div className="flex flex-row gap-4 py-3">
        <div className="w-14 h-15 rounded-full">
          <img
            src={
              userPicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="img"
            className="w-14 h-15 rounded-full"
          />
        </div>
        <div>
          <h1 className="font-semibold text-md ">{`${firstName} ${lastName}`}</h1>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>
      {userRef !== userId ? (
        <div
          className="flex rounded-full w-10 h-10 items-center justify-center cursor-pointer"
          style={{ backgroundColor: "#79AC78" }}
          onClick={() => patchFriend(userRef)}
        >
          {isFriend ? <BiUserMinus size={24} /> : <BiUserPlus size={24} />}
        </div>
      ) : (
        <Link to="/profile">
          <div
            className="flex rounded-full w-10 h-10 items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#79AC78" }}
          >
            <BiUserCircle size={40} />
          </div>
        </Link>
      )}
    </div>
  );
}
