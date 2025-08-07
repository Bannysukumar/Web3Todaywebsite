import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./article.module.scss";
import Nav from "../../component/Nav";
import { useLocation, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
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

const ArticlePage = () => {
  const { width, height } = useWindowDimensions();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    calculateTimeDifference,
    startCounter,
    stopCounter,
    loginData,
    userProfile,
    login,
    setCategoryId,
    setAuthorDetails,
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

  useEffect(() => {
    // console.log(articleData, "articleData");
    if (articleData?._id) {
      console.log("page end");
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          axios
            .put("https://publications.apimachine.com/articleread", {
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
      });

      observer.current.observe(loader.current);
    }
  }, [articleData]);

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
    // console.log(lastPart, "location");

    axios
      .get(`https://publications.apimachine.com/article/${lastPart}`)
      .then(({ data }) => {
        // console.log(data, "article data");
        if (data.status) {
          setArticleData(data.data.article[0]);
          startCounter(data.data.article[0]?._id);
          setArticleId(data.data.article[0]?._id);
          setLoading(false);
        } else {
          navigate("/404");
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
          `https://publications.apimachine.com/article?user_id=${
            user_id ? user_id : ""
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
            `https://publications.apimachine.com/article/category?category=${
              id ? id : ""
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
      navigate("/login");
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

  return (
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

        {/* <meta name="author" content={articleData?.PublisherDetails[0]?.PublisherDetails[0]?.name} /> */}
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
                      copyy={articleData ? articleData?.link_name : ""}
                    />
                  </div>
                </div>
                <div className={styles.articleSection}>
                  <div className={styles.articleTitle}>
                    {articleData?.title}
                  </div>
                  <div className={styles.articleSubTitle}>
                    {articleData?.desc}
                  </div>
                  <div className={styles.articleMedia}>
                    <img
                      src={articleData?.media}
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
                          __html: JSON.parse(articleData?.article),
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
                                      "/news/article"
                                    )
                                  ) {
                                    setCategoryId(dataa?._id);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                    navigate(`/news/articles/${dataa?.title}`);
                                  } else {
                                    setCategoryId(dataa?._id);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
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
                                Over 8% Bitcoin supply was bought between $15.5K
                                and $17K
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div> */}
                </div>
                {loginData ? (
                  // <div className={styles.otherSection}>
                  //   <div>
                  //     {saved ? (
                  //       <div className={styles.primaryButton}>
                  //         Already Saved
                  //       </div>
                  //     ) : (
                  //       <div
                  //         className={styles.primaryButton}
                  //         onClick={(e) => saveArticle()}
                  //       >
                  //         {saving
                  //           ? "Saving..."
                  //           : saved
                  //           ? "Already Saved"
                  //           : "Save Article"}
                  //       </div>
                  //     )}

                  //     <div className={styles.secondaryButton}>
                  //       Share Article
                  //     </div>
                  //   </div>
                  //   {durationData && (
                  //     <div>
                  //       <div className={styles.cardStyle}>
                  //         <div className={styles.cardLable}>Read Count</div>
                  //         <div className={styles.cardData}>
                  //           {durationData?.open_count} times
                  //         </div>
                  //       </div>
                  //       <br />
                  //       <div className={styles.cardStyle}>
                  //         <div className={styles.cardLable}>Read Duration</div>
                  //         <div className={styles.cardData}>
                  //           {(durationData?.total_duration / 60000).toFixed(2)}m
                  //         </div>
                  //       </div>
                  //     </div>
                  //   )}
                  // </div>
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
          {showPopup ? (
            <div className={styles.popupDialogue}>
              <div className={styles.popupTitle}>Hello</div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <MobileNav />
          <div
            id="initialDiv"
            style={{
              overflowY: width > 900 || width > height ? "" : "scroll",
              height: width > 900 || width > height ? "" : "calc(100% - 161px)",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${articleData?.media})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "40vh",
              }}
            >
              <img
                onClick={(e) => {
                  stopCounter(articleId);
                  navigate("/");
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
                        ? articleData?.PublisherDetails[0]?.PublisherDetails[0]
                            ?.name
                        : ""}
                    </div>
                  </div>
                  <div className={styles.timestamp}>
                    {calculateTimeDifference(articleData?.createdAt)} Hours Ago
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
                <div
                  ref={loader}
                  style={{
                    backgroundColor: "white",
                    color: "transparent",
                  }}
                >
                  End of page
                </div>
              </div>
            </div>

            <FloatingBarBlogs />
            {/* <div className={styles.articleSaveMenu}>
              {saved ? (
                <div className={styles.primaryButton}>Already Saved</div>
              ) : (
                <div
                  className={styles.primaryButton}
                  onClick={(e) => saveArticle()}
                >
                  {saving
                    ? "Saving..."
                    : saved
                    ? "Already Saved"
                    : "Save Article"}
                </div>
              )}
              <div className={styles.socialMediaIcons}>
                <div
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "https://web3today.io/news/article/" +
                        (articleData ? articleData?.link_name : "")
                    )
                  }
                >
                  <RiFileCopyLine />
                </div>
                <div>
                  <BsDiscord />
                </div>
                <div>
                  <BsTelegram />
                </div>
                <div>
                  <BsInstagram />
                </div>
                <div>
                  <RiLinkedinFill />
                </div>
                <div>
                  <RiWhatsappFill />
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
      {/* <div ref={loader}>Loading...</div> */}
    </>
  );
};

export default ArticlePage;

const FloatingBarBlogs = () => {
  const navigate = useNavigate();
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
        // console.log(data, "article data");
        if (data.status) {
          setArticleData(data.data.article[0]);
          startCounter(data.data.article[0]?._id);
          setArticleId(data.data.article[0]?._id);
          setLoading(false);
        } else {
          navigate("/404");
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
      navigate("/login");
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
            navigate(
              `/news/article/${allArticles[currentArticle - 1]?.custom_url}`
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
            navigate(
              `/news/article/${allArticles[currentArticle + 1]?.custom_url}`
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
                    "https://web3today.io/news/article/" +
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
