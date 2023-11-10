import {
  BiUserMinus,
  BiUserPlus,
  BiComment,
  BiShareAlt,
  BiUserCircle,
} from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPost } from "../redux/postSlice";
import { setFriends } from "../redux/userSlice";
import { useState } from "react";
import FriendBar from "./FriendBar";

export default function Post({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [like, setLike] = useState(Boolean(post.likes[currentUser._id]));
  const likeCount = Object.keys(post.likes).length;
  const friends = currentUser?.friends;
  const isFriend = friends.find((friend) => friend._id === post.userRef);

  const handleLike = async () => {
    // instantaneous liking and disliking
    setLike(!like);
    const res = await fetch(`/api/post/${post._id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUser._id }),
    });
    const updatedPost = await res.json();
    dispatch(setPost(updatedPost));
  };

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
    <div
      className="grid bg-transparent rounded-xl p-3"
      style={{ background: "#B0D9B1" }}
    >
      <FriendBar
        friendId={post.userRef}
        userPicture={post.userPicturePath}
        firstName={post.firstName}
        lastName={post.lastName}
        subtitle={post.location}
        userRef={post.userRef}
        userId={currentUser._id}
        isFriend={isFriend}
      />
      <div className="mx-auto">
        <div className="px-4 pb-2 font-bold">
          <h1>{post.description}</h1>
        </div>
        {post.picturePath && (
          <div className="rounded-xl px-4">
            <img
              src={post.picturePath}
              alt="post img"
              className="h-80 w-[30rem] object-cover rounded-xl"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-center px-4 pt-2">
        <div className="flex gap-4">
          <div
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={handleLike}
          >
            {like ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
            <p className="text-xl">{likeCount}</p>
            {/* <AiFillHeart /> */}
          </div>
          <div className="cursor-pointer">
            <BiComment size={30} />
          </div>
        </div>
        <div
          className="flex w-8 h-8 items-center justify-center cursor-pointer rounded-full"
          style={{ background: "#79AC78" }}
        >
          <BiShareAlt size={22} />
        </div>
      </div>
    </div>
  );
}
