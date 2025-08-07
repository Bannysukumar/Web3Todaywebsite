import React, { useContext, useEffect, useState } from "react";

import classNames from "./articlesmain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { GlobalContex } from "../../globalContext";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import { SocialMediaHandles } from "../ArticlesMain";

const AuthorMain = () => {
  const { authoremail } = useParams();
  const { setCategoryId, authorDetails, setAuthorDetails } =
    useContext(GlobalContex);
  const navigate = useNavigate();
  const location = useLocation();
  const [authorContent, setAuthorContent] = useState("");
  const [allArticles, setAllArticles] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const { categoryId } = useContext(GlobalContex);

  // console.log(location, "location author main page");

  useEffect(() => {
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
        console.log(response?.data, "setAuthor Content");
        // if (location?.pathname?.includes("video")) {
        //   setAuthorContent(response?.data?.data?.video);
        // } else
        if (response?.data?.status) {
          setAuthorContent(response?.data?.data);
        } else {
          setAuthorContent("false");
        }
      })
      .catch((error) => {
        console.log(error?.message, "trending articles API  error");
      });
  }, [authorDetails]);

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
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/article/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        setAllArticles(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.message, "all articles API  error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07"
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

  console.log(authorDetails, "AuthorDetails");

  return (
    <div className={classNames.articlesMain}>
      <div className={classNames.trendingArticles}>
        <div className={classNames.articlesContainer}>
          <div className={classNames.title}>
            {authorDetails?.name ? authorDetails?.name : ""}
            's &nbsp;
            {location?.pathname?.includes("article") ? "Articles" : "Videos"}
          </div>
          <div className={classNames.articles}>
            <div className={classNames.articlesList}>
              {authorContent == "false"
                ? "Currently no data for this author"
                : authorContent?.length > 0 &&
                  location?.pathname?.includes("video")
                ? authorContent?.map((eacharticle) => {
                    return (
                      <div
                        className={classNames.eachArticle}
                        onClick={() =>
                          navigate(`/news/video/${eacharticle?.custom_url}`)
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
                            {eacharticle?.PublisherDetails?.length > 0 &&
                              eacharticle?.PublisherDetails[0]?.PublisherDetails
                                .length > 0 && (
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
                              )}
                            <div className={classNames.publishDate}>
                              {eacharticle?.createdAt
                                ? moment(eacharticle?.createdAt)
                                    .startOf("day")
                                    .fromNow()
                                    ?.split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : authorContent?.length > 0 &&
                  authorContent?.map((eacharticle) => {
                    return (
                      <div
                        className={classNames.eachArticle}
                        onClick={() =>
                          navigate(`/news/article/${eacharticle?.custom_url}`)
                        }
                      >
                        <div className={classNames.imageDiv}>
                          <img
                            src={eacharticle?.media ? eacharticle?.media : ""}
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
                            {eacharticle?.PublisherDetails?.length > 0 &&
                              eacharticle?.PublisherDetails[0]?.PublisherDetails
                                .length > 0 && (
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
                              )}
                            <div className={classNames.publishDate}>
                              {eacharticle?.createdAt
                                ? moment(eacharticle?.createdAt)
                                    .startOf("day")
                                    .fromNow()
                                    ?.split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <div>
          <div className={classNames.categoriesContainer}>
            <div className={classNames.title}>Categories</div>
            <div className={classNames.allCategories}>
              {allCategories?.length > 0 &&
                allCategories?.map((eachcategory) => {
                  return (
                    <Link
                      to={`/news/articles/${eachcategory?.title}`}
                      onClick={() => {
                        setCategoryId(eachcategory?._id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className={classNames.header}>
                        <img src={eachcategory?.thumbnail} alt="" />
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
          <div className={classNames.earnCampaigns}>
            <div className={classNames.title}>Earn Campaigns</div>
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
            <div className={classNames.title}>Authors</div>
            <div className={classNames.authorsContainer}>
              {allAuthors?.length > 0 &&
                allAuthors?.map((eachauthor) => {
                  return (
                    <div
                      className={classNames.eachAuthorprofile}
                      onClick={() => {
                        setAuthorDetails(eachauthor);
                        if (location?.pathname?.includes("video")) {
                          navigate(`/${eachauthor?.email}/video`);
                          localStorage.setItem(
                            "selectedauthor",
                            eachauthor?._id
                          );
                        } else {
                          navigate(`/${eachauthor?.email}/article`);
                          localStorage.setItem(
                            "selectedauthor",
                            eachauthor?._id
                          );
                        }
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

export default AuthorMain;
