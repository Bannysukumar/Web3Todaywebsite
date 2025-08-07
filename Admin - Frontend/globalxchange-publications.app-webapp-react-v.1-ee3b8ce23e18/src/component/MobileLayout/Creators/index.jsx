import React, { useContext, useEffect, useState } from "react";
import MobileNav from "../MobileNav";
import classNames from "./creators.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useNavigate } from "react-router-dom";
import { SocialMediaHandles } from "../../ArticlesMain";
import FloatingFooter from "../FloatingFooter";
import useWindowDimensions from "../../../services/WindowSize";

const CreatorsMobile = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { setAuthorDetails } = useContext(GlobalContex);
  const [allcreators, setAllCreators] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        // console.log(response?.data?.data, "creators mobile");
        if (response?.data?.data) {
          setAllCreators(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message, "creators mobile error");
      });
  }, []);

  return (
    <div className={classNames.creatorsMobile}>
      <div>
        <MobileNav />
      </div>
      {/* <div className={classNames.heading}>Creators</div> */}
      <div className={classNames.eachCreator}>
        {allcreators?.length > 0
          ? allcreators?.map((eachauthor) => {
              return (
                <div
                  className={classNames.eachAuthorprofile}
                  onClick={() => {
                    setAuthorDetails(eachauthor);
                    navigate(`/${eachauthor?.email}/article`);
                    localStorage.setItem("selectedauthor", eachauthor?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={eachauthor?.profile_pic ? eachauthor?.profile_pic : ""}
                    alt=""
                  />
                  <div className={classNames.authorDetails}>
                    <div className={classNames.name}>
                      {eachauthor?.name ? eachauthor?.name : ""}
                    </div>
                    <div>
                      <div className={classNames.viewProfileBtn}>
                        View Profile
                      </div>
                      <div className={classNames.socialMediaHandles}>
                        <SocialMediaHandles />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  );
};

export default CreatorsMobile;
