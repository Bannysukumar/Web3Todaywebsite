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
import FloatingFooter from "../MobileLayout/FloatingFooter";
import useWindowDimensions from "../../services/WindowSize";

const CategoryMainMobile = () => {
  const { category } = useParams();
  const { width, height } = useWindowDimensions();
  const { setCategoryId, setAuthorDetails } = useContext(GlobalContex);
  const history = useHistory();
  const location = useLocation();
  const [categoryArticles, setCategoryArticles] = useState("");
  const [categoryVideos, setCategoryVideos] = useState("");
  const [allArticles, setAllArticles] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const { categoryId } = useContext(GlobalContex);
  const [articlesLoading, setArticlesLoading] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState("Articles");
  const [categoryChange, setCategoryChange] = useState(false);

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

    setArticlesLoading(true);
    let categoryURL;
    if (location?.pathname?.toLowerCase()?.includes("/articles")) {
      axios
        .get(
          `https://publications.apimachine.com/article/category?category=${
            categoryId ? categoryId : ""
          }&publication_id=638dd769b257b3715a8fbe07`
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
          }&publication_id=638dd769b257b3715a8fbe07`
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
  }, [categoryId, categoryChange]);

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
  }, [categoryChange]);

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
          <div className={classNames.navigationContainerMobile}>
            <div className={classNames.profileImg}>
              <img
                src={categoriesData?.thumbnail ? categoriesData?.thumbnail : ""}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={classNames.detailsContainer}>
          {categoriesData ? (
            <div className={classNames.title}>
              What is &nbsp;{categoriesData ? categoriesData?.title : ""}?
            </div>
          ) : (
            <>
              <Skeleton width={"80%"} height={20} />
              <Skeleton
                width={"60%"}
                height={20}
                style={{ marginTop: "1rem" }}
              />
            </>
          )}
          <div className={classNames.para}>
            {categoriesData ? categoriesData?.description : ""}
          </div>
        </div>
        <div className={classNames.filterContainerMobile}>
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
              {selectedFormat == "Articles" ? "" : category}&nbsp; Videos
            </div>
          </div>
        </div>
        <div className={classNames.articlesMainMobile}>
          <div className={classNames.trendingArticles}>
            <div className={classNames.articlesContainer}>
              <div className={classNames.title}>
                {category}&nbsp;
                {location?.pathname?.toLowerCase()?.includes("/articles")
                  ? "Articles"
                  : "Videos"}
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
                          <div
                            style={{ display: "flex", marginTop: "2rem" }}
                            key={"eachloading" + index}
                          >
                            <div>
                              <Skeleton width={150} height={110} />
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
                              <Skeleton width={110} height={20} />
                              <Skeleton width={80} height={20} />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "-webkit-fill-available",
                                }}
                              >
                                <Skeleton width={30} height={20} />
                                <Skeleton width={30} height={20} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : categoryArticles == "false" ||
                    categoryVideos == "false" ? (
                    "Currently no data in the category"
                  ) : categoryVideos?.length > 0 ? (
                    categoryVideos?.map((eacharticle) => {
                      return (
                        <div
                          className={classNames.eachArticle}
                          onClick={() =>
                            history.push(
                              `/feed/video/${eacharticle?.custom_url}`
                            )
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  );
};

export default CategoryMainMobile;
