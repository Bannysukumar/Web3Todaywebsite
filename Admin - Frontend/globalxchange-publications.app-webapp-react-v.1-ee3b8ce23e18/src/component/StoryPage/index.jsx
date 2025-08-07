import React, { useEffect, useState, Component, useContext } from "react";
import styles from "./storyPage.module.scss";

import leftArrow from "../../assets/MobileAssets/leftArrow.svg";
import rightArrow from "../../assets/MobileAssets/rightArrow.svg";
import Stories, { WithHeader, WithSeeMore } from "react-insta-stories";
import { GlobalContex } from "../../globalContext";
import { useNavigate } from "react-router-dom";

const StoryPage = ({
  setShowStory,
  allStories,
  selectedStory,
  setSelectedStory,
  bgImages,
}) => {
  const navigate = useNavigate();
  const { allStoryOriginal } = useContext(GlobalContex);
  const [width, setWidth] = useState(0);
  const [bgImg, setBgImg] = useState(bgImages[0]);
  const [currentStory, setCurrentStory] = useState(null);

  const changeBgOnClick = (item) => {
    setCurrentStory(allStoryOriginal[item]);
    // console.log(item, "wkjenfkjwenfr");
    if (item > bgImages.length) {
      setSelectedStory(null);
      setShowStory(false);
    } else {
      setBgImg(bgImages[item]);
    }
  };

  return (
    <div style={{}}>
      <div
        className={styles.storyWrapper}
        onClick={(e) => {
          setSelectedStory(null);
          setShowStory(false);
        }}
        style={{
          backgroundImage: `url(${bgImg})`,
          // filter: "blur(80px)",
        }}
      >
        {setTimeout(() => {
          return <div></div>;
        }, 8000)}
      </div>

      <div
        className={styles.storySection}
        style={{
          left: window.innerWidth > 700 ? window.innerWidth / 2 - 200 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Stories
          width={window.innerWidth > 700 ? 400 : "100%"}
          height={window.innerWidth > 700 ? 700 : "100%"}
          loop
          keyboardNavigation
          defaultInterval={8000}
          stories={allStories}
          onStoryEnd={(s, st) => {
            // console.log("story ended", s, st);
            changeBgOnClick(s + 1);
          }}
          onAllStoriesEnd={(s, st) => {
            // setShowStory(false);
            // setSelectedStory(null);
          }}
          onStoryStart={(s, st) => {
            // console.log("story started", s, st);
            changeBgOnClick(s);
          }}
          storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
        ></Stories>
        <div
          className={styles.viewButton}
          onClick={(e) => {
            setSelectedStory(null);
            setShowStory(false);
            navigate(`/news/article/${currentStory?.link_to_article}`);
            // console.log(currentStory, "kwjedikwjebfkw3e");
          }}
        >
          Full Article
        </div>

        {/* <div className={styles.progressDiv} style={{ width: "95%" }}>
          <div style={{ width: `${width}%` }} className={styles.progress} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "15%",
            padding: "0px 25px",
            background: "rgba(0, 0, 0, 0.55)",
            borderRadius: "0px 0px 15px 15px",
            fontSize: "19px",
            fontWeight: 800,
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          {selectedStory?.desc}
        </div>
        <img src={leftArrow} alt="" style={{ marginLeft: "-70px" }} />
        <img src={rightArrow} alt="" style={{ marginRight: "-70px" }} /> */}
      </div>
    </div>
  );
};

export default StoryPage;
