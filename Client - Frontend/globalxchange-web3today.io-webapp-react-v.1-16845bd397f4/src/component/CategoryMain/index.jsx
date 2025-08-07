import React, { useContext, useEffect, useState } from "react";

import classNames from "./articlesmain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalContex } from "../../globalContext";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import {
  EachArticleSkeletonLoading,
  SocialMediaHandles,
} from "../ArticlesMain";

const CategoryMain = () => {
  const { category } = useParams();
  const {
    categoryId,
    setCategoryId,
    setAuthorDetails,
    selectedFormat,
    setSelectedFormat,
  } = useContext(GlobalContex);
  const history = useHistory();
  const location = useLocation();
  const [categoryArticles, setCategoryArticles] = useState("");
  const [categoryVideos, setCategoryVideos] = useState("");
  const [categoryReports, setCategoryReports] = useState("");
  const [allArticles, setAllArticles] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const [articlesLoading, setArticlesLoading] = useState(false);

  const [categoryChange, setCategoryChange] = useState(false);
  const [authorIDFiltered, setAuthorIDFiltered] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        let allCategoriesRes = response?.data?.data;
        let filteredRes;
        if (allCategoriesRes?.length > 0) {
          filteredRes = allCategoriesRes?.filter((eachcategory) => {
            return eachcategory?.title?.includes(category);
          });
          if (filteredRes?.length > 0) {
            filteredRes = filteredRes[0];
            // console.log(filteredRes, "filteredRes");
            setCategoryId(filteredRes?._id);
            setCategoryChange((prev) => !prev);
          }
        }
        // console.log(response, "all categories normal");
      })
      .catch((error) => {
        console.log(error?.message, "all categories normal error");
      });
  }, []);

  useEffect(() => {
    console.log(categoryId, "catgegory iddd");
    if (categoryArticles?.length > 0) {
      setCategoryArticles("");
    }
    if (categoryVideos?.length > 0) {
      setCategoryVideos("");
    }
    if (categoryReports?.length > 0) {
      setCategoryReports("");
    }

    setArticlesLoading(true);
    let categoryURL;
    if (location?.pathname?.toLowerCase()?.includes("/articles")) {
      axios
        .get(
          `https://publications.apimachine.com/article/category?category=${categoryId ? categoryId : ""
          }&publication_id=638dd769b257b3715a8fbe07`
        )
        .then((response) => {
          console.log(response?.data?.data, "category response articles");
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
    } else if (location?.pathname?.toLowerCase()?.includes("/reports")) {
      axios
        .get(
          `https://publications.apimachine.com/report?categoryType=${categoryId ? categoryId : ""}&publication_id=638dd769b257b3715a8fbe07`
        )
        .then((response) => {
          console.log(response?.data?.data, "category response reports");
          if (response?.data?.status) {
            setCategoryReports(response?.data?.data);
            setArticlesLoading(false);
          } else {
            // setCategoryReports("false");
            setArticlesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error?.message, "trending reports API  error");
        });
    } else {
      axios
        .get(
          `https://publications.apimachine.com/video/category?category=${categoryId ? categoryId : ""
          }&publication_id=638dd769b257b3715a8fbe07`
        )
        .then((response) => {
          console.log(response?.data?.data, "category response videos");
          if (response?.data?.status) {
            setCategoryVideos(response?.data?.data);
            setArticlesLoading(false);
          } else {
            setCategoryVideos("false");
            setArticlesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error?.message, "trending videos API  error");
        });
    }
    console.log(categoryURL, categoryId, "category request");
  }, [categoryId, categoryChange]);
  //   axios
  //     .get(
  //       "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07"
  //     )
  //     .then((response) => {
  //       console.log(response?.data, "all authors");
  //       if (response?.data?.status) {
  //         setAuthors(response?.data?.data);
  //       } else {
  //         setAuthors("false");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error?.message, "all authors API  error");
  //     });
  // }, [categoryChange]);

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
  }, [categoryChange]);

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
  }, [categoryChange]);

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
  }, [categoryChange]);

  useEffect(() => {
    // console.log(categoryId, "catergory page categoryId");
    axios
      .get(
        `https://publications.apimachine.com/category/${categoryId}?publication_id=638dd769b257b3715a8fbe07`
      )
      .then((response) => {
        let res = response?.data?.data;
        if (res?.length > 0) {
          console.log(res[0], "catergories complete data API", response);
          setCategoriesData(res[0]);
        }
        if (res?.length == 1) {
          if (
            location?.pathname?.toLowerCase()?.includes("/articles") &&
            res[0]?.articles_publishers
          ) {
            setAuthors(res[0]?.articles_publishers);
          } else if (
            location?.pathname?.toLowerCase()?.includes("/videos") &&
            res[0]?.videos_publishers
          ) {
            setAuthors(res[0]?.videos_publishers);
          } else if (
            location?.pathname?.toLowerCase()?.includes("/reports") &&
            res[0]?.reports_publishers
          ) {
            setAuthors(res[0]?.reports_publishers);
          }
        }
      })
      .catch((error) => {
        console.log(error?.message, "all categories API  error");
      });
  }, [categoryId, categoryChange]);

  return (
    <div className={classNames.categoryArticlesMain}>
      <div className={classNames.generalDetails}>
        <div
          style={{
            background: categoriesData?.colorCode
              ? `linear-gradient(from top, ${categoriesData?.colorCode} 0%, ${categoriesData?.colorCode} 0%, white 50%)`
              : "",
          }}
        >
          <div className={classNames.navigationContainer}>
            <div className={classNames.profileImg}>
              <img
                src={categoriesData?.thumbnail ? categoriesData?.thumbnail : ""}
                alt=""
              />
            </div>
            <div className={classNames.filterContainer}>
              <div className={classNames.filterType}>
                <div
                  onClick={(event) => {
                    setSelectedFormat("Articles");
                    history.push(`/feed/${category}/articles`);
                    setCategoryChange((prev) => !prev);
                  }}
                  style={{
                    fontWeight: selectedFormat == "Articles" ? "600" : "",
                    background: selectedFormat == "Articles" ? "white" : "",
                    color: selectedFormat == "Articles" ? "#4b2a91" : "",
                  }}
                >
                  {selectedFormat == "Articles" ? category : ""}&nbsp; Articles
                </div>
                <div
                  onClick={(event) => {
                    setSelectedFormat("Videos");
                    history.push(`/feed/${category}/videos`);
                    setCategoryChange((prev) => !prev);
                  }}
                  style={{
                    fontWeight: selectedFormat == "Videos" ? "600" : "",
                    background: selectedFormat == "Videos" ? "white" : "",
                    color: selectedFormat == "Videos" ? "#4b2a91" : "",
                  }}
                >
                  {selectedFormat == "Videos" ? category : ""}&nbsp; Videos
                </div>
                <div
                  onClick={(event) => {
                    setSelectedFormat("Reports");
                    history.push(`/feed/${category}/reports`);
                    setCategoryChange((prev) => !prev);
                  }}
                  style={{
                    fontWeight: selectedFormat == "Reports" ? "600" : "",
                    background: selectedFormat == "Reports" ? "white" : "",
                    color: selectedFormat == "Reports" ? "#4b2a91" : "",
                  }}
                >
                  {selectedFormat == "Reports" ? category : ""}&nbsp; Reports
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames.detailsContainer}>
          {articlesLoading ? (
            <Skeleton width={150} height={25} />
          ) : (
            <div className={classNames.title}>
              What is &nbsp;
              {categoriesData ? categoriesData?.title : ""}?
            </div>
          )}

          {articlesLoading ? (
            <div className={classNames.para}></div>
          ) : (
            <div className={classNames.para}>
              {categoriesData ? categoriesData?.description : ""}
            </div>
          )}
        </div>
      </div>
      <div className={classNames.articlesMain}>
        <div className={classNames.trendingArticles}>
          <div className={classNames.articlesContainer}>
            <div className={classNames.title}>
              {category}&nbsp;
              {location?.pathname?.toLowerCase()?.includes("/articles")
                ? "Articles"
                : location?.pathname?.toLowerCase()?.includes("/videos") ? "Videos" : "Reports"}
            </div>
            <div className={classNames.articles}>
              <div
                className={classNames.articlesList}
                style={{ width: "100%" }}
              >
                {articlesLoading ? (
                  <div>
                    {Array.from({ length: 7 }).map((_, index) => {
                      return (
                        <EachArticleSkeletonLoading
                          key={"categoryloading" + index}
                        />
                      );
                    })}
                  </div>
                ) : categoryArticles == "false" || categoryVideos == "false" || categoryReports == "false" ? (
                  "Currently no data in the category"
                ) : categoryVideos?.length > 0 ? (
                  categoryVideos?.map((eacharticle) => {
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
                  })
                ) : (
                  categoryArticles?.length > 0 &&
                  categoryArticles?.map((eacharticle) => {
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
                              {/* <img
                              src={
                                eacharticle?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.profile_pic
                                  ? eacharticle?.PublisherDetails[0]
                                      ?.PublisherDetails[0]?.profile_pic
                                  : ""
                              }
                              alt=""
                            /> */}
                              <span>
                                {eacharticle?.PublisherDetails[0]
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

                {categoryReports ? categoryReports?.length > 0 ? (
                  categoryReports?.map((eachReport) => {
                    console.log(eachReport, "eachReport")
                    return (
                      <div
                        className={classNames.eachArticle}
                      >
                        <div className={classNames.imageDiv}>
                          <img
                            src={eachReport?.icon ? eachReport?.icon : ""}
                            alt=""
                          />
                        </div>
                        <div className={classNames.contentDiv}>
                          <div className={classNames.title}>
                            {eachReport?.title ? eachReport?.title : ""}
                          </div>
                          <div className={classNames.para}>
                            {eachReport?.desc ? eachReport?.desc : ""}
                          </div>
                          <div className={classNames.details}>
                            <div className={classNames.author}>

                              <span>
                                {eachReport?.PublisherDetails[0]
                                  ?.PublisherDetails[0]?.name
                                  ? eachReport?.PublisherDetails[0]
                                    ?.PublisherDetails[0]?.name
                                  : ""}
                              </span>
                            </div>
                            &nbsp; |&nbsp;
                            <div className={classNames.publishDate}>
                              {eachReport?.createdAt
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
                                moment(eachReport?.createdAt).format(
                                  "MMM Do YYYY"
                                )
                                : ""}
                            </div>
                            {/* &nbsp; | &nbsp; 2 Min Read */}
                          </div>
                          <div className={classNames.downloadPDF} onClick={() => window.open(eachReport?.reportPDF)}>View</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div>
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
                        onClick={() => {
                          setAuthorDetails(eachauthor);
                          history.push(`/${eachauthor?.email}/article`);
                          localStorage.setItem(
                            "selectedauthor",
                            eachauthor?._id
                          );
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <img
                          src={
                            eachauthor?.profile_pic
                              ? eachauthor?.profile_pic
                              : ""
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
    </div>
  );
};

export default CategoryMain;
