import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { GlobalContex } from "../../globalContext";
import styles from "./trendingView.module.scss";
import upIco from "../../assets/NewHomePage/up1_white.svg";
import downIco from "../../assets/NewHomePage/down1_color.svg";
import downIcoWhite from "../../assets/NewHomePage/down1_white.svg";
import loadingimg from "../../assets/NewHomePage/loading.gif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import MainIco from "../../assets/mainico1.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StoryPage from "../StoryPage";
import Stories, { WithHeader, WithSeeMore } from "react-insta-stories";
import Campaigns from "../Campaigns";
import ArticlesMain from "../ArticlesMain";
import CategoryMain from "../CategoryMain";

const TrendingViewCategory = () => {
  const navigate = useNavigate();
  const topDivRef = useRef(null);
  const bottomDivRef = useRef(null);

  const {
    selectedSubNav,
    calculateTimeDifference,
    allCategories,
    setAllCategories,
    selectedSearchItem,
    setSelectedSearchItem,
    allArticles,
    setAllArticles,
    selectedStory,
    setSelectedStory,
    setAllStoryTemplate,
    allStoryTemplate,
    setAllStoryOriginal,
    setShowPopup,
  } = useContext(GlobalContex);
  const [arrowImg, setArrowImg] = useState(downIco);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lazyloadimg, setLazyloadimg] = useState(true);

  const [scrollTo, setScrollTo] = useState(false);

  // const [allArticles, setAllArticles] = useState([]);

  const [stuckToTop, setStuckToTop] = useState(false);
  // const [selectedStory, setSelectedStory] = useState(null);

  const [allStories, setAllStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [bgImages, setBgImages] = useState([]);

  //   const bottomDivRef = useRef();
  const scrollHandler = (_) => {
    // setShowPopup(false);
    const catDiv = document.getElementById("catDiv");

    if (
      catDiv?.getBoundingClientRect()?.bottom < 277 ||
      catDiv?.getBoundingClientRect()?.top < 1
    ) {
      catDiv?.classList?.replace(styles.container3, styles.newcontainer3);
    } else {
      catDiv?.classList?.replace(styles.newcontainer3, styles.container3);
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

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08`
  //     )
  //     .then(({ data }) => {
  //       setAllArticles(data.data);
  //     });
  // }, []);

  const appresponsive = {
    0: {
      items: 5,
    },
    512: {
      items: 9,
    },
  };

  const categoryArticles = [
    {
      title: "Interviews",
      category: "",
    },
    {
      title: "Case Studies",
      category: "",
    },
    {
      title: "Reports",
      category: "",
    },
    {
      title: "Documentaries",
      category: "",
    },
    {
      title: "Courses",
      category: "",
    },
  ];

  const trendingTopics = [
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
    {
      app_icon:
        "https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/9d7d584ebd8310a505bfd0085110fa7f",
      app_name: "App Name",
    },
  ];

  const getAllStories = (item) => {
    let tempArr = [];
    let tempImages = [];
    axios
      .get(
        `https://publications.apimachine.com/story?web_story_id=${item?._id}`
      )
      .then(({ data }) => {
        setAllStoryOriginal(data.data);
        setSelectedStory(item);

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
                {item.name}
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

        data.data.map((item) => {
          tempImages.push(item.image);
        });
        setBgImages(tempImages);
        setAllStories([...tempArr]);
        setShowStory(true);
      });
  };

  const apps = allStoryTemplate?.map((item, id) => {
    return (
      <div
        onClick={(e) => getAllStories(item)}
        className={styles.companyeachcard}
        // onClick={() => navigate("/casestudies")}
      >
        <div className={styles.companyeachbox}>
          <img
            className={styles.companyimg}
            src={
              !lazyloadimg ? loadingimg : item.icon !== "" ? item.icon : MainIco
            }
            alt=""
          />
        </div>
        <div className={styles.companyname}>{item.name}</div>
      </div>
    );
  });

  const handleScrollTo = (id) => {
    setScrollTo(true);
    setSelectedSearchItem(id);
    const myDiv = document.getElementById(id);
    const rect = myDiv.getBoundingClientRect();
    // console.log(rect.top, "kjwdlkjwebdk");
    // document.querySelector("body").scrollTo(0, rect.top);
    myDiv.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      setScrollTo(false);
    }, 1000);

    // var element = document.getElementById(id);
    // var headerOffset = 45;
    // var elementPosition = element.getBoundingClientRect().top;
    // var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // window.scrollTo({
    //   top: offsetPosition,
    //   behavior: "smooth",
    // });
  };

  return (
    <div>
      {allArticles?.length > 0 ? (
        <div>
          <div
            style={{
              filter: showStory ? "blur(70px)" : "none",
              padding: "0 100px",
            }}
          >
            <CategoryMain />
          </div>
          <div>
            {showStory ? (
              <StoryPage
                setShowStory={setShowStory}
                allStories={allStories}
                setSelectedStory={setSelectedStory}
                selectedStory={selectedStory}
                bgImages={bgImages}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div style={{ padding: "0 100px" }}>
          <div className={styles.container1}>
            {/* <div className={styles.topHalf}>
              <div className={styles.topHalfLeft} style={{ border: "none" }}>
                <Skeleton
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "15px" }}
                />
              </div>
              <div className={styles.topHalfRight}>
                <div className={styles.twoPosts}>
                  <div>
                    <Skeleton
                      width="100%"
                      height="70%"
                      style={{ borderRadius: "15px" }}
                    />
                    <div
                      style={{
                        paddingTop: "19px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      <Skeleton width="100%" style={{ borderRadius: "0px" }} />
                    </div>
                  </div>
                  <div>
                    <Skeleton
                      width="100%"
                      height="70%"
                      style={{ borderRadius: "15px" }}
                    />
                    <div
                      style={{
                        paddingTop: "19px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      <Skeleton width="100%" style={{ borderRadius: "0px" }} />
                    </div>
                  </div>
                </div>
                <br />
                <div className={styles.twoPosts}>
                  <div>
                    <Skeleton
                      width="100%"
                      height="70%"
                      style={{ borderRadius: "15px" }}
                    />
                    <div
                      style={{
                        paddingTop: "19px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      <Skeleton width="100%" style={{ borderRadius: "0px" }} />
                    </div>
                  </div>
                  <div>
                    <Skeleton
                      width="100%"
                      height="70%"
                      style={{ borderRadius: "15px" }}
                    />
                    <div
                      style={{
                        paddingTop: "19px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      <Skeleton width="100%" style={{ borderRadius: "0px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className={styles.bottomHalf}>
              {/* <div
                style={{
                  // position: "absolute",
                  marginTop: "-35px",
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: 700,
                  marginLeft: "130px",
                  background: "white",
                  width: "max-content",
                  padding: "0px 10px",
                }}
              >
                Trending Articles
              </div> */}
              <div className={styles.allappbox} style={{ padding: "0px" }}>
                <AliceCarousel
                  mouseTracking
                  infinite
                  autoPlayInterval={1000}
                  animationDuration={1500}
                  disableDotsControls
                  disableButtonsControls
                  responsive={appresponsive}
                  items={apps}
                  autoPlay
                  keyboardNavigation={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingViewCategory;

{
  /* {allArticles.map((item, index) => {
                  return (
                    <div>
                      <div style={{}}>
                        <div
                          style={{
                            backgroundImage: `url(${
                              allArticles[index + 1]
                                ? allArticles[index + 1].media
                                : allArticles[index].media
                            })`,
                            height: "150px",
                            width: window.innerWidth / 4,
                          }}
                        >
                          &nbsp;
                        </div>
                        <div>Loerm Epsium</div>
                      </div>
                      <br />
                      <div style={{}}>
                        <div
                          style={{
                            backgroundImage: `url(${
                              allArticles[index + 2]
                                ? allArticles[index + 2].media
                                : allArticles[index].media
                            })`,
                            height: "150px",
                            width: window.innerWidth / 4,
                          }}
                        >
                          &nbsp;
                        </div>
                        <div>Loerm Epsium</div>
                      </div>
                    </div>
                  );
                })} */
}
