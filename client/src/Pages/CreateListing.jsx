import React from "react";

export default function CreateListing() {
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
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded uppercase hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
