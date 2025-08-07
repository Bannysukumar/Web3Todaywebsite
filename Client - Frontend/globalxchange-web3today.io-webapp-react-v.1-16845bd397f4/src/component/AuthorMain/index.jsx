import React, { useContext, useEffect, useState } from "react";

import classNames from "./articlesmain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalContex } from "../../globalContext";
import { toast, ToastContainer } from "react-toastify";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import {
  EachArticleSkeletonLoading,
  SocialMediaHandles,
} from "../ArticlesMain";

const AuthorMain = () => {
  const { authoremail, category } = useParams();
  const {
    categoryId,
    setCategoryId,
    authorDetails,
    setAuthorDetails,
    selectedFormat,
    setSelectedFormat,
    setRegisterUser,
  } = useContext(GlobalContex);
  const history = useHistory();
  const location = useLocation();
  const [authorContent, setAuthorContent] = useState("");
  const [authorContentLoading, setAuthorContentLoading] = useState(false);
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");

  // console.log(location, "location author main page");

  const [categoryChange, setCategoryChange] = useState(false);

  //main values
  const [refreshLocal, setRefreshLocal] = useState(false);
  const [isUserAlreadyFollowed, setIsUserAlreadyFollowed] = useState(false);
  const [isUserAlreadyFollowedLoading, setIsUserAlreadyFollowedLoading] =
    useState(true);

  //functions

  async function makeFollowAuthor() {
    try {
      let response = await axios.post(
        "https://publications.apimachine.com/details/followauthor",
        {
          userEmail: localStorage.getItem("bankerEmailNew"),
          authorEmail: authoremail,
        }
      );
      // setIsUserAlreadyFollowed(response?.data?.data);
      console.log(response, "makeFollowAuthor");
      if (response?.data?.status) {
        toast.success("Followed successfully!");
      } else {
        toast.success(response?.data?.message);
      }
      setRefreshLocal((prev) => !prev);
    } catch (error) {
      console.log(error?.message, "makeFollowAuthor error");
    }
  }

  async function getAllFollowers() {
    setIsUserAlreadyFollowedLoading(true);
    try {
      let response = await axios.get(
        `https://publications.apimachine.com/details/followers?authorEmail=${authoremail}`
      );
      console.log(response, "getAllFollowers");
      setIsUserAlreadyFollowed(response?.data?.data);
      setIsUserAlreadyFollowedLoading(false);
    } catch (error) {
      console.log(error?.message, "getAllFollowers error");
      setIsUserAlreadyFollowedLoading(false);
    }
  }

  //rendering

  useEffect(() => {
    setAuthorContentLoading(true);
    setAuthorContent("");
    let url;
    // console.log(authorDetails, "authorDetails author page");

    if (location?.pathname?.includes("article")) {
      url = `https://publications.apimachine.com/article?user_id=${authorDetails?._id}&publication_id=638dd769b257b3715a8fbe07`;
    } else if (location?.pathname?.includes("video")) {
      url = `https://publications.apimachine.com/video?user_id=${authorDetails?._id}&publication_id=638dd769b257b3715a8fbe07`;
    }

    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data, "setAuthor Content");
        // if (location?.pathname?.includes("video")) {
        //   setAuthorContent(response?.data?.data?.video);
        // } else
        if (response?.data?.status) {
          setAuthorContent(response?.data?.data);
        } else {
          setAuthorContent("false");
        }
        setAuthorContentLoading(false);
      })
      .catch((error) => {
        console.log(error?.message, "trending articles API  error");
        setAuthorContentLoading(false);
      });
  }, [authorDetails, categoryChange, authoremail, location]);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07"
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
  }, [categoryChange, authoremail, location]);

  useEffect(() => {
    getAllFollowers();
    axios
      .get(`https://publications.apimachine.com/publisher?email=${authoremail}`)
      .then((response) => {
        let res = response?.data?.data;
        // console.log(res, "author data");
        if (res?.length > 0) {
          setAuthorData(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.log(error?.message, "author data API  error");
      });
  }, [categoryChange, authoremail, refreshLocal, location]);

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
  }, [categoryChange, authoremail, location]);

  useEffect(() => {
    let url;
    // console.log(authorDetails, "authorDetails author page");

    if (location?.pathname?.includes("article")) {
      url = `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?ArticleAuthor=${authoremail}`;
    } else if (location?.pathname?.includes("video")) {
      url = `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?VideoAuthor=${authoremail}`;
    }
    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data?.data, "all catergories", url);
        setAllCategories(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "all categories API  error");
      });
  }, [categoryChange, authoremail]);

  return (
    <div className={classNames.articlesContainer}>
      <div className={classNames.generalDetails}>
        <div style={{ background: authorData?.cover_pic ? "" : "#4B2A91" }}>
          {authorData?.cover_pic && (
            <img
              src={authorData?.cover_pic ? authorData?.cover_pic : ""}
              alt=""
            />
          )}
          <div className={classNames.navigationContainer}>
            <div className={classNames.profileImg}>
              <img
                src={authorData?.profile_pic ? authorData?.profile_pic : ""}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={classNames.detailsContainer}>
          <div className={classNames.header}>
            <div className={classNames.title}>
              {authorData?.name ? authorData?.name : ""} |{" "}
              {isUserAlreadyFollowed?.length} Followers
            </div>
            <div
              className={classNames.followBtn}
              onClick={() => {
                if (localStorage.getItem("bankerEmailNew")) {
                  makeFollowAuthor();
                } else {
                  setRegisterUser("");
                }
              }}
            >
              Follow
            </div>
          </div>

          <div className={classNames.para}>
            {authorData?.description ? authorData?.description : ""}
          </div>
        </div>
      </div>
      <div className={classNames.articlesMain}>
        <div className={classNames.trendingArticles}>
          <div className={classNames.articlesContainer}>
            <div className={classNames.title}>
              <Link
                onClick={() => {
                  setCategoryChange("Articles");
                }}
                to={`/${authoremail}/article`}
                className={`${classNames.titleSwitch} ${
                  window.location?.pathname?.includes("/article")
                    ? classNames.titleSwitchSelected
                    : ""
                }`}
              >
                Articles
              </Link>
              <Link
                onClick={() => {
                  setCategoryChange("Videos");
                }}
                to={`/${authoremail}/video`}
                className={`${classNames.titleSwitch} ${
                  window.location?.pathname?.includes("/video")
                    ? classNames.titleSwitchSelected
                    : ""
                }`}
              >
                Videos
              </Link>
              <Link
                to="#"
                className={`${classNames.titleSwitch}`}
                style={{ pointerEvents: "none" }}
              >
                Podcasts
              </Link>
              <Link
                to="#"
                className={`${classNames.titleSwitch}`}
                style={{ pointerEvents: "none" }}
              >
                Affiliations
              </Link>
              <Link
                onClick={() => {
                  setCategoryChange("Followers");
                }}
                to={`/${authoremail}/followers`}
                className={`${classNames.titleSwitch} ${
                  window.location?.pathname?.includes("/followers")
                    ? classNames.titleSwitchSelected
                    : ""
                }`}
              >
                Followers
              </Link>
            </div>
            <div className={classNames.articles}>
              <div className={classNames.articlesList}>
                {authorContentLoading ? (
                  <div>
                    {Array.from({ length: 7 }).map((_, index) => {
                      return (
                        <EachArticleSkeletonLoading
                          key={"categoryloading" + index}
                        />
                      );
                    })}
                  </div>
                ) : categoryChange === "Followers" ? (
                  <div className={classNames.followersList}>
                    {isUserAlreadyFollowedLoading ? (
                      <div className={classNames.eachFollowers}>
                        <Skeleton circle width={35} height={35} />
                        <div className={classNames.nameDiv}>
                          <div className={classNames.name}>
                            <Skeleton width={80} height={20} />
                          </div>
                          <div className={classNames.email}>
                            <Skeleton width={60} height={15} />
                          </div>
                        </div>
                      </div>
                    ) : isUserAlreadyFollowed?.length > 0 ? (
                      isUserAlreadyFollowed?.map((eachItem, index) => {
                        return (
                          <div
                            key={
                              eachItem?.userDetails?.length > 0
                                ? eachItem?.userDetails[0]?.username + index
                                : "isUderFollowed"
                            }
                            className={classNames.eachFollowers}
                          >
                            <img
                              src={
                                eachItem?.userDetails?.length > 0
                                  ? eachItem?.userDetails[0]?.profile_pic
                                  : ""
                              }
                              alt=""
                            />
                            <div className={classNames.nameDiv}>
                              <div className={classNames.name}>
                                {eachItem?.userDetails?.length > 0
                                  ? eachItem?.userDetails[0]?.username
                                  : ""}
                              </div>
                              <div className={classNames.email}>
                                {eachItem?.userDetails?.length > 0
                                  ? eachItem?.userDetails[0]?.email
                                  : ""}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      ""
                    )}
                  </div>
                ) : authorContent == "false" ? (
                  <div
                    style={{
                      padding: "3rem 0",
                      fontWeight: "550",
                      fontSize: "1.2rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Currently no data for this author
                  </div>
                ) : authorContent?.length > 0 &&
                  location?.pathname?.includes("video") ? (
                  authorContent?.map((eacharticle) => {
                    return (
                      <div
                        className={classNames.eachArticle}
                        onClick={() =>
                          history.push(`/feed/video/${eacharticle?.custom_url}`)
                        }
                      >
                        <div className={classNames.imageDiv}>
                          <img
                            src={eacharticle?.image ? eacharticle?.image : ""}
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
                              <span>
                                {eacharticle?.PublisherDetails?.length > 0 &&
                                eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails?.length > 0 &&
                                eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.name
                                  ? eacharticle?.PublisherDetails[0]
                                      ?.PublisherDetails[0]?.name
                                  : ""}
                              </span>
                            </div>
                            &nbsp; |&nbsp;
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
                            {/* &nbsp; | &nbsp; 2 Min Read */}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  authorContent?.length > 0 &&
                  authorContent?.map((eacharticle) => {
                    return (
                      <div
                        className={classNames.eachArticle}
                        onClick={() =>
                          history.push(
                            `/feed/article/${eacharticle?.custom_url}`
                          )
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
                              <span>
                                {eacharticle?.PublisherDetails?.length > 0 &&
                                eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails?.length > 0 &&
                                eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.name
                                  ? eacharticle?.PublisherDetails[0]
                                      ?.PublisherDetails[0]?.name
                                  : ""}
                              </span>
                            </div>
                            &nbsp; |&nbsp;
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
                            {/* &nbsp; | &nbsp; 2 Min Read */}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
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
            <div className={classNames.categoriesContainer}>
              <div className={classNames.title}>Topics</div>
              <div className={classNames.allCategories}>
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
                          to={
                            location?.pathname?.toLowerCase()?.includes("video")
                              ? `/feed/${eachcategory?.title}/videos`
                              : `/feed/${eachcategory?.title}/articles`
                          }
                          onClick={() => {
                            setCategoryId(eachcategory?._id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <div className={classNames.header}>
                            <span>
                              <img src={eachcategory?.thumbnail} alt="" />
                            </span>
                            {eachcategory?.title}
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthorMain;
