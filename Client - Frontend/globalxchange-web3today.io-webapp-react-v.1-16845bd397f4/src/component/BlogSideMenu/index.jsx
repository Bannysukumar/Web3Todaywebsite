import React, { useContext, useState } from "react";
import classNames from "./blogsidemenu.module.scss";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import moment from "moment-timezone";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { SocialMediaHandles } from "../ArticlesMain";
import { GlobalContex } from "../../globalContext";

const BlogSideMenu = ({
  type,
  publisherData,
  publisherArticles,
  selectedFilter,
  setSelectedFilter,
  publisherLoading,
  filters,
}) => {
  const history = useHistory();
  const { setCategoryId, setAuthorDetails } = useContext(GlobalContex);
  return (
    <div className={classNames.blogSideMenu}>
      <div className={classNames.filterType}>
        <div
          onClick={(event) => {
            setSelectedFilter(event.target.innerText);
          }}
          style={{
            fontWeight: selectedFilter == "Same Author" ? "600" : "",
            background: selectedFilter == "Same Author" ? "white" : "",
            color: selectedFilter == "Same Author" ? "#4b2a91" : "",
          }}
        >
          Same Author
        </div>
        <div
          onClick={(event) => {
            setSelectedFilter(event.target.innerText);
          }}
          style={{
            fontWeight: selectedFilter == "Same Category" ? "600" : "",
            background: selectedFilter == "Same Category" ? "white" : "",
            color: selectedFilter == "Same Category" ? "#4b2a91" : "",
          }}
        >
          Same Category
        </div>
      </div>
      <div className={classNames.card}>
        <div className={classNames.profileImg}>
          <img
            src={
              selectedFilter == "Same Author" && publisherData?.profile_pic
                ? publisherData?.profile_pic
                : selectedFilter == "Same Category" && filters?.thumbnail
                ? filters?.thumbnail
                : ""
            }
            alt=""
          />
        </div>
        <div className={classNames.details}>
          <div>
            {selectedFilter == "Same Author" && publisherData?.name
              ? publisherData?.name
              : selectedFilter == "Same Category" && filters?.title
              ? filters?.title
              : ""}
          </div>
          <div
            onClick={() => {
              setAuthorDetails(publisherData);
              if (selectedFilter == "Same Author") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.push(`/${publisherData?.email}/article`);
                localStorage.setItem("selectedauthor", publisherData?._id);
                // console.log(publisherData, "publisherData");
                // console.log(filters, "filters");
              } else if (window?.location?.pathname?.includes("feed/article")) {
                setCategoryId(filters?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.push(`/feed/${filters?.title}/articles`);
              } else {
                setCategoryId(filters?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.push(`/feed/${filters?.title}/articles`);
              }
            }}
          >
            {selectedFilter == "Same Author"
              ? "View Profile"
              : selectedFilter == "Same Category" && type == "video"
              ? `All ${filters?.title ? filters?.title : ""} Videos`
              : `All ${filters?.title ? filters?.title : ""} Articles`}
          </div>
        </div>
        <div
          className={classNames.socialHandles}
          style={{
            display: selectedFilter == "Same Author" ? "" : "none",
            display: "none",
          }}
        >
          <SocialMediaHandles />
        </div>
      </div>
      <div className={classNames.contentDiv}>
        {publisherLoading
          ? Array(6)
              .fill("")
              .map((_, i) => {
                return <EachCardContentDivLoading />;
              })
          : publisherArticles?.length > 0
          ? publisherArticles?.slice(0, 9)?.map((eachArticle) => {
              return <EachCardContentDiv {...eachArticle} type={type} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default BlogSideMenu;

const EachCardContentDiv = ({
  title,
  icon,
  createdAt,
  link_name,
  type,
  image,
  _id,
  custom_url,
}) => {
  const history = useHistory();
  return (
    <div
      className={classNames.eachCardContentDiv}
      onClick={() => {
        if (type == "video") {
          history.push(`/feed/video/${custom_url ? custom_url : ""}`);
        } else {
          history.push(`/feed/article/${custom_url ? custom_url : ""}`);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className={classNames.imgContainer}>
        <img src={icon ? icon : image ? image : ""} alt="imgContainer" />
      </div>
      <div className={classNames.contentContainer}>
        <div>{title ? title : ""}</div>
        <div>
          {createdAt
            ? // ? moment(createdAt)
              //     .startOf("day")
              //     .fromNow()
              //     ?.split(" ")
              //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              //     .join(" ")
              moment(createdAt).format("MMM Do YYYY")
            : ""}
        </div>
      </div>
    </div>
  );
};
const EachCardContentDivLoading = () => {
  return (
    <div className={classNames.eachCardContentDiv}>
      <div className={classNames.imgContainer}>
        <Skeleton width={50} height={60} />
      </div>
      <div className={classNames.contentContainer}>
        <div>
          <Skeleton width={"100%"} height={10} />
        </div>
        <div>
          <Skeleton width={"70%"} height={10} />
        </div>
      </div>
    </div>
  );
};
