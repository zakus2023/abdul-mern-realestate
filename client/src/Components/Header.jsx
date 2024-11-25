import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { set } from "mongoose";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  console.log(searchTerm);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="header px-10">
      <div className="navigator">
        <div className="left-navigator">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <form className="header-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search . . ."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button className="fasearch">
              <FaSearch className="fa" />
            </button>
          </form>
        </div>
        <div className="right-navigator">
          <ul>
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/about" className="link">
              <li>About</li>
            </Link>
            <Link to="/contact" className="link">
              <li>Contact us</li>
            </Link>

            <div className="flex gap-2">
              {currentUser ? (
                <Link to="/profiles" className="profile-pic link">
                  {" "}
                  <img src={currentUser.avatar} alt="pic" className="upic" />
                </Link>
              ) : (
                <Link to="/signin">
                  {" "}
                  <li>Signin</li>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
