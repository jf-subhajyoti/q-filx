import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchQueryHandler = (e) => {
    if (e.keyCode === 13 && query !== '') {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler = (type) => {
    let path = '/explore';
    if (type === 'movie') {
      navigate(`${path}/movie`);
    } else if (type === 'tv') {
      navigate(`${path}/tv`);
    }
    setMobileMenu(false);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  return (
    <header className={`header ${show} ${mobileMenu ? 'mobileView' : ''}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('movie')}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler('tv')}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {
            mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )
          }
        </div>
      </ContentWrapper>
      {
        showSearch && (
          <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <input type="text" placeholder='Search for a movie or TV show....'
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                  value={query} />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )
      }
    </header>
  );
};

export default Header
