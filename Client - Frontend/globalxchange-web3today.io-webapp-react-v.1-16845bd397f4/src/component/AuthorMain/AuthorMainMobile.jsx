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
  EachArticleSkeletonLoadingMobile,
  SocialMediaHandles,
} from "../ArticlesMain";
import FloatingFooter from "../MobileLayout/FloatingFooter";
import useWindowDimensions from "../../services/WindowSize";

const AuthorMainMobile = () => {
  const { authoremail, category } = useParams();
  const { width } = useWindowDimensions();
  const {
    categoryId,
    setCategoryId,
    authorDetails,
    setAuthorDetails,
    selectedFormat,
    setSelectedFormat,
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
  }, [authorDetails, categoryChange, authoremail]);

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
  }, [categoryChange, authoremail]);

  useEffect(() => {
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
  }, [categoryChange, authoremail]);

  return (
    <div className={classNames.articlesContainer}>
      <div className={classNames.generalDetailsMobile}>
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
          <div className={classNames.title}>
            {authorData?.name ? authorData?.name : ""}
          </div>
          <div className={classNames.para}>
            {authorData?.description ? authorData?.description : ""}
          </div>
        </div>
      </div>
      <div className={classNames.articlesMainMobile}>
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
            </div>
            <div className={classNames.articles}>
              <div className={classNames.articlesList}>
                {authorContentLoading ? (
                  <div>
                    {Array.from({ length: 7 }).map((_, index) => {
                      return (
                        <EachArticleSkeletonLoadingMobile
                          key={"categoryloading" + index}
                        />
                      );
                    })}
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
        </div>
      </div>
      {width < 700 ? <FloatingFooter /> : ""}
    </div>
  );
};

export default AuthorMainMobile;
