import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./infopage.scss";
import web3Logo from "../../static/images/icons/web3logo.svg";
import AuthorImg from "../../static/images/AuthorsImg.svg";
import AdminImg from "../../static/images/AdminImg.svg";
import AdvertiserImg from "../../static/images/AdvertiserImg.svg";
import publicationsFull from "../../static/images/templateLogos/PublicationsLogo.svg";

function InfoPage() {
  const navigate = useNavigate();
  if (!localStorage.getItem("loginData")) {
    localStorage.removeItem("selectedApp");
  }
  return (
    <div className="home-main">
      <div className="main-nav">
        <div className="nav-logo">
          <img src={publicationsFull} alt="web3today" />
        </div>
        <div className="nav-link">
          <p
            className="nav-text"
            onClick={() => {
              window.open("https://explore.publications.app/");
            }}
          >
            Publications
          </p>
        </div>
      </div>
      <div className="info-images">
        <Link
          to="/login/authors"
          className="image-container"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <img src={AuthorImg} alt="author" className="disp-nav-img" />
          <p className="nav-text-1">Authors</p>
        </Link>
        <Link to="/login/admin" className="image-container">
          <img src={AdminImg} alt="admin" className="disp-nav-img" />
          <p className="nav-text-1">Admins</p>
        </Link>
        <div className="image-container">
          <img src={AdvertiserImg} alt="advertiser" className="disp-nav-img" />
          <p className="nav-text-1">Advertisers</p>
        </div>
      </div>
      {/* <p className="infoTitle">Welcome to WEB3TODAY Management</p>

      <div className="infoBlock">
        <Link to="/login/admin" className="infoBtn">Admin Page</Link>
        &nbsp;      &nbsp;
        &nbsp;
        <Link to="/login/authors" className="infoBtn">Authors Page</Link>
      </div> */}
    </div>
  );
}

export default InfoPage;
