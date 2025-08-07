import React, { useContext, useEffect, useState } from "react";

import classNames from "./casestudymain.module.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { GlobalContex } from "../../globalContext";

import linkedinIcon from "../../assets/images/icons/linkedin.svg";
import twitterIcon from "../../assets/images/icons/twitter.svg";
import { SocialMediaHandles } from "../ArticlesMain";

const CaseStudyMain = () => {
  const { category } = useParams();
  const location = useLocation();
  const { setCategoryId, setAuthorDetails, selectedFormat, setSelectedFormat } =
    useContext(GlobalContex);
  const history = useHistory();
  const [allCaseStudies, setAllCaseStudies] = useState("");
  const [allAuthors, setAuthors] = useState("");
  const [allCategories, setAllCategories] = useState("");
  const [allCampaigns, setAllCampaigns] = useState("");
  const [caseStudiesLoading, setCaseStudiesLoading] = useState(false);
  const { categoryId } = useContext(GlobalContex);

  useEffect(() => {
    setCaseStudiesLoading(true);
    axios
      .get(
        "https://publications.apimachine.com/casestudy?publication_id=638dd769b257b3715a8fbe07"
      )
      .then((response) => {
        console.log(response?.data, "all casestudies");
        if (response?.data?.status) {
          setAllCaseStudies(response?.data?.data);
          setCaseStudiesLoading(false);
        } else {
          setAllCaseStudies("false");
          setCaseStudiesLoading(false);
        }
      })
      .catch((error) => {
        console.log(error?.message, "trending articles API  error");
      });
  }, [categoryId]);

  useEffect(() => {
    axios
      .get(
        "https://publications.apimachine.com/application/publication/638dd769b257b3715a8fbe07?atleastOneVideo=true"
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
        "https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07?atleastOneVideo=true"
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
          <div className={classNames.title}>Case Studies</div>
          <div className={classNames.articles}>
            <div className={classNames.caseStudiesList}>
              {caseStudiesLoading
                ? Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <EachCaseStudySkeletonLoading
                        key={"categoryloading" + index}
                      />
                    );
                  })
                : allCaseStudies?.length > 0 &&
                  allCaseStudies?.map((eachcasestudy) => {
                    return (
                      <div
                        className={classNames.caseStudies}
                        onClick={() => {
                          history.push(
                            `/feed/casestudies/${eachcasestudy?._id}`
                          );
                        }}
                      >
                        <img
                          src={eachcasestudy?.icon}
                          alt=""
                          className={classNames.caseStudyImage}
                        />
                        <div className={classNames.title}>
                          {eachcasestudy?.title}
                        </div>
                      </div>
                    );
                  })}
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
                        to={`/feed/${eachcategory?.title}/videos`}
                        onClick={() => {
                          setCategoryId(eachcategory?._id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setSelectedFormat("Videos");
                          // console.log(eachcategory, "newssss");
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
                        history.push(`/${eachauthor?.email}/video`);
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

export default CaseStudyMain;

export const EachCaseStudySkeletonLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "2rem",
        flexDirection: "column",
        height: "400px",
        maxHeight: "400px",
      }}
    >
      <div style={{ width: "100%", height: "70%" }}>
        <Skeleton width={"100%"} height={"100%"} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "30%",
        }}
      >
        <Skeleton width={"100%"} height={20} />
        <Skeleton width={"80%"} height={20} />
        <Skeleton width={"65%"} height={20} />
      </div>
    </div>
  );
};
