import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  console.log(formData);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true)
        setImageUploadError(false)
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
       
        setImageUploadError(false)
        setUploading(false)
      }).catch((err)=>{
        setImageUploadError("Image upload failed (2 mb max per image)")
        setUploading(false)
      })
    }else{
        setImageUploadError("You can only upload 6 images per listing")
        setUploading(false)
    }
    
  };

  const handleRemoveImage = (index) =>{
    setFormData({
        ...formData, imageUrls: formData.imageUrls.filter((_, i)=>i !== index),
    })
  }

  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-4 flex-1 mt-4">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="address"
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border rounded-lg p-3"
            id="description"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-lg p-3"
                type="number"
                id="bedrooms"
                min="1"
                max="15"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-lg p-3"
                type="number"
                id="bathrooms"
                min="1"
                max="15"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-lg p-3"
                type="number"
                id="regularPrice"
                required
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                <span>($/Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-lg p-3"
                type="number"
                id="discountPrice"
                required
              />
              <div className="flex flex-col">
                <p>Discounted Price</p>
                <span>($/Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col my-3">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex my-2 gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading":"Upload"}
            </button>
          </div>
          <p>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index )=>(
                <div key={url} className="flex justify-between p-3 border  items-center">
                    <img src={url} alt="" className="w-20 h-20 object-contain rounded-lg my-2" />
                    <button onClick={()=> handleRemoveImage(index)} type="button" className="p-3 text-red-700 rounded -lg uppercase hover:opacity-75">Delete</button>
                </div>
                
            ))
          }
          <button className="bg-slate-700 text-white p-3 rounded uppercase hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
