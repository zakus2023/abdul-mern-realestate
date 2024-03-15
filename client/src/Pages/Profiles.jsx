import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

export default function Profiles() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  //My firebase storage rules
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.')

  //if there is a file call this function
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={ formData.avatar || currentUser.avatar}
          alt="Profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          id="avatar"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700 font-bold">Error uploading your image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700 font-bold">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700 font-bold">Image successfuly uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounde-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounde-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounde-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
