import React from "react";
import { BiUserCircle, BiUserMinus, BiUserPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
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
  friendId,
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
      <Link to={friendId === userId ? "/profile" : `/user/${friendId}`}>
        <div className="flex flex-row gap-4 py-3">
          <div className="w-14 h-15 rounded-full">
            <img
              src={userPicture}
              alt="img"
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="font-semibold text-md ">{`${firstName} ${lastName}`}</h1>
            <p className="text-sm">{subtitle}</p>
          </div>
        </div>
      </Link>

      {userRef !== userId ? (
        <div
          className="flex rounded-full w-10 h-10 items-center justify-center cursor-pointer"
          style={{ backgroundColor: "#79AC78" }}
          onClick={() => patchFriend(userRef)}
        >
          {isFriend ? <BiUserMinus size={24} /> : <BiUserPlus size={24} />}
        </div>
      ) : (
        // <Link to="/profile">
        <div
          className="flex rounded-full w-10 h-10 items-center justify-center cursor-pointer"
          style={{ backgroundColor: "#79AC78" }}
        >
          <BiUserCircle size={40} />
        </div>
        // </Link>
      )}
    </div>
  );
}
