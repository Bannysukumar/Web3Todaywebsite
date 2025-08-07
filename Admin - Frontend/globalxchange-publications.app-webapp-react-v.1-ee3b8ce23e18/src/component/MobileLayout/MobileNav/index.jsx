import React, { useContext, useEffect, useState } from "react";
import styles from "./mobileNav.module.scss";

import MenuIco from "../../../assets/MobileAssets/menu.svg";
import MainIco from "../../../assets/mainico1.svg";
import searchIco from "../../../assets/NavImages/thesearch.svg";
import upIco from "../../../assets/NewHomePage/up.svg";
import downIco from "../../../assets/NewHomePage/down.svg";
import { GlobalContex } from "../../../globalContext";
import useWindowDimensions from "../../../services/WindowSize";
import { Link, useNavigate } from "react-router-dom";
import Ticker from "react-ticker";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { WithSeeMore } from "react-insta-stories";

const MobileNav = () => {
  const navigate = useNavigate();
  const {
    mobileMenu,
    setMobileMenu,
    selectedStory,
    setSelectedMobileMenu,
    setRegisterUser,
    allStoryTemplate,
    setSelectedStory,
    setAllStoryOriginal,
  } = useContext(GlobalContex);
  const [trendingSectionArticles, setTrendingSectionArticles] = useState("");
  const [allPrices, setAllPrices] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [bgImages, setBgImages] = useState([]);

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

        data.data.map((item) => {
          tempImages.push(item.image);
        });
        setBgImages(tempImages);
        // console.log(tempArr, "wjkebkjwegdkjewgdkew");
        setAllStories([...tempArr]);
        setShowStory(true);
      });
  };

  const appresponsive = {
    0: {
      items: 5,
    },
    512: {
      items: 7,
    },
  };

  const apps = allPrices?.map((item, id) => {
    return (
      <span
        style={{
          width: "190px",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-between",
          // alignItems: "center",
          borderRight: "1px solid #e7e7e7",
          // padding: "0px 20px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        <span style={{ fontWeight: 800 }}>{item.coinSymbol}</span>
        <img
          src={item?._24hrchange > 0 ? upIco : downIco}
          alt=""
          style={{ width: "8px", height: "8px", margin: "0px 8px" }}
        />
        <span>${item?.usd_price?.toFixed(4)}</span>
        <span
          style={{
            paddingLeft: "8px",
            color: item?._24hrchange > 0 ? "green" : "red",
          }}
        >
          {item?._24hrchange?.toFixed(2)}%
        </span>
      </span>
    );
  });

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08"
      )
      .then((response) => {
        // console.log(response?.data?.data, "trending articles");
        setTrendingSectionArticles(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "trending articles error");
      });

    axios
      .get(`https://comms.globalxchange.io/coin/vault/get/all/coins`)
      .then(({ data }) => {
        setAllPrices(data.coins);
      });
  }, []);

  const { width, height } = useWindowDimensions();
  return (
    <>
      {width < 700 ? (
        <>
          <div className={styles.section1Parent}>
            <div className={styles.sectionBorder}></div>
            <div className={styles.section1}>
              <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={false}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={appresponsive}
                items={apps}
                autoPlay
                keyboardNavigation={true}
              />
            </div>{" "}
          </div>
          <div
            className={styles.navContainer}
            style={{ filter: selectedStory ? "blur(70px)" : "none" }}
          >
            <div className={styles.navContainerLeft}>
              <div onClick={(e) => setMobileMenu(true)}>
                <img
                  src={MenuIco}
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              <Link
                to="/news/articles"
                onClick={() => {
                  setSelectedMobileMenu("News");
                  setMobileMenu(false);
                }}
              >
                <img
                  src={MainIco}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </Link>
            </div>
            <div className={styles.navContainerRight}>
              <div>
                <img
                  src={searchIco}
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              <div
                className={styles.navContainerRightBtn}
                onClick={(e) => {
                  navigate("/login");
                  // setRegisterUser("");
                }}
              >
                Start Tracking
              </div>
            </div>
          </div>
          <div className={styles.sectionNewsScrollParent}>
            <div className={styles.sectionBorder}></div>
            <div
              className={styles.sectionNewsScroll}
              // style={{ display: trendingSectionArticles ? "" : "none" }}
            >
              <div className={styles.title}>BREAKING</div>
              <Ticker height={34.4} speed={8} offset={0}>
                {({ index }) => (
                  <>
                    {trendingSectionArticles?.length > 0 &&
                      trendingSectionArticles?.map((eacharticle, index) => {
                        return (
                          <div key={eacharticle?.title + index}>
                            <div>
                              <svg
                                width="5"
                                height="5"
                                viewBox="0 0 5 5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="5"
                                  height="5"
                                  transform="matrix(1 0 0 -1 0 5)"
                                  fill="#212529"
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() => {
                                navigate(
                                  `/news/article/${eacharticle?.custom_url}`
                                );
                              }}
                            >
                              {eacharticle?.title ? eacharticle?.title : ""}
                            </div>
                          </div>
                        );
                      })}
                  </>
                )}
              </Ticker>
            </div>
          </div>
          {/* <div
            className={styles.trendingSection}
            style={{
              display:
                window.location.pathname == "/news/articles" ||
                window.location.pathname == "/" ||
                window.location.pathname == ""
                  ? ""
                  : "none",
            }}
          >
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
          </div> */}
          {/* <div
            className={styles.filterType}
            style={{
              display:
                window.location.pathname == "/news/articles" ||
                window.location.pathname == "/" ||
                window.location.pathname == "" ||
                window.location.pathname == "/news/videos"
                  ? ""
                  : "none",
            }}
          >
            <div
              onClick={(event) => {
                navigate("/news/articles");
              }}
              style={{
                fontWeight:
                  window.location.pathname == "/news/articles" ||
                  window.location.pathname == "/" ||
                  window.location.pathname == ""
                    ? "600"
                    : "",
                background:
                  window.location.pathname == "/news/articles" ||
                  window.location.pathname == "/" ||
                  window.location.pathname == ""
                    ? "white"
                    : "",
              }}
            >
              Articles
            </div>
            <div
              onClick={(event) => {
                navigate("/news/videos");
              }}
              style={{
                fontWeight:
                  window.location.pathname == "/news/videos" ? "600" : "",
                background:
                  window.location.pathname == "/news/videos" ? "white" : "",
              }}
            >
              Videos
            </div>
          </div> */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileNav;
