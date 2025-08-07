import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./article.module.scss";
import Nav from "../../component/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Footer from "../../component/Footer";
import useWindowDimensions from "../../services/WindowSize";
import MobileNav from "../../component/MobileLayout/MobileNav";
import ReactPlayer from "react-player";
import { toast, ToastContainer } from "react-toastify";

import closeIco from "../../assets/MobileAssets/closeIco.svg";
import { GlobalContex } from "../../globalContext";

import demoThumbnail from "../../assets/demoThumbnail.png";
import { Helmet } from "react-helmet";
import BlogSideMenu from "../../component/BlogSideMenu";

import nextPrevArrow from "../../assets/MobileAssets/nextPrevArrow.svg";
import graphIcon from "../../assets/MobileAssets/graph.svg";
import shareIcon from "../../assets/MobileAssets/share.svg";
import Questions from "../../component/Questions";

const VideoPage = () => {
  const { width, height } = useWindowDimensions();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const playerRef = useRef(null);
  const [videoDetails, setVideoDetails] = useState({
    elapsed: 0,
    duration: 0,
    played: 0,
    remaining: 0,
  });
  const {
    calculateTimeDifference,
    loginData,
    startVideoCounter,
    stopVideoCounter,
    setTrendingVideos,
    setCategoryId,
    userProfile,
    setAuthorDetails,
  } = useContext(GlobalContex);

  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  const [publisherData, setPublisherData] = useState("");
  const [publisherArticles, setPublisherArticles] = useState("");
  const [publisherLoading, setPublisherLoading] = useState(false);
  const [filters, setFilters] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Same Author");
  const [actionBtn, setActionBtn] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(false);

  const [questions, setQuestion] = useState("");
  const observer = useRef();
  const loader = useRef();

  function getArticleQuestions() {
    console.log(articleData?.custom_url, "articleData?.custom_url");
    axios
      .get(
        `https://publications.apimachine.com/video/${articleData?.custom_url}`
      )
      .then((response) => {
        let article = response?.data?.data?.video;
        console.log(articleData, "video articleData response");
        // console.log(userProfile?._id, "userId")
        // console.log(articleData?._id, "videoId")
        axios
          .post("https://publications.apimachine.com/videoread", {
            user_id: userProfile?._id,
            video_id: articleData?._id,
            publication_id: "638dd769b257b3715a8fbe07",
          })
          .then((response) => {
            console.log(response, "action response");
          })
          .catch((error) => {
            console.log(error, "action error");
          });

        if (article?.length > 0 && article[0]?.video_questions?.length > 0) {
          article = article[0]?.video_questions[0]?.questions;
          if (article?.length > 0) {
            setQuestion(article);
          }
        }
      })
      .catch((error) => {
        console.log(error?.message, "error");
      });
  }

  useEffect(() => {
    // console.log(articleData, "articleData");
    if (articleData) {
      getArticleQuestions();
    }
  }, [articleData]);

  useEffect(() => {
    if (articleData?._id) {
      console.log("page end");
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          axios
            .put("https://publications.apimachine.com/videoread", {
              user_id: userProfile?._id,
              video_id: articleData?._id,
              publication_id: "638dd769b257b3715a8fbe07",
            })
            .then((response) => {
              console.log(response, "end page");
            })
            .catch((error) => {
              console.log(error, "action error");
            });
          // console.log("reach end of page");
          // console.log(articleData?._id, "articleData");
          // console.log(userProfile?._id, "userProfile");
        }
      });

      observer.current.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    const initailDiv = document.getElementById("initialDiv");
    initailDiv.scrollIntoView();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAllCategories(data.data);
        // setSelectedSearchItem(data.data[0].title);
      });
  }, []);

  const getArticleData = async () => {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    // console.log(
    //   lastPart,
    //   `https://publications.apimachine.com/video/${lastPart}`,
    //   "lkehflwjeflwef"
    // );
    const response = await axios.get(
      `https://publications.apimachine.com/video/${lastPart}`
    );
    // console.log(response, "lkehflwjeflwef");
    if (response.data.status) {
      setArticleData(response.data.data.video[0]);
      setLoading(false);
    } else {
      navigate("/404");
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(pathname, "lkehflwjeflwef");
    if (pathname) {
      getArticleData();
    }
  }, [pathname]);

  useEffect(() => {
    startVideoCounter();

    return () => {
      // console.log("Component is unmounted");
      // console.log("videoData", articleData)
      // const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      // let body = {
      //   video_id: articleData?._id,
      //   user_id: userProfile?.user_id,
      //   publication_id: "638dd769b257b3715a8fbe07",
      // };
      // console.log("body-stop", body)
      // axios
      //   .post(`https://publications.apimachine.com/videoaction/stop`, body)
      //   .then(({ data }) => {
      //     console.log(data, "videoaction-stop");
      //   })
      stopVideoCounter();
    };
  }, [pathname]);

  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    // toast("Are you sure you want to leave?")
    // console.log("beforeunload");
    alert("Are you sure you want to leave?");
  };

  useEffect(() => {
    setPublisherLoading(true);
    setPublisherArticles("");
    if (
      articleData?.user_id &&
      selectedFilter == "Same Author" &&
      articleData?.PublisherDetails?.length > 0
    ) {
      let videoId = articleData?.user_id;

      if (articleData?.PublisherDetails[0]?.PublisherDetails?.length > 0) {
        setPublisherData(articleData?.PublisherDetails[0]?.PublisherDetails[0]);
        console.log(articleData, "video publishers details");
        // axios.post("https://publications.apimachine.com/videoread", {
        //   user_id: userProfile?._id,
        //   video_id: articleData?._id,
        //   publication_id: "638dd769b257b3715a8fbe07"
        // }).then((response) => {
        //   console.log(response, "action response");
        // }
        // ).catch((error) => {
        //   console.log(error, "action error");
        // })
      }

      axios
        .get(
          `https://publications.apimachine.com/video/user/${
            videoId ? videoId : ""
          }`
        )
        .then((response) => {
          setPublisherArticles(response?.data?.data?.video);
          setPublisherLoading(false);
        })
        .catch((error) => {
          console.log(error?.message, "publishers API videos");
          setPublisherLoading(false);
        });
    }

    if (
      articleData?.categoryType &&
      selectedFilter == "Same Category" &&
      articleData?.categories?.length > 0
    ) {
      let videoId = articleData?.categoryType;
      if (videoId?.length > 0) {
        videoId = videoId[0];
      }
      if (articleData?.categories[0]?.categoryType?.length > 0) {
        setFilters(articleData?.categories[0]?.categoryType[0]);
        if (!videoId) {
          videoId = articleData?.categories[0]?.categoryType[0]?._id;
        }
      }

      axios
        .get(
          `https://publications.apimachine.com/video/category?category=${
            videoId ? videoId : ""
          }`
        )
        .then((response) => {
          setPublisherArticles(response?.data?.data);
          setPublisherLoading(false);
        })
        .catch((error) => {
          console.log(error?.message, "categories API");
          setPublisherLoading(false);
        });
    }
  }, [articleData, selectedFilter]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://publications.apimachine.com/video/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        // console.log(data?.data, "all videos 1");
        setTrendingVideos(data.data);
        setLoading(false);
      });
  }, []);

  const handleProgress = (progress) => {
    const { playedSeconds, loadedSeconds } = progress;
    const duration = playerRef.current.getDuration();
    const elapsed = playedSeconds;
    const played = (playedSeconds / duration) * 100;
    const remaining = duration - elapsed;

    setVideoDetails({
      elapsed,
      duration,
      played,
      remaining,
    });

    console.log("progress", progress);
    if (remaining < 1) {
      axios
        .put("https://publications.apimachine.com/videoread", {
          user_id: userProfile?._id,
          video_id: articleData?._id,
          publication_id: "638dd769b257b3715a8fbe07",
        })
        .then((response) => {
          console.log(response, "action response");
        })
        .catch((error) => {
          console.log(error, "action error");
        });
    }
  };

  return width > 900 || width > height ? (
    <>
      <Helmet htmlAttributes>
        <html lang="en" />
        <title>{articleData?.title}</title>
        <meta name="description" content={articleData?.desc} />
        <meta name="keywords" content={articleData?.joinKeywords} />
        <link
          rel="canonical"
          href={`https://web3today.io/news/article/${lastPart}`}
        />
      </Helmet>
      <ToastContainer />
      <div
        style={{ position: "sticky", top: 0, background: "white", zIndex: "2" }}
      >
        <Nav />
      </div>
      <div
        id="initialDiv"
        style={{
          scrollMargin: "250px",
        }}
      >
        {!loading ? (
          <div className={styles.articleWrapper}>
            <div className={styles.articleSection}>
              <div className={styles.articleTitle}>{articleData?.title}</div>
              <div className={styles.articleSubTitle}>{articleData?.desc}</div>
              <div className={styles.articleMedia}>
                <ReactPlayer
                  width="100%"
                  height="500px"
                  url={articleData?.video}
                  controls={true}
                  ref={playerRef}
                  onProgress={handleProgress}
                />
              </div>
              {articleData?.article ? (
                <div
                  className={styles.articleContent}
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(articleData?.article),
                  }}
                />
              ) : (
                ""
              )}
              {questions && <Questions allQuestions={questions} type="video" />}
              <div
                ref={loader}
                style={{
                  backgroundColor: "white",
                  color: "transparent",
                }}
              >
                End of page
              </div>
              <div className={styles.pillWrapper}>
                <div>Related Categories</div>
                {/* <div>
                  <p>Elapsed: {videoDetails.elapsed}</p>
                  <p>Duration: {videoDetails.duration}</p>
                  <p>Played: {videoDetails.played}</p>
                  <p>Remaining: {videoDetails.remaining}</p>
                </div> */}
                <div>
                  {articleData?.categories?.length > 0
                    ? articleData?.categories?.map((item, i) => {
                        return (
                          <div
                            className={styles.searchPill}
                            key={"searchpill" + i}
                            onClick={() => {
                              let dataa = item?.categoryType[0];
                              console.log(dataa, "checking data");
                              setAuthorDetails(dataa);
                              if (
                                window?.location?.pathname?.includes(
                                  "/news/article"
                                )
                              ) {
                                setCategoryId(dataa?._id);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                navigate(`/news/articles/${dataa?.title}`);
                              } else {
                                setCategoryId(dataa?._id);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                navigate(`/news/videos/${dataa?.title}`);
                              }
                            }}
                          >
                            {item?.categoryType?.length > 0
                              ? item?.categoryType[0]?.title
                              : ""}
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>

              {actionBtn && (
                <div className={styles.actionBtn}>
                  <span
                    onClick={() => {
                      if (articleData?.action_link) {
                        if (
                          articleData?.action_link?.includes("www.") ||
                          articleData?.action_link?.includes("http")
                        ) {
                          window.open(articleData?.action_link, "_blank");
                        } else {
                          window.open(
                            "http://" + articleData?.action_link,
                            "_blank"
                          );
                        }
                      }
                    }}
                  >
                    {articleData?.action ? articleData?.action : ""}
                  </span>
                  <span onClick={() => setActionBtn(false)}>X</span>
                </div>
              )}
              {/* <div className={styles.relatedWrapper}>
                <div className={styles.relatedTitle}>Related Articles</div>
                <div className={styles.relatedArticles}>
                  {Array(4)
                    .fill("")
                    .map((item) => {
                      return (
                        <div className={styles.individualArticle}>
                          <div>
                            <img
                              src="https://drivetest.globalxchange.io/gxsharepublic/?full_link=bets.brain.stream/bdb5a288488edaf949b5dd55c56bd11b"
                              alt=""
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              padding: "10px 0px",
                            }}
                          >
                            Over 8% Bitcoin supply was bought between $15.5K and
                            $17K
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div> */}
            </div>
            <div className={styles.otherSection}>
              <BlogSideMenu
                type="video"
                publisherData={publisherData}
                publisherArticles={publisherArticles}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                publisherLoading={publisherLoading}
                filters={filters}
              />
            </div>
          </div>
        ) : (
          <div className={styles.articleWrapper}>
            <div className={styles.articleSection}>
              <div className={styles.articleTitle}>
                <Skeleton
                  width="100%"
                  height="20px"
                  style={{ borderRadius: "0px" }}
                />
                <Skeleton
                  width="80%"
                  height="20px"
                  style={{ borderRadius: "0px" }}
                />
              </div>
              <div className={styles.articleSubTitle}>
                <Skeleton
                  width="100%"
                  height="10px"
                  style={{ borderRadius: "0px" }}
                />
                <Skeleton
                  width="100%"
                  height="10px"
                  style={{ borderRadius: "0px" }}
                />
                <Skeleton
                  width="60%"
                  height="10px"
                  style={{ borderRadius: "0px" }}
                />
              </div>
            </div>
            <div>&nbsp;</div>
          </div>
        )}
      </div>
      <div
        ref={loader}
        style={{
          backgroundColor: "rgba(237, 237, 237, 0.37)",
          color: "transparent",
        }}
      >
        Loading...
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Helmet htmlAttributes>
        <html lang="en" />
        <title>{articleData?.title}</title>
        <meta name="description" content={articleData?.desc} />
        <meta name="keywords" content={articleData?.joinKeywords} />
        <link
          rel="canonical"
          href={`https://web3today.io/news/article/${lastPart}`}
        />
      </Helmet>
      <MobileNav />
      <div
        id="initialDiv"
        style={{
          overflowY: width > 900 || width > height ? "" : "scroll",
          height: width > 900 || width > height ? "" : "calc(100% - 161px)",
        }}
      >
        {/* <div
          style={{
            backgroundImage: `url(${articleData?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "40vh",
          }}
        >
          <img
            onClick={(e) => navigate("/")}
            src={closeIco}
            alt=""
            style={{ width: "40px", height: "40px", margin: "12px" }}
          />
        </div> */}
        <div className={styles.mobileArticle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <div className={styles.articleMobileTitle}>
              {articleData?.title}
            </div>
            <img
              onClick={(e) => navigate("/")}
              src={closeIco}
              alt=""
              style={{ width: "25px", height: "25px" }}
            />
          </div>
          <ReactPlayer
            width="100%"
            height="200px"
            url={articleData?.video}
            controls={true}
            ref={playerRef}
            onProgress={handleProgress}
          />
          {articleData !== undefined ? (
            <div className={styles.metadata}>
              <div className={styles.author}>
                <img
                  src={
                    articleData?.PublisherDetails[0]?.PublisherDetails[0]
                      ?.profile_pic
                  }
                  alt=""
                />
                <div className={styles.authorData}>
                  <div className={styles.name}>
                    {
                      articleData?.PublisherDetails[0]?.PublisherDetails[0]
                        ?.name
                    }
                  </div>
                  <div className={styles.timestamp}>
                    {new Date(articleData?.createdAt)
                      .toUTCString()
                      .substring(0, 16)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={styles.articleContent}>{articleData?.desc}</div>
          {/* <div className={styles.categoryWrapper}>
            {articleData?.categories.map((item) => {
              return (
                <div className={styles.category}>
                  {item?.categoryType[0]?.title}
                </div>
              );
            })}
          </div> */}

          {questions && <Questions allQuestions={questions} type="video" />}
          <div
            ref={loader}
            style={{
              backgroundColor: "white",
              color: "transparent",
            }}
          >
            End of page
          </div>
          <div className={styles.pillWrapper}>
            <div>Related Categories</div>
            <div>
              {articleData?.categories?.length > 0
                ? articleData?.categories?.map((item, i) => {
                    return (
                      <div
                        className={styles.searchPill}
                        key={"searchpill" + i}
                        onClick={() => {
                          let dataa = item?.categoryType[0];
                          console.log(dataa, "checking data");
                          setAuthorDetails(dataa);
                          if (
                            window?.location?.pathname?.includes(
                              "/news/article"
                            )
                          ) {
                            setCategoryId(dataa?._id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate(`/news/articles/${dataa?.title}`);
                          } else {
                            setCategoryId(dataa?._id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate(`/news/videos/${dataa?.title}`);
                          }
                        }}
                      >
                        {item?.categoryType?.length > 0
                          ? item?.categoryType[0]?.title
                          : ""}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          {/* {articleData?.article ? (
            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{
                __html: JSON.parse(articleData?.desc),
              }}
            />
          ) : (
            ""
          )} */}
        </div>
        <FloatingBarVideos />
      </div>
    </>
  );
};

export default VideoPage;

const FloatingBarVideos = () => {
  const navigate = useNavigate();
  const { trendingVideos } = useContext(GlobalContex);
  const [currentVideo, setCurrentVideo] = useState();
  const location = useLocation();

  useEffect(() => {
    let currentArt = location?.pathname?.split("/")[3];
    trendingVideos?.forEach((eachVideo, i) => {
      // console.log(eachVideo?.custom_url == currentArt);
      if (eachVideo?.custom_url == currentArt) {
        setCurrentVideo(i);
      }
    });
  }, [trendingVideos]);

  return (
    <div className={styles.floatingBar}>
      <div
        style={{
          pointerEvents: currentVideo == 0 ? "none" : "",
          opacity: currentVideo == 0 ? "0.5" : "",
        }}
        onClick={(e) => {
          if (
            trendingVideos[currentVideo - 1] &&
            trendingVideos[currentVideo - 1]?.custom_url
          ) {
            setCurrentVideo((prev) => prev - 1);
            navigate(`${trendingVideos[currentVideo - 1]?.custom_url}`);
          }
        }}
      >
        <img src={nextPrevArrow} alt="nextPrevArrow" />
      </div>
      <div>
        <div>
          <img src={graphIcon} alt="graphIcon" />
          Earn
        </div>
        <div>
          <img src={shareIcon} alt="shareIcon" />
          Share
        </div>
      </div>
      <div
        onClick={(e) => {
          if (
            trendingVideos[currentVideo + 1] &&
            trendingVideos[currentVideo + 1]?.custom_url
          ) {
            setCurrentVideo((prev) => prev + 1);
            navigate(`${trendingVideos[currentVideo + 1]?.custom_url}`);
          }
        }}
        style={{
          pointerEvents:
            currentVideo == trendingVideos?.length - 1 ? "none" : "",
          opacity: currentVideo == trendingVideos?.length - 1 ? "0.5" : "",
        }}
      >
        <img src={nextPrevArrow} alt="nextPrevArrow" />
      </div>
    </div>
  );
};
