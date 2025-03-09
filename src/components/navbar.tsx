"use client";

import Link from "next/link";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const email = useSelector((state: RootState) => state.user.email);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold"> My App</div>
        <div>
          {email ? (
            <>
              <span className="text-white mr-4">{email}</span>
              <Link href="/posts" className="text-white">
                Post
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className="text-white mr-4">
                Sign Up
              </Link>
              <Link href="/login" className="text-white">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
