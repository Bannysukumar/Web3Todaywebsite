import React, { useContext, useEffect, useState } from "react";

import classNames from "./articlesmain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { GlobalContex } from "../../globalContext";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import {
  EachArticleSkeletonLoading,
  SocialMediaHandles,
} from "../ArticlesMain";

const CategoryMain = () => {
  const { category } = useParams();
  const { setCategoryId, setAuthorDetails } = useContext(GlobalContex);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryArticles, setCategoryArticles] = useState("");
  const [categoryVideos, setCategoryVideos] = useState("");
  const [allArticles, setAllArticles] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const { categoryId } = useContext(GlobalContex);
  const [articlesLoading, setArticlesLoading] = useState(false);

  useEffect(() => {
    setArticlesLoading(true);
    let categoryURL;
    if (location?.pathname?.toLowerCase()?.includes("news/articles")) {
      axios
        .get(
          `https://publications.apimachine.com/article/category?category=${
            categoryId ? categoryId : ""
          }`
        )
        .then((response) => {
          console.log(response?.data?.data, "category response");
          if (response?.data?.status) {
            setCategoryArticles(response?.data?.data);
            setArticlesLoading(false);
          } else {
            setCategoryArticles("false");
            setArticlesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error?.message, "trending articles API  error");
        });
    } else {
      axios
        .get(
          `https://publications.apimachine.com/video/category?category=${
            categoryId ? categoryId : ""
          }`
        )
        .then((response) => {
          console.log(response?.data?.data, "category response");
          if (response?.data?.status) {
            setCategoryVideos(response?.data?.data);
            setArticlesLoading(false);
          } else {
            setCategoryVideos("false");
            setArticlesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error?.message, "trending articles API  error");
        });
    }
    console.log(categoryURL, categoryId, "category request");
  }, [categoryId]);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        console.log(response?.data, "all authors");
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
        console.log(response?.data?.data, "all catergories");
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
          <div className={classNames.title}>{category}</div>
          <div className={classNames.articles}>
            <div className={classNames.articlesList} style={{ width: "100%" }}>
              {articlesLoading
                ? Array.from({ length: 7 }).map((_, index) => {
                    return (
                      <EachArticleSkeletonLoading
                        key={"categoryloading" + index}
                      />
                    );
                  })
                : categoryArticles == "false" || categoryVideos == "false"
                ? "Currently no data in the category"
                : categoryVideos?.length > 0
                ? categoryVideos?.map((eacharticle) => {
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
                            <div className={classNames.author}>
                              <img
                                // src={
                                //   eacharticle?.PublisherDetails[0]
                                //     ?.PublisherDetails[0]?.profile_pic
                                //     ? eacharticle?.PublisherDetails[0]
                                //         ?.PublisherDetails[0]?.profile_pic
                                //     : ""
                                // }
                                alt=""
                              />
                              <span>
                                {/* {eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.name
                                  ? eacharticle?.PublisherDetails[0]
                                      ?.PublisherDetails[0]?.name
                                  : ""} */}
                              </span>
                            </div>
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
                : categoryArticles?.length > 0 &&
                  categoryArticles?.map((eacharticle) => {
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
                      to={
                        location?.pathname?.toLowerCase()?.includes("video")
                          ? `/news/videos/${eachcategory?.title}`
                          : `/news/articles/${eachcategory?.title}`
                      }
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
                        navigate(`/${eachauthor?.email}/article`);
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

export default CategoryMain;
