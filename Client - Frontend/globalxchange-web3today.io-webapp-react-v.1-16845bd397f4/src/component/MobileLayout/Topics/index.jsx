import React, { useContext, useEffect, useState } from "react";
import MobileNav from "../MobileNav";
import classNames from "./topics.module.scss";
import axios from "axios";
import { GlobalContex } from "../../../globalContext";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../../services/WindowSize";
import FloatingFooter from "../FloatingFooter";
import Skeleton from "react-loading-skeleton";

const TopicsMobile = () => {
  const history = useHistory();
  const { width } = useWindowDimensions();
  const { setCategoryId } = useContext(GlobalContex);
  const [allTopics, setAllTopics] = useState("");
  const [allTopicsLoading, setAllTopicsLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState("Articles");

  useEffect(() => {
    setAllTopicsLoading(true);
    setAllTopics("");

    let url = "";
    if (selectedTopics == "Articles") {
      url =
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?atleastOneArticle=true";
    } else {
      url =
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?atleastOneVideo=true";
    }

    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data?.data, "topics mobile");
        if (response?.data?.data) {
          setAllTopics(response?.data?.data);
        }
        setAllTopicsLoading(false);
      })
      .catch((error) => {
        console.log(error?.message, "topics mobile error");
        setAllTopicsLoading(false);
      });
  }, [selectedTopics]);

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
      className={`mainAppContainer ${classNames.topicsMobile}`}
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
          display: window?.location?.pathname == "/topics" ? "" : "none",
        }}
      >
        <div
          onClick={(event) => {
            setSelectedTopics("Articles");
          }}
          style={{
            fontWeight: selectedTopics == "Articles" ? "600" : "",
            background: selectedTopics == "Articles" ? "white" : "",
            color: selectedTopics == "Articles" ? "#4b2a91" : "",
          }}
        >
          Articles
        </div>
        <div
          onClick={(event) => {
            setSelectedTopics("Videos");
          }}
          style={{
            fontWeight: selectedTopics == "Videos" ? "600" : "",
            background: selectedTopics == "Videos" ? "white" : "",
            color: selectedTopics == "Videos" ? "#4b2a91" : "",
          }}
        >
          Videos
        </div>
      </div>
      {/* <div className={classNames.heading}>Topics</div> */}
      <div className={classNames.allTopics}>
        {allTopicsLoading
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  className={classNames.eachTopic}
                  key={"topicsloading" + index}
                >
                  <Skeleton width={25} height={25} circle />
                  <Skeleton
                    width={"100%"}
                    height={20}
                    style={{ marginLeft: "10px", minWidth: "200px" }}
                  />
                </div>
              );
            })
          : allTopics?.length > 0
          ? allTopics
              ?.sort((a, b) => {
                const nameA = a?.title?.toUpperCase(); // ignore upper and lowercase
                const nameB = b?.title?.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
              })
              ?.map((eachTopic) => {
                return (
                  <div
                    className={classNames.eachTopic}
                    onClick={() => {
                      history.push(`/feed/${eachTopic?.title}/articles`);
                      setCategoryId(eachTopic?._id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    // style={{ pointerEvents: "none" }}
                  >
                    <img src={eachTopic?.thumbnail} alt="" />
                    <div>{eachTopic?.title}</div>
                  </div>
                );
              })
          : ""}
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  );
};

export default TopicsMobile;
