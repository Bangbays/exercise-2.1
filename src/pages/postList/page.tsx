"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/lib/store";
import { setPosts, addPost } from "@/lib/postSlice";

const PostList = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/posts");
      dispatch(setPosts(response.data));
    };

    fetchPosts();
  }, [dispatch]);

  const handleAddPost = async () => {
    if (newPost.length <= 350) {
      const newPostData = {
        content: newPost,
        createdAt: new Date().toISOString(),
        author: email,
      };
      const response = await axios.post(
        "http://localhost:5000/posts",
        newPostData
      );
      dispatch(addPost(response.data));
      setNewPost("");
    } else {
      alert("Post content exceeds the maximum length of 350 characters.");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <div className="mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="What's on your mind?"
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Add Post
        </button>
      </div>
      <ul>
        {posts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((post) => (
            <li
              key={post.id}
              className="mb-4 p-4 border border-gray-300 rounded-md"
            >
              <div>{post.content}</div>
              <div className="text-gray-500 text-sm mt-2">
                Posted by {post.author} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostList;
