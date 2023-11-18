import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import {
  postFetchFail,
  postFetchStart,
  postFetchSuccess,
} from "../redux/postSlice";
import { useLocation, useParams } from "react-router-dom";

export default function Feed() {
  const dispatch = useDispatch();
  const { currentUser, theme } = useSelector((state) => state.user);
  const { posts, selectedPost, loading, error } = useSelector(
    (state) => state.post
  );
  const location = useLocation();
  const currentPath = location.pathname;

  const isHomePage = currentPath === "/";
  const isProfilePage = currentPath === "/profile" || "/user/:id";
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(postFetchStart());

        console.log(currentPath);
        if (isProfilePage) {
          console.log("profile page!!!");

          const bodyJson = id
            ? JSON.stringify({ id })
            : JSON.stringify({ id: currentUser._id });

          console.log("bodyJSON:", bodyJson);

          const res = await fetch("/api/post/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: bodyJson,
          });
          const data = await res.json();

          if (data.success === false) {
            dispatch(postFetchFail(data.message));
            return;
          }

          dispatch(postFetchSuccess(data));
        }

        if (isHomePage) {
          console.log("homepage");
          const res = await fetch("/api/post", {
            method: "GET",
          });
          const data = await res.json();

          if (data.success === false) {
            dispatch(postFetchFail(data.message));
            return;
          }

          dispatch(postFetchSuccess(data));
        }
      } catch (error) {
        dispatch(postFetchFail(error.message));
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div
      className={`flex flex-col bg-${theme}-primary rounded-lg w-[90%] m-auto lg:w-[540px] h-fit py-7 mb-7`}
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
