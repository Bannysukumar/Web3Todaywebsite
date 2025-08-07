import React, { useState, useEffect, useContext } from "react";
import styles from "./mobileTrendingPage.module.scss";
import bitcoinImg from "../../../assets/MobileAssets/bitcoin.png";
import MobileArticleCard from "../MobileArticleCard";
import { GlobalContex } from "../../../globalContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import StoryPage from "../../StoryPage";
import Stories, { WithHeader, WithSeeMore } from "react-insta-stories";
import FloatingFooter from "../FloatingFooter";
import useWindowDimensions from "../../../services/WindowSize";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MobileTrendingPage = () => {
  const {
    allArticlesOfNav,
    allCategories,
    setAllCategories,
    selectedSearchItem,
    setSelectedSearchItem,
    allArticles,
    setAllArticles,
    allStoryTemplate,
    setAllStoryTemplate,
    // allArticles,
    setSelectedStory,
    selectedStory,
    setAllStoryOriginal,
  } = useContext(GlobalContex);
  const history = useHistory();
  const { width } = useWindowDimensions();
  const [scrollTo, setScrollTo] = useState(false);
  const [allStories, setAllStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [bgImages, setBgImages] = useState([]);

  //   const [allArticles, setAllArticles] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08`
  //       )
  //       .then(({ data }) => {
  //         setAllArticles(data.data);
  //       });
  //   }, []);

  const handleScrollTo = (id) => {
    setScrollTo(true);
    setSelectedSearchItem(id);
    const myDiv = document.getElementById(id);
    const rect = myDiv.getBoundingClientRect();
    console.log(rect.top, "kjwdlkjwebdk");
    // document.querySelector("body").scrollTo(0, rect.top);
    myDiv.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setScrollTo(false);
    }, 1000);
  };

  const scrollHandler = (_) => {
    const catDivMobile = document.getElementById("catDivMobile");

    if (
      catDivMobile?.getBoundingClientRect()?.bottom < 277 ||
      catDivMobile?.getBoundingClientRect()?.top < 1
    ) {
      catDivMobile?.classList?.replace(styles.container3, styles.newcontainer3);
    } else {
      catDivMobile?.classList?.replace(styles.newcontainer3, styles.container3);
    }
    // const myDiv = document.getElementById("Blockchain");
    // const nextDiv = document.getElementById("WAPPs");
    // if the div reaches top of the screen set the selected search item to the title of the div

    if (allCategories.length > 0) {
      const lastTitle = allCategories[allCategories.length - 1].title;
      allCategories.map((item, index) => {
        let myDiv = document.getElementById(item.title);
        let nextDiv = document?.getElementById(allCategories[index + 1]?.title);
        let prevDiv = document?.getElementById(allCategories[index - 1]?.title);

        if (index < allCategories.length - 1) {
          if (
            myDiv?.getBoundingClientRect()?.top < 260 &&
            prevDiv?.getBoundingClientRect()?.top < 0
          ) {
            // console.log(index, "wekfhwef");
            setSelectedSearchItem(item.title);
          } else if (
            myDiv?.getBoundingClientRect()?.top < 260 &&
            nextDiv?.getBoundingClientRect()?.top > 260
          ) {
            // console.log(index, "wekfhwef");
            setSelectedSearchItem(item.title);
          }
        } else if (
          index === allCategories.length - 1 &&
          allCategories[allCategories.length - 1].title === lastTitle
        ) {
          let myLastDiv = document?.getElementById(allCategories[index]?.title);
          // console.log(myLastDiv, "lwkenflkwnef");
          if (
            myLastDiv?.getBoundingClientRect()?.top < 260 &&
            nextDiv === null
          ) {
            // console.log(index, "jhvkgjchg");
            setSelectedSearchItem(allCategories[index]?.title);
          }
          // setSelectedSearchItem("WAPPs");
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, scrollTo ? false : true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, [allCategories, scrollTo]);

  const getAllStories = (item) => {
    let tempArr = [];
    let tempImages = [];
    axios
      .get(
        `https://publications.apimachine.com/story?web_story_id=${item?._id}`
      )
      .then(({ data }) => {
        setSelectedStory(item);
        setAllStoryOriginal(data.data);
        if (data?.data?.length > 0) {
        data.data.map((item) => {
          tempArr.push({
            content: ({ action, story }) => {
              return (
                <WithSeeMore story={story} action={action}>
                  <div
                    style={{
                      // background: "snow",
                      padding: 20,
                      height: "100%",
                      width: "100%",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    &nbsp;
                  </div>
                </WithSeeMore>
              );
            },
            seeMoreCollapsed: ({ toggleMore, action }) => (
              <div
                style={{
                  padding: "25px 25px",
                  background: "rgba(0, 0, 0, 0.55)",
                  // borderRadius: "15px 15px 15px 15px",
                  fontSize: "19px",
                  fontWeight: 800,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.name}{" "}
                {window.innerWidth < 768 ? (
                  <img
                    onClick={(e) => {
                      setShowStory(false);
                      setSelectedStory(null);
                    }}
                    src={
                      require("../../../assets/MobileAssets/close1.svg").default
                    }
                    alt=""
                    style={{
                      width: "34px",
                      height: "34px",
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                  />
                ) : null}
              </div>
            ),
            seeMore: ({ close }) => (
              <div
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  padding: 40,
                  background: "white",
                }}
              >
                <h2>Just checking the see more feature.</h2>
                <p style={{ textDecoration: "underline" }} onClick={close}>
                  Go on, close this popup.
                </p>
              </div>
            ),
            duration: 5000,
          });
        });
      }

        data.data.map((item) => {
          tempImages.push(item.image);
        });
        if (data?.data?.length > 0) {
          setBgImages(tempImages);
          setAllStories([...tempArr]);
          setShowStory(true);
        } else {
          setShowStory(false)
          setSelectedStory(false)
          toast.info("No stories found", {
            style: {
              backgroundColor: 'white', // Set your custom background color
              color: '#69ABE0', // Set the text color
            }
          })
        }
      });
  };
  return showStory ? (
    <StoryPage
      setShowStory={setShowStory}
      allStories={allStories}
      setSelectedStory={setSelectedStory}
      selectedStory={selectedStory}
      bgImages={bgImages}
    />
  ) : (
    <>
      <div className={styles.trendingSection}>
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {allStoryTemplate?.map((item) => {
            return (
              <div
                onClick={(e) => getAllStories(item)}
                className={styles.trendingItems}
              >
                <img
                  style={{
                    backgroundImage: `url(${item?.icon})`,
                  }}
                  alt=""
                  className={styles.trendingItemsImg}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={styles.filterType}
        style={{
          display:
            window.location.pathname == "/feed/articles" ||
            window.location.pathname == "/" ||
            window.location.pathname == "" ||
            window.location.pathname == "/feed/videos"
              ? ""
              : "none",
        }}
      >
        <div
          onClick={(event) => {
            history.push("/feed/articles");
          }}
          style={{
            fontWeight:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "600"
                : "",
            background:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "white"
                : "",
            color:
              window.location.pathname == "/feed/articles" ||
              window.location.pathname == "/" ||
              window.location.pathname == ""
                ? "#4b2a91"
                : "",
          }}
        >
          Articles
        </div>
        <div
          onClick={(event) => {
            history.push("/feed/videos");
          }}
          style={{
            fontWeight: window.location.pathname == "/feed/videos" ? "600" : "",
            background:
              window.location.pathname == "/feed/videos" ? "white" : "",
            color: window.location.pathname == "/feed/videos" ? "#4b2a91" : "",
          }}
        >
          Videos
        </div>
      </div>
      <div className={styles.heroSection} style={{ display: "none" }}>
        {/* <div className={styles.heroSectionTitle}>Trending Articles</div> */}
        {allArticlesOfNav?.map((item, index) => {
          if (index < 5) {
            return <MobileArticleCard item={item} />;
          }
        })}
      </div>
      <div
        id="catDivMobile"
        className={styles.container3}
        style={{ display: "none" }}
      >
        <div className={styles.categoryHeader}>Popular Searches</div>
        <div className={styles.pillWrapper}>
          {allCategories?.length > 0
            ? allCategories.map((item) => {
                return (
                  <div
                    onClick={(e) => handleScrollTo(item?.title)}
                    className={
                      item.title === selectedSearchItem
                        ? styles.selectedSearchPill
                        : styles.searchPill
                    }
                  >
                    {item?.title}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div style={{ padding: "0px 12px", paddingBottom: "120px" }}>
        {
          // allCategories.map((category) => {
          //   return (
          //     <div
          //       style={{ scrollMargin: "100px" }}
          //       className={styles.container2}
          //       // ref={bottomDivRef}
          //       id={category.title}
          //     >
          <div>
            {allArticles?.map((item) => {
              return <MobileArticleCard item={item} />;
            })}
          </div>
          //   </div>
          // );
          // })
        }
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
      <ToastContainer/>
    </>
  );
};

export default MobileTrendingPage;
