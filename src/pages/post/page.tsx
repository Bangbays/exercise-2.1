"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import PostList from "../postList/page";

const PostsPageComponent = () => {
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

const PostsPage = dynamic(() => Promise.resolve(PostsPageComponent), {
  ssr: false,
});

export default PostsPage;
