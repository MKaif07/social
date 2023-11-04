import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import {
  postFetchFail,
  postFetchStart,
  postFetchSuccess,
} from "../redux/postSlice";

export default function Feed() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { posts, selectedPost, loading, error } = useSelector(
    (state) => state.post
  );


  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(postFetchStart());
        const res = await fetch("/api/post", {
          method: "GET",
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(postFetchFail(data.message));
          return;
        }

        dispatch(postFetchSuccess(data));
      } catch (error) {
        dispatch(postFetchFail(error.message));
      }
    };

    fetchPost();
  }, []);

  return (
    <div
      className="flex flex-col justify-around rounded-xl"
      // style={{ background: "#B0D9B1" }}
    >
      <ul className=" mt-1 mb-7">
        {posts.map((post) => (
          <li className="mb-7" key={post._id}>
            <Post post={post} postUserId={post.userRef} />
          </li>
        ))}
      </ul>
    </div>
  );
}
