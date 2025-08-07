import React, { useContext, useEffect, useState } from "react";
import MobileNav from "../MobileNav";
import classNames from "./creators.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";
import { SocialMediaHandles } from "../../ArticlesMain";
import FloatingFooter from "../FloatingFooter";
import useWindowDimensions from "../../../services/WindowSize";
import Skeleton from "react-loading-skeleton";

const CreatorsMobile = () => {
  const history = useHistory();
  const { width } = useWindowDimensions();
  const { setAuthorDetails } = useContext(GlobalContex);
  const [allcreators, setAllCreators] = useState("");
  const [allCreatorsLoading, setAllCreatorsLoading] = useState("");
  const [selectedCreators, setSelectedCreators] = useState("Articles");

  useEffect(() => {
    setAllCreatorsLoading(true);
    setAllCreators("");

    let url = "";
    if (selectedCreators == "Articles") {
      url =
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07?atleastOneArticle=true";
    } else {
      url =
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07?atleastOneVideo=true";
    }

    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data?.data, "creators mobile");
        if (response?.data?.data) {
          setAllCreators(response?.data?.data);
        }
        setAllCreatorsLoading(false);
      })
      .catch((error) => {
        console.log(error?.message, "creators mobile error");
        setAllCreatorsLoading(false);
      });
  }, [selectedCreators]);

  useEffect(() => {
    let prevScrollPos = 0;

    const handleScroll = () => {
      const currentScrollPos =
        document.querySelector(".mainAppContainer").scrollTop;
      const scrollUp = prevScrollPos > currentScrollPos;
      const navbar = document.querySelector(".mainAppNavbar");

      if (scrollUp) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-165.6px";
      }

      prevScrollPos = currentScrollPos;
    };

    const mainAppContainer = document.querySelector(".mainAppContainer");
    mainAppContainer.addEventListener("scroll", handleScroll);
    return () => mainAppContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`mainAppContainer ${classNames.creatorsMobile}`}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div
        style={{
          background: "var(--theme-main)",
          zIndex: 2,
          // filter: showStory ? "blur(70px)" : "none",
          // position: !mobileMenu ? "sticky" : "",
          position: "sticky",
          // top: !mobileMenu ? "0" : "",
          left: "0",
          right: "0",
        }}
        className="mainAppNavbar"
      >
        <MobileNav />
      </div>
      <div
        className={classNames.filterType}
        style={{
          display: window?.location?.pathname == "/creators" ? "" : "none",
        }}
      >
        <div
          onClick={(event) => {
            setSelectedCreators("Articles");
          }}
          style={{
            fontWeight: selectedCreators == "Articles" ? "600" : "",
            background: selectedCreators == "Articles" ? "white" : "",
            color: selectedCreators == "Articles" ? "#4b2a91" : "",
          }}
        >
          Articles
        </div>
        <div
          onClick={(event) => {
            setSelectedCreators("Videos");
          }}
          style={{
            fontWeight: selectedCreators == "Videos" ? "600" : "",
            background: selectedCreators == "Videos" ? "white" : "",
            color: selectedCreators == "Videos" ? "#4b2a91" : "",
          }}
        >
          Videos
        </div>
      </div>
      {/* <div className={classNames.heading}>Creators</div> */}
      <div className={classNames.eachCreator}>
        {allCreatorsLoading
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <div className={classNames.eachAuthorprofile}>
                  <Skeleton width={50} height={50} circle />
                  <div className={classNames.authorDetails}>
                    <div className={classNames.name}>
                      <Skeleton width={130} height={20} />
                    </div>
                    <div>
                      <div className={classNames.viewProfileBtn}>
                        <Skeleton width={80} height={20} />
                      </div>
                      <div className={classNames.socialMediaHandles}>
                        <Skeleton width={20} height={20} />
                        <Skeleton
                          width={20}
                          height={20}
                          style={{ marginLeft: "10px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : allcreators?.length > 0
          ? allcreators?.map((eachauthor) => {
              return (
                <div
                  className={classNames.eachAuthorprofile}
                  onClick={() => {
                    setAuthorDetails(eachauthor);
                    history.push(`/${eachauthor?.email}/article`);
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
