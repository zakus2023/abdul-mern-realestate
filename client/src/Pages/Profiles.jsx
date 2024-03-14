import React from "react";
import { useSelector } from "react-redux";

export default function Profiles() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          
        id="avatar"/>
        <input type="text" placeholder="Username" className="border p-3 rounde-lg" id="username" />
        <input type="email" placeholder="Email" className="border p-3 rounde-lg" id="email" />
        <input type="password" placeholder="Password" className="border p-3 rounde-lg" id="password" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
