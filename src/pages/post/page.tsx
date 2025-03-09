"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import PostList from "../postList/page";

const PostsPage = () => {
  const email = useSelector((state: RootState) => state.user.email);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  if (!isClient || !email) return <div>Loading...</div>;

  return (
    <div>
      <PostList />
    </div>
  );
};

export default PostsPage;
