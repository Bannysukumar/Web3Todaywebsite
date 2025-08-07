import React, { useContext, useEffect, useState, useRef } from "react";

import classNames from "./articlesmain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GlobalContex } from "../../globalContext";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import useWindowDimensions from "../../services/WindowSize";

const ArticlesMain = () => {
  const history = useHistory();
  const location = useLocation();
  const { width, height } = useWindowDimensions();
  const [trendingArticles, setTrendingArticles] = useState("");
  const [allArticles, setAllArticles] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [CategoryBottom, setCategoryBottom] = useState(true)

  const CategoryRef = useRef(null);

  const handleLeftScroll = () => {

    const scrollTop = CategoryRef.current.scrollTop;

    const leftSection = CategoryRef.current;

    const isNearBottom =
      leftSection.scrollHeight - scrollTop - leftSection.clientHeight;

    console.log(isNearBottom, scrollTop)

    if (isNearBottom > 10) {
      setCategoryBottom(true)
    } else {
      setCategoryBottom(false)
    }

    // if (isNearBottom < 10) {
    //   setCategoryBottom(true)
    // }

  };

  const handleScrollButtonClickDown = () => {
    CategoryRef.current.scrollTo({
      top: CategoryRef.current.scrollTop + 400,
      behavior: 'smooth',
    });
  };

  const handleScrollButtonClickUp = () => {
    CategoryRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const { setCategoryId, setAuthorDetails, setSelectedFormat } =
    useContext(GlobalContex);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/article/navbar/638dd8a8b257b3715a8fbe08"
      )
      .then((response) => {
        setTrendingArticles(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "trending articles API  error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07?atleastOneArticle=true"
      )
      .then((response) => {
        // console.log(response?.data, "all authors");
        if (response?.data?.status) {
          setAuthors(response?.data?.data);
        } else {
          setAuthors("false");
        }
      })
      .catch((error) => {
        console.log(error?.message, "all authors API  error");
      });
  }, []);

  useEffect(() => {
    setArticlesLoading(true);
    axios
      .get(
        "https://publications.apimachine.com/article/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        setAllArticles(response?.data?.data);
        setArticlesLoading(false);
      })
      .catch((error) => {
        console.log(error?.message, "all articles API  error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?atleastOneArticle=true"
      )
      .then((response) => {
        // console.log(response?.data?.data, "all catergories");
        setAllCategories(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "all categories API  error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://comms.globalxchange.io/coin/promo/farm/video/campaign/get?status=active"
      )
      .then((response) => {
        // console.log(response?.data?.videoCampaigns, "all earning campaigns");
        setAllCampaigns(response?.data?.videoCampaigns);
      })
      .catch((error) => {
        console.log(error?.message, "all earning campaigns API  error");
      });
  }, []);

  return (
    <div className={classNames.articlesMain}>
      <div className={classNames.trendingArticles}>
        <div className={classNames.articlesContainer}>
          <div className={classNames.title}>Trending</div>
          <div className={classNames.articles}>
            {trendingArticles?.length > 0 ? (
              <div
                className={classNames.fullArticle}
                onClick={() =>
                  history.push(
                    `/feed/article/${trendingArticles[0]?.custom_url}`
                  )
                }
              >
                <div>
                  <img
                    src={
                      trendingArticles[0]?.icon ? trendingArticles[0]?.icon : ""
                    }
                    alt=""
                  />
                  <div className={classNames.contentDiv}>
                    <div className={classNames.title}>
                      {trendingArticles[0]?.title
                        ? trendingArticles[0]?.title
                        : ""}
                    </div>
                    <div className={classNames.description}>
                      {trendingArticles[0]?.desc
                        ? trendingArticles[0]?.desc.length > 115 ? trendingArticles[0]?.desc.slice(0, 115) + "..." : trendingArticles[0]?.desc
                        : ""}
                    </div>
                    <div className={classNames.details}>
                      <div className={classNames.author}>
                        <img
                          src={
                            trendingArticles[0]?.PublisherDetails[0]
                              ?.PublisherDetails[0]?.profile_pic
                              ? trendingArticles[0]?.PublisherDetails[0]
                                ?.PublisherDetails[0]?.profile_pic
                              : ""
                          }
                          alt=""
                        />
                        <span>
                          {trendingArticles[0]?.PublisherDetails[0]
                            ?.PublisherDetails[0]?.name
                            ? trendingArticles[0]?.PublisherDetails[0]
                              ?.PublisherDetails[0]?.name
                            : ""}
                        </span>
                      </div>
                      <div className={classNames.publishDate}>
                        {trendingArticles[0]?.createdAt
                          ? // ? moment(trendingArticles[0]?.createdAt)
                          //     .startOf("day")
                          //     .fromNow()
                          //     ?.split(" ")
                          //     .map(
                          //       (word) =>
                          //         word.charAt(0).toUpperCase() + word.slice(1)
                          //     )
                          //     .join(" ")
                          moment(trendingArticles[0]?.createdAt).format(
                            "MMM Do YYYY"
                          )
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={classNames.fullArticles}>
                <Skeleton width={700} height={400} />
                <div className={classNames.title}>
                  <Skeleton width={170} height={25} />
                </div>
                <div className={classNames.description}>
                  <Skeleton width={130} height={25} />
                </div>
                <div className={classNames.details}>
                  <Skeleton width={100} height={25} />
                </div>
              </div>
            )}
            {trendingArticles?.length > 0 ? (
              <div className={classNames.miniArticles}>
                <div className={classNames.miniDivider}>
                  <div
                    onClick={() =>
                      history.push(
                        `/feed/article/${trendingArticles[1]?.custom_url}`
                      )
                    }
                  >
                    <img
                      src={
                        trendingArticles[1]?.icon
                          ? trendingArticles[1]?.icon
                          : ""
                      }
                      alt=""
                    />
                    <div>
                      {trendingArticles[1]?.title
                        ? trendingArticles[1]?.title
                        : ""}
                    </div>
                  </div>
                </div>
                <div className={classNames.miniDivider}>
                  <div
                    onClick={() =>
                      history.push(
                        `/feed/article/${trendingArticles[2]?.custom_url}`
                      )
                    }
                  >
                    <img
                      src={
                        trendingArticles[2]?.icon
                          ? trendingArticles[2]?.icon
                          : ""
                      }
                      alt=""
                    />
                    <div>
                      {trendingArticles[2]?.title
                        ? trendingArticles[2]?.title
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classNames.categoriesContainer} >
          {CategoryBottom ? <div className={classNames.downArrow} onClick={handleScrollButtonClickDown}></div> : <div className={classNames.upArrow} onClick={handleScrollButtonClickUp}></div>}
          <div className={classNames.title}>Topics</div>
          <div className={classNames.allCategories} ref={CategoryRef} onScroll={handleLeftScroll}>
            {allCategories?.length > 0 &&
              allCategories
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
                ?.map((eachcategory) => {
                  return (
                    <Link
                      to={`/feed/${eachcategory?.title}/articles`}
                      onClick={() => {
                        setCategoryId(eachcategory?._id);
                        setSelectedFormat("Articles");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className={classNames.header}>
                        <span>
                          <img src={eachcategory?.thumbnail} alt="" />
                        </span>
                        {eachcategory?.title}
                      </div>
                      {/* <div className={classNames.count}>
                      {location?.pathname?.toLowerCase()?.includes("video")
                        ? eachcategory?.videosCount
                        : eachcategory?.articlesCount}
                    </div> */}
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
      <div className={classNames.allArticles}>
        <div className={classNames.articlesContainer}>
          <div className={classNames.title}>All Articles</div>
          <div className={classNames.articlesList}>
            {articlesLoading
              ? Array.from({ length: 6 }).map((_, index) => {
                return (
                  <EachArticleSkeletonLoading
                    key={"categoryloading" + index}
                  />
                );
              })
              : allArticles?.length > 0 &&
              allArticles?.slice(0, 15)?.map((eacharticle) => {
                return (
                  <div
                    className={classNames.eachArticle}
                    onClick={() =>
                      history.push(`/feed/article/${eacharticle?.custom_url}`)
                    }
                  >
                    <div className={classNames.imageDiv}>
                      <img
                        src={eacharticle?.icon ? eacharticle?.icon : ""}
                        alt=""
                      />
                    </div>
                    <div className={classNames.contentDiv}>
                      <div className={classNames.title}>
                        {eacharticle?.title ? eacharticle?.title : ""}
                      </div>
                      <div className={classNames.para}>
                        {eacharticle?.desc ? eacharticle?.desc : ""}
                      </div>
                      <div className={classNames.details}>
                        <div className={classNames.author}>
                          <img
                            src={
                              eacharticle?.PublisherDetails[0]
                                ?.PublisherDetails[0]?.profile_pic
                                ? eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.profile_pic
                                : ""
                            }
                            alt=""
                          />
                          <span>
                            {eacharticle?.PublisherDetails[0]
                              ?.PublisherDetails[0]?.name
                              ? eacharticle?.PublisherDetails[0]
                                ?.PublisherDetails[0]?.name
                              : ""}
                          </span>
                        </div>
                        <div className={classNames.publishDate}>
                          {eacharticle?.createdAt
                            ? // ? moment(eacharticle?.createdAt)
                            //     .startOf("day")
                            //     .fromNow()
                            //     ?.split(" ")
                            //     .map(
                            //       (word) =>
                            //         word.charAt(0).toUpperCase() +
                            //         word.slice(1)
                            //     )
                            //     .join(" ")
                            moment(eacharticle?.createdAt).format(
                              "MMM Do YYYY"
                            )
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div className={classNames.earnCampaigns}>
            <div className={classNames.title}>Commercials</div>
            <div className={classNames.earnCampaignsContainer}>
              {allCampaigns?.length > 0 &&
                allCampaigns?.map((eachcampaign) => {
                  return (
                    <div
                      className={classNames.eachEarnCampaigns}
                      onClick={() => {
                        if (eachcampaign?.video_nickname) {
                          window.open(
                            `https://web3today.io/earn/ads/${eachcampaign?.video_nickname}`,
                            "_blank"
                          );
                        }
                      }}
                    >
                      <img
                        src={
                          eachcampaign?.video_thumbnail
                            ? eachcampaign?.video_thumbnail
                            : ""
                        }
                        alt=""
                      />
                      <div className={classNames.title}>
                        {eachcampaign?.video_title
                          ? eachcampaign?.video_title
                          : ""}
                      </div>
                      <div className={classNames.para}>
                        {" "}
                        {eachcampaign?.video_description
                          ? eachcampaign?.video_description
                          : ""}
                      </div>
                      <div className={classNames.btn}>Start Earning </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={classNames.authorsProfile}>
            <div className={classNames.title}>Creators</div>
            <div className={classNames.authorsContainer}>
              {allAuthors?.length > 0 &&
                allAuthors?.map((eachauthor) => {
                  return (
                    <div
                      className={classNames.eachAuthorprofile}
                      style={{ pointerEvents: width < 700 ? "none" : "" }}
                      onClick={() => {
                        setAuthorDetails(eachauthor);
                        history.push(`/${eachauthor?.email}/article`);
                        localStorage.setItem("selectedauthor", eachauthor?._id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <img
                        src={
                          eachauthor?.profile_pic ? eachauthor?.profile_pic : ""
                        }
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
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesMain;

export const EachArticleSkeletonLoading = () => {
  return (
    <div style={{ display: "flex", marginTop: "2rem" }}>
      <div>
        <Skeleton width={300} height={220} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          width: "100%",
        }}
      >
        <Skeleton width={320} height={20} />
        <Skeleton width={260} height={20} />
        <Skeleton width={220} height={20} />
        <Skeleton width={150} height={20} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "-webkit-fill-available",
          }}
        >
          <Skeleton width={60} height={20} />
          <Skeleton width={80} height={20} />
        </div>
      </div>
    </div>
  );
};

export const SocialMediaHandles = () => {
  return (
    <>
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0481 14.8856V14.885H15.0519V9.38376C15.0519 6.69251 14.4725 4.61938 11.3262 4.61938C9.81373 4.61938 8.79873 5.44939 8.38436 6.23626H8.34061V4.87063H5.35748V14.885H8.46373V9.92626C8.46373 8.62064 8.71123 7.35813 10.3281 7.35813C11.9212 7.35813 11.945 8.84813 11.945 10.01V14.8856H15.0481Z"
          fill="#4B2A91"
        />
        <path
          d="M0.247498 4.87134H3.3575V14.8857H0.247498V4.87134Z"
          fill="#4B2A91"
        />
        <path
          d="M1.80125 0C0.806875 0 0 0.806875 0 1.80125C0 2.79562 0.806875 3.61937 1.80125 3.61937C2.79562 3.61937 3.6025 2.79562 3.6025 1.80125C3.60188 0.806875 2.795 0 1.80125 0V0Z"
          fill="#4B2A91"
        />
      </svg>
      <svg
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.03186 12.9999C11.0699 12.9999 14.3718 7.99887 14.3718 3.66237C14.3718 3.52031 14.3689 3.37887 14.3625 3.23816C15.0034 2.77491 15.5605 2.19681 16 1.53878C15.4119 1.80019 14.7788 1.97604 14.1149 2.05549C14.7926 1.6491 15.313 1.00645 15.5583 0.240293C14.9241 0.616171 14.2217 0.889293 13.4739 1.03684C12.8749 0.398943 12.022 0 11.0776 0C9.26489 0 7.7948 1.46971 7.7948 3.28136C7.7948 3.53899 7.82361 3.78941 7.87988 4.0297C5.15161 3.89241 2.7323 2.5866 1.1134 0.600794C0.831543 1.08577 0.668945 1.64922 0.668945 2.25038C0.668945 3.38888 1.24854 4.39411 2.12976 4.98209C1.59119 4.96549 1.08533 4.8177 0.643066 4.57167C0.642578 4.58546 0.642578 4.59889 0.642578 4.61353C0.642578 6.20296 1.77405 7.53 3.27625 7.8307C3.00037 7.90576 2.71008 7.94615 2.41064 7.94615C2.19946 7.94615 1.99365 7.92541 1.79358 7.88696C2.21155 9.19094 3.42346 10.1398 4.86023 10.1664C3.73669 11.0468 2.32129 11.5712 0.783081 11.5712C0.518433 11.5712 0.256958 11.556 0 11.5258C1.45276 12.4567 3.17798 13 5.03198 13"
          fill="#4B2A91"
        />
      </svg>
    </>
  );
};

export const EachArticleSkeletonLoadingMobile = () => {
  return (
    <div style={{ marginTop: "2rem", width: "90vw" }}>
      <div>
        <Skeleton width={"100%"} height={220} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.3rem",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Skeleton width={"90%"} height={20} />
        <Skeleton width={"80%"} height={20} />
        <Skeleton width={"75%"} height={20} />
        <Skeleton width={"65%"} height={20} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "-webkit-fill-available",
          }}
        >
          <Skeleton width={"35%"} height={20} />
          <Skeleton width={"35%"} height={20} />
        </div>
      </div>
    </div>
  );
};
