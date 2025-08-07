import React, { useState } from "react";
import "./publication.scss";

import publicationsFull from "../../static/images/templateLogos/PublicationsLogo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PublicationPage = () => {
  const navigate = useNavigate();

  const [allPublications, setAllPublications] = useState("");

  useEffect(() => {
    axios
      .get("https://publications.apimachine.com/publication")
      .then((response) => {
        if (response?.data?.status && response?.data?.data?.length > 0) {
          // console.log(response?.data?.data, "all publications");
          setAllPublications(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message, "all publications error");
      });
  }, []);

  return (
    <div className="home-main">
      <div className="main-nav">
        <div
          className="nav-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={publicationsFull} alt="web3today" />
        </div>
        <div className="nav-link">
          <p
            className="nav-text"
            onClick={() => {
              navigate("/");
            }}
          >
            Dashboard
          </p>
        </div>
      </div>
      <div className="publications-container">
        <div className="publications-container-title">All Publications</div>
        <div className="all-publications">
          {allPublications?.length > 0 &&
            allPublications?.map(({ name, cover_pic, _id }, index) => {
              return (
                <div className="each-publication">
                  <div className="publication-img">
                    <img src={cover_pic} alt="" />
                  </div>
                  <div className="publication-detail">
                    <div className="publication-name">{name}</div>
                    <div className="publication-btn">Follow</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PublicationPage;
