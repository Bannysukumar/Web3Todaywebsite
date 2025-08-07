import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./article.module.scss";
import Nav from "../../component/Nav";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Footer from "../../component/Footer";
import useWindowDimensions from "../../services/WindowSize";
import MobileNav from "../../component/MobileLayout/MobileNav";

import closeIco from "../../assets/MobileAssets/close.svg";
import nextPrevArrow from "../../assets/MobileAssets/nextPrevArrow.svg";
import graphIcon from "../../assets/MobileAssets/graph.svg";
import shareIcon from "../../assets/MobileAssets/share.svg";
import { GlobalContex } from "../../globalContext";
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import BlogSideMenu from "../../component/BlogSideMenu";
import BlogMenuBar from "../../component/BlogMenuBar";
import { BsDiscord, BsTelegram, BsInstagram } from "react-icons/bs";
import { RiLinkedinFill, RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";

import copyIcon from "../../assets/shareIcons/copy.svg";
import discordIcon from "../../assets/shareIcons/discord.svg";
import telegramIcon from "../../assets/shareIcons/telegram.svg";
import instagramIcon from "../../assets/shareIcons/instagram.svg";
import linkedinIcon from "../../assets/shareIcons/linkedin.svg";
import whatsappIcon from "../../assets/shareIcons/whatsapp.svg";
import Questions from "../../component/Questions";
import 'react-toastify/dist/ReactToastify.css';

const ArticlePage = () => {
  const { width, height } = useWindowDimensions();
  const location = useLocation();
  const history = useHistory();
  const {
    calculateTimeDifference,
    startCounter,
    stopCounter,
    loginData,
    userProfile,
    login,
    setCategoryId,
    setAuthorDetails,
    fullWidthNav,
  } = useContext(GlobalContex);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState([]);
  const [publisherData, setPublisherData] = useState("");
  const [publisherArticles, setPublisherArticles] = useState("");
  const [publisherLoading, setPublisherLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [durationData, setDurationData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Same Author");
  const [articleId, setArticleId] = useState("");
  const [filters, setFilters] = useState("");
  const [questions, setQuestion] = useState("");
  const [actionBtn, setActionBtn] = useState(true);
  const observer = useRef();
  const loader = useRef();
  const [startTime, setStartTime] = useState("");
  const [durationInSeconds, setDurationInSeconds] = useState("");


  function getArticleQuestions() {
    axios
      .get(
        `https://publications.apimachine.com/article/${articleData?.custom_url}`
      )
      .then((response) => {
        let article = response?.data?.data?.article;
        // console.log(articleData, "article data");

        if (article?.length > 0 && article[0]?.article_questions?.length > 0) {
          article = article[0]?.article_questions[0]?.questions;
          // console.log(article, "article quest response");
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
    if (articleData) {
      getArticleQuestions();
    }
  }, [articleData]);

  // useEffect(() => {
  //   if (articleData?._id) {
  //     console.log("page end");
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         axios
  //           .put("https://publications.apimachine.com/articleread", {
  //             user_id: userProfile?._id,
  //             article_id: articleData?._id,
  //             publication_id: "638dd769b257b3715a8fbe07",
  //           })
  //           .then((response) => {
  //             console.log(response, "action response");
  //           })
  //           .catch((error) => {
  //             console.log(error, "action error");
  //           });
  //       }
  //     });

  //     observer.current.observe(loader.current);
  //   }
  // }, [articleData]);

  const getSavedItems = () => {
    axios
      .get(
        `https://publications.apimachine.com/saveditems?user_id=${userProfile?._id}`
        // `https://publications.apimachine.com/saveditems?user_id=63c05580a1c9c75295672a3c`
      )
      .then(({ data }) => {
        if (data.status) {
          const found = data?.data?.article?.find(
            (o) => o?._id === articleData?._id
          );

          if (found) {
            setSaved(true);
          } else {
            setSaved(false);
          }
        }
        setSaving(false);
      });
  };

  useEffect(() => {
    getSavedItems();
  }, [userProfile]);

  useEffect(() => {
    const initailDiv = document.getElementById("initialDiv");
    initailDiv.scrollIntoView();
  }, []);

  const getArticleDuration = (ArticleId) => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (loginData) {
      axios
        .get(
          `https://publications.apimachine.com/action/user?user_id=${userProfile?._id}`
        )
        .then(({ data }) => {
          const foundData = data.data.detail.find(
            (o) => o.article_id === ArticleId
          );
          if (foundData) {
            setDurationData(foundData);
          }
        });
    }
  };




  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  const handleLeftScroll = () => {

    const scrollTop = leftSectionRef.current.scrollTop;

    // console.log(scrollTop)
    const leftSection = leftSectionRef.current;

    const isNearBottom =
      Math.floor(leftSection.scrollHeight - scrollTop) - leftSection.clientHeight;

    // console.log(isNearBottom , "nearbottom")

    if (isNearBottom < 1) {
      console.log(userProfile)
      let endTime = new Date()
      console.log(startTime, "start")
      console.log(endTime, "end")
      console.log((endTime - startTime) / 1000, "duration")
      let duration = (endTime - startTime) / 1000
      if (!userProfile) {
        toast(<span style={{ color: "black", fontWeight: 700, display: "flex", justifyContent: "center" }}>Oops!!! You have missed points for reading this article. Login to earn points</span>)
      }
      // toast("Oops!!! You have missed points for reading this article. Login to earn points")

      if (userProfile) {
        if (duration < 60) return toast.error(<span style={{ color: "black", fontWeight: 700, display: "flex", justifyContent: "center" }}>Oops....Scrolling Too Fast!!! Try Again to get rewarded</span>)
        axios
          .put("https://publications.apimachine.com/articleread", {
            user_id: userProfile?._id,
            article_id: articleData?._id,
            publication_id: "638dd769b257b3715a8fbe07",
          })
          .then((response) => {
            console.log(response.data, "bottom trigger");
            if (response.data.status) {
              response.data.newBalance !== response.data.previousBalance ? toast.success(<span style={{ color: "black", fontWeight: 700, display: "flex", justifyContent: "center" }}>Congratulations , you have earned {response.data.newBalance - response.data.previousBalance} points for reading this article</span>) : toast.info(<span style={{ color: "black", fontWeight: 700, display: "flex", justifyContent: "center" }}>You have already earned points for reading this article!!</span>)
            }
          })
          .catch((error) => {
            console.log(error, "action error");
          });
      }
    }

  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  // useEffect(() => {
  //   startCounter();
  // }, []);

  const alertUser = (e) => {
    e.preventDefault();
    stopCounter(articleId);
    e.returnValue = "";
    setTimeout(function () {
      startCounter(articleId);
      // The user stayed, so do whatever you want
    }, 100);

    // if (e.defaultPrevented) {
    //   console.log("User cancelled tab close");
    // } else {
    //   console.log("User leaving tab");
    // }

    // if (e.returnValue === null) {
    //   // user hit the cancel button.
    //   console.log("User cancelled tab close");
    // } else {
    //   console.log(e.returnValue);
    //   // user hit leave
    //   console.log("User leaving tab");
    // }
    // setShowPopup(true);
    // e.returnValue = (
    //   <div className={styles.popupDialogue}>
    //     <div className={styles.popupTitle}>Hello</div>
    //   </div>
    // );
  };

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

  useEffect(() => {
    const parts = location.pathname.split("/");
    const lastPart = parts[parts.length - 1];
    setStartTime(new Date());
    if (leftSectionRef.current) {
      leftSectionRef.current.scrollTop = 0;
    }
    // console.log(lastPart, "location");

    axios
      .get(`https://publications.apimachine.com/article/${lastPart}`)
      .then(({ data }) => {
        console.log(data, "article data");
        if (data.status) {
          setArticleData(data.data.article[0]);
          startCounter(data.data.article[0]?._id);
          setArticleId(data.data.article[0]?._id);
          setLoading(false);
        } else {
          history.push("/404");
          setLoading(false);
        }
      });
    getArticleDuration(lastPart);
  }, [location]);

  useEffect(() => {
    setPublisherLoading(true);
    setPublisherArticles("");
    if (
      articleData?.PublisherDetails?.length > 0 &&
      selectedFilter == "Same Author"
    ) {
      if (articleData?.PublisherDetails[0]?.PublisherDetails?.length > 0) {
        setPublisherData(articleData?.PublisherDetails[0]?.PublisherDetails[0]);
        console.log(articleData, "publishers details");
        axios
          .post("https://publications.apimachine.com/articleread", {
            user_id: userProfile?._id,
            article_id: articleData?._id,
            publication_id: "638dd769b257b3715a8fbe07",
          })
          .then((response) => {
            console.log(response, "action response");
          })
          .catch((error) => {
            console.log(error, "action error");
          });
      }
      let user_id = articleData?.PublisherDetails[0]?._id;
      axios
        .get(
          `https://publications.apimachine.com/article?user_id=${user_id ? user_id : ""
          }&publication_id=638dd769b257b3715a8fbe07`
        )
        .then((response) => {
          setPublisherArticles(response?.data?.data);
          setPublisherLoading(false);
        })
        .catch((error) => {
          console.log(error?.message, "publishers API");
          setPublisherLoading(false);
        });
    }

    if (
      articleData?.categories?.length > 0 &&
      selectedFilter == "Same Category"
    ) {
      if (articleData?.categories[0]?.categoryType?.length > 0) {
        setFilters(articleData?.categories[0]?.categoryType[0]);
        let id = articleData?.categories[0]?.categoryType[0]?._id;
        axios
          .get(
            `https://publications.apimachine.com/article/category?category=${id ? id : ""
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
    }
  }, [articleData, selectedFilter]);

  const saveArticle = () => {
    if (loginData?.status) {
      setSaving(true);
      axios
        .post(`https://publications.apimachine.com/saveditems`, {
          user_id: userProfile?._id,
          article_id: articleData?._id,
        })
        .then(({ data }) => {
          if (data.status) {
            toast.info(data.message);
            getSavedItems();
          }
        });
    } else {
      history.push("/login");
    }
  };

  // console.log(articleData?.keywords.join(","), "metatags");
  // let keywords;

  // if (articleData?.keywords) {
  //   keywords = articleData?.keywords.join(",");
  // }else{
  //   keywords = "article, news"
  // }
  // useEffect(() => {
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       // Call your API here
  //       console.log("Reached bottom of page!");
  //     }
  //   });

  //   observer.current.observe(loader.current);
  // }, []);
  const parts = location.pathname.split("/");
  const lastPart = parts[parts.length - 1];

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
    if (mainAppContainer) {
      mainAppContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainAppContainer) {
        mainAppContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    let allUL = document.querySelectorAll("ul");
    let allLI = document.querySelectorAll("li");
    let allP = document.querySelectorAll("p");
    let allSpan = document.querySelectorAll("span");

    // allUL?.forEach((eachUL) => {
    //   eachUL.style.width = "100%";
    //   // eachUL.style.border = "1px solid red";
    //   eachUL.style.margin = "auto 0";
    //   eachUL.style.lineHeight = "1.6";
    // });
    // allLI?.forEach((eachUL) => {
    //   eachUL.style.width = "100%";
    //   // eachUL.style.border = "1px solid blue";
    //   eachUL.style.margin = "auto 0";
    //   eachUL.style.lineHeight = "1.6";
    // });
    allP?.forEach((eachUL) => {
      eachUL.style.width = "100%";
      // eachUL.style.border = "1px solid green";
      eachUL.style.margin = "auto 0";
      eachUL.style.lineHeight = "1.6";
    });
    // var myLink = document.querySelector("a");

    // if (myLink) {
    //     myLink.setAttribute("target", "_blank");
    // }
    // allSpan?.forEach((eachUL) => {
    //   eachUL.style.width = "100%";
    //   eachUL.style.whiteSpace = "pre-wrap";
    //   // eachUL.style.border = "1px solid yellow";
    //   eachUL.style.margin = "auto 0";
    //   eachUL.style.lineHeight = "1.6";
    // });

    // Cleanup function
    // return () => {
    //   // Reset the width of all ul elements before unmounting
    //   allUL?.forEach((eachUL) => {
    //     eachUL.style.width = "";
    //   });
    // };
  });

  return (
    <>
      <Helmet htmlAttributes>
        <html lang="en" />
        <title>{articleData?.title}</title>
        <meta name="description" content={articleData?.desc} />
        <meta name="keywords" content={articleData?.joinKeywords} />
        <meta property="og:title" content={articleData?.title} />
        <meta property="og:description" content={articleData?.desc} />
        <meta property="og:image" content={articleData?.media} />
        <meta property="og:url" content={articleData?.custom_url} />
        <link rel="canonical" href={`https://web3today.io/feed/article/${lastPart}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@Web3today_io" />
        <meta property="twitter:site_name" content="Web3Today" />
        <meta property="twitter:title" content={articleData?.title} />
        <meta property="twitter:description" content={articleData?.desc} />
        <meta property="twitter:image" content={articleData?.media} />
        <meta property="twitter:creator" content="@Web3today_io" />
        <meta property="og:type" content="article" />

      </Helmet>
      {width > 900 || width > height ? (
        <>
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: "2",
            }}
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
                <div className={styles.stickyParent}>
                  <div className={styles.stickyContainer}>
                    <BlogMenuBar
                      saved={saved}
                      saveArticle={saveArticle}
                      saving={saving}
                      copyy={articleData ? articleData?.custom_url : ""}
                      articleTitle={articleData ? articleData?.title : ""}
                      coverPhotoUrl={articleData ? articleData?.media : ""}
                    />
                  </div>
                </div>
                <div className={styles.articleSection} ref={leftSectionRef} onScroll={handleLeftScroll}
                >
                  <div className={styles.articleTitle}>
                    {articleData?.title}
                  </div>
                  <div className={styles.articleSubTitle}>
                    {articleData?.desc}
                  </div>
                  <div className={styles.articleMedia}>
                    <img
                      src={!articleData?.media || articleData?.media === "" ? articleData?.icon : articleData?.media}
                      alt={articleData?.altTag}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  <div style={{ fontSize: "30px !important" }}>
                    {articleData?.article ? (
                      <div
                        className={styles.articleContent}
                        style={{ fontSize: "30px !important" }}
                        dangerouslySetInnerHTML={{
                          __html: articleData?.article.replace(/['"\\]/g, ''),
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {questions && (
                    <Questions allQuestions={questions} type="article" />
                  )}
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
                                    "/feed/article"
                                  )
                                ) {
                                  setCategoryId(dataa?._id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  history.push(
                                    `/feed/${dataa?.title}/articles`
                                  );
                                } else {
                                  setCategoryId(dataa?._id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  history.push(
                                    `/feed/${dataa?.title}/videos`
                                  );
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
                      <div
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
                      </div>
                      <span onClick={() => setActionBtn(false)}>X</span>
                    </div>
                  )}
                </div>
                {loginData ? (
                  <div className={styles.otherSection} ref={rightSectionRef}
                  >
                    <BlogSideMenu
                      publisherData={publisherData}
                      publisherArticles={publisherArticles}
                      selectedFilter={selectedFilter}
                      setSelectedFilter={setSelectedFilter}
                      publisherLoading={publisherLoading}
                      filters={filters}
                    />
                  </div>
                ) : (
                  <div className={styles.otherSection}>
                    <BlogSideMenu
                      publisherData={publisherData}
                      publisherArticles={publisherArticles}
                      selectedFilter={selectedFilter}
                      setSelectedFilter={setSelectedFilter}
                      publisherLoading={publisherLoading}
                      filters={filters}
                    />
                  </div>
                )}
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
          {/* <div
            ref={loader}
            style={{
              backgroundColor: "rgba(237, 237, 237, 0.37)",
              color: "transparent",
            }}
          >
            Loading...
          </div> */}
          <Footer />
          {showPopup ? (
            <div className={styles.popupDialogue}>
              <div className={styles.popupTitle}>Hello</div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div
          className="mainAppContainer"
          style={{
            height: fullWidthNav ? "" : "100vh",
            overflow: width > 768 ? "" : "auto",
          }}
        >
          <div
            className="mainAppNavbar"
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
          >
            <MobileNav />
          </div>
          <div
            id="initialDiv"
            style={{
              // overflowY: width > 900 || width > height ? "" : "scroll",
              // height: width > 900 || width > height ? "" : "calc(100% - 161px)",
              overflowY: "auto",
              height: "auto",
            }}
          >
            {articleData?.article ? (
              <>
                <div
                  style={{
                    backgroundImage: `url(${articleData?.icon})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "40vh",
                  }}
                >
                  <img
                    onClick={(e) => {
                      stopCounter(articleId);
                      history.push("/");
                    }}
                    src={closeIco}
                    alt=""
                    style={{ width: "40px", height: "40px", margin: "12px" }}
                  />
                </div>
                <div className={styles.mobileArticle}>
                  <div
                    className={styles.articleMobileTitle}
                    style={{ paddingBottom: "20px" }}
                  >
                    {articleData?.title}
                  </div>
                  {articleData ? (
                    <div className={styles.metadata}>
                      <div className={styles.author}>
                        <img
                          src={
                            articleData?.PublisherDetails
                              ? articleData?.PublisherDetails[0]
                                ?.PublisherDetails[0]?.profile_pic
                              : ""
                          }
                          alt=""
                        />
                        <div>
                          {articleData?.PublisherDetails
                            ? articleData?.PublisherDetails[0]
                              ?.PublisherDetails[0]?.name
                            : ""}
                        </div>
                      </div>
                      <div className={styles.timestamp}>
                        {calculateTimeDifference(articleData?.createdAt)} Hours
                        Ago
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
                  {/* <div ref={containerRef} /> */}
                  {questions && (
                    <Questions allQuestions={questions} type="article" />
                  )}
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
                                    "/feed/article"
                                  )
                                ) {
                                  setCategoryId(dataa?._id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  history.push(
                                    `/feed/${dataa?.title}/articles`
                                  );
                                } else {
                                  setCategoryId(dataa?._id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  history.push(
                                    `/feed/${dataa?.title}/videos`
                                  );
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
                </div>
                <FloatingBarBlogs />
              </>
            ) : (
              <div
                style={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                  marginTop: "2rem",
                  padding: "0 0.5rem",
                }}
              >
                <Skeleton width={"100%"} height={200} />
                <div style={{ width: "80%" }}>
                  <Skeleton width={"80%"} height={20} />
                </div>
                <div style={{ width: "65%" }}>
                  <Skeleton width={"80%"} height={20} />
                </div>
                <div style={{ width: "55%" }}>
                  <Skeleton width={"80%"} height={20} />
                </div>
              </div>
            )}
            {/* <div
              ref={loader}
              style={{
                backgroundColor: "white",
                color: "transparent",
              }}
            >
              End of page
            </div> */}
          </div>
        </div>

      )}
      {/* <div ref={loader}>Loading...</div> */}
      <ToastContainer
        position="top-center"
        autoClose={7000}
        style={{ top: 170, width: '680px' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ArticlePage;

const FloatingBarBlogs = () => {
  const history = useHistory();
  const { allArticles, loginData, userProfile, startCounter } =
    useContext(GlobalContex);
  const [currentArticle, setCurrentArticle] = useState();
  const location = useLocation();

  const [clickedFloating, setClickedFloating] = useState("");
  const [articleData, setArticleData] = useState([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    const parts = location.pathname.split("/");
    const lastPart = parts[parts.length - 1];
    // console.log(lastPart, "location");

    axios
      .get(`https://publications.apimachine.com/article/${lastPart}`)
      .then(({ data }) => {
        console.log(data, "article data floating bar");
        if (data.status) {
          setArticleData(data.data.article[0]);
          startCounter(data.data.article[0]?._id);
          setArticleId(data.data.article[0]?._id);
          setLoading(false);
        } else {
          history.push("/404");
          setLoading(false);
        }
      });
  }, [location]);

  const saveArticle = () => {
    if (loginData?.status) {
      setSaving(true);
      axios
        .post(`https://publications.apimachine.com/saveditems`, {
          user_id: userProfile?._id,
          article_id: articleData?._id,
        })
        .then(({ data }) => {
          if (data.status) {
            toast.info(data.message);
            getSavedItems();
            setClickedFloating("");
          }
        });
    } else {
      history.push("/login");
    }
  };

  const getSavedItems = () => {
    axios
      .get(
        `https://publications.apimachine.com/saveditems?user_id=${userProfile?._id}`
        // `https://publications.apimachine.com/saveditems?user_id=63c05580a1c9c75295672a3c`
      )
      .then(({ data }) => {
        if (data.status) {
          const found = data?.data?.article?.find(
            (o) => o?._id === articleData?._id
          );

          if (found) {
            setSaved(true);
          } else {
            setSaved(false);
          }
        }
        setSaving(false);
      });
  };

  useEffect(() => {
    getSavedItems();
  }, [userProfile]);

  useEffect(() => {
    let currentArt = location?.pathname?.split("/")[3];
    allArticles?.forEach((eachArticle, i) => {
      if (eachArticle?.custom_url == currentArt) {
        setCurrentArticle(i);
      }
    });
    // console.log(filtered);
  }, [allArticles]);

  useEffect(() => {
    if (clickedFloating) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [clickedFloating]);

  return (
    <div className={styles.floatingBar}>
      <div
        style={{
          pointerEvents: currentArticle == 0 ? "none" : "",
          opacity: currentArticle == 0 ? "0.5" : "",
        }}
        onClick={(e) => {
          if (
            allArticles[currentArticle - 1] &&
            allArticles[currentArticle - 1]?.custom_url
          ) {
            setCurrentArticle((prev) => prev - 1);
            history.push(
              `/feed/article/${allArticles[currentArticle - 1]?.custom_url}`
            );
          }
        }}
      >
        <img src={nextPrevArrow} alt="nextPrevArrow" />
      </div>
      <div>
        <div onClick={() => setClickedFloating("earn")}>
          <img src={graphIcon} alt="graphIcon" />
          Earn
        </div>
        <div onClick={() => setClickedFloating("share")}>
          <img src={shareIcon} alt="shareIcon" />
          Share
        </div>
      </div>
      <div
        onClick={(e) => {
          if (
            allArticles[currentArticle + 1] &&
            allArticles[currentArticle + 1]?.custom_url
          ) {
            setCurrentArticle((prev) => prev + 1);
            history.push(
              `/feed/article/${allArticles[currentArticle + 1]?.custom_url}`
            );
          }
        }}
        style={{
          pointerEvents:
            currentArticle == allArticles?.length - 1 ? "none" : "",
          opacity: currentArticle == allArticles?.length - 1 ? "0.5" : "",
        }}
      >
        <img src={nextPrevArrow} alt="nextPrevArrow" />
      </div>
      <div
        className={styles.overlayContainer}
        style={{ display: clickedFloating ? "" : "none" }}
      >
        {clickedFloating == "earn" ? (
          <div className={styles.earnContainer}>
            <div className={styles.heading}>Earn From This Article</div>
            <div className={styles.earnDiv}>
              <div>2 W3T</div>
              <div>Per Minute For Reading This Article</div>
            </div>
            <div className={styles.earnDiv}>
              <div>2 W3T</div>
              <div>For Answering Questions</div>
            </div>
          </div>
        ) : (
          <div className={styles.earnContainer}>
            <div className={styles.heading}>Share This Article On</div>
            <div className={styles.shareOptions}>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://web3today.io/feed/article/" +
                    (articleData ? articleData?.link_name : "")
                  );
                  setClickedFloating("");
                }}
              >
                <img src={copyIcon} alt="copyIcon" />
              </div>
              <div onClick={() => setClickedFloating("")}>
                <img src={discordIcon} alt="discordIcon" />
              </div>
              <div onClick={() => setClickedFloating("")}>
                <img src={telegramIcon} alt="telegramIcon" />
              </div>
              <div onClick={() => setClickedFloating("")}>
                <img src={instagramIcon} alt="instagramIcon" />
              </div>
              <div onClick={() => setClickedFloating("")}>
                <img src={linkedinIcon} alt="linkedinIcon" />
              </div>
              <div onClick={() => setClickedFloating("")}>
                <img src={whatsappIcon} alt="whatsappIcon" />
              </div>
            </div>
            <div className={styles.saveBtn}>
              {saved ? (
                <div className={styles.primaryButton}>Already Saved</div>
              ) : (
                <div
                  className={styles.primaryButton}
                  onClick={(e) => saveArticle()}
                >
                  {!loginData?.status
                    ? "Login To Save"
                    : saving
                      ? "Saving..."
                      : saved
                        ? "Already Saved"
                        : "Save Article"}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={styles.overlay}
          onClick={() => setClickedFloating("")}
        ></div>
      </div>
    </div>
  );
};
