"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import PostList from "../postList/page";

const PostsPage = () => {
  const email = useSelector((state: RootState) => state.user.email);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostList />
    </div>
  );
};

export default PostsPage;
