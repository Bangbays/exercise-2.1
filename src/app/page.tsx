import React from "react";
import Navbar from "@/components/navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <div className="container mx-auto p-4">
          <h1 className="text-2x1 font-bold">Welcome to MyApp</h1>
          <p>This is the home page</p>
        </div>
      </main>
    </>
  );
};

export default HomePage;
