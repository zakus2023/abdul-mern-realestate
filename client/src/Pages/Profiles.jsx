import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

import { app } from "../firebase";

export default function Profiles() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  console.log(userListing);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  console.log(formData);

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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.error));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          id="avatar"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700 font-bold">
              Error uploading your image
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700 font-bold">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700 font-bold">
              Image successfuly uploaded
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="border p-3 rounde-lg"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounde-lg"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounde-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:bg-opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading . . ." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90"
          to={"/createlisting"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">
        {updateSuccess ? "User updated successfuly!!!" : ""}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show listings
      </button>
      <p className="text-red-700">
        {showListingError ? "Error showing your listings" : ""}
      </p>
      {userListing &&
        userListing.length > 0 &&
        userListing.map((listing) => (
          <div
            key={listing._id}
            className='border rounded-lg p-3 my-4 flex justify-between items-center gap-4'
          >
            <Link to={`/listings/${listing._id}`} className="flex-1">
              <img
                src={listing.imageUrls[0]}
                alt="listing cover"
                className="h-16 w-16  object-contain"
              />
            </Link>
            <Link
              to={`/listings/${listing._id}`}
              className="text-slate-700 font-semibold  hover:underline truncate flex-1"
            >
              <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col">
              <button className="text-green-500 uppercase">Edit</button>
              <button className="text-red-500 uppercase">Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}
