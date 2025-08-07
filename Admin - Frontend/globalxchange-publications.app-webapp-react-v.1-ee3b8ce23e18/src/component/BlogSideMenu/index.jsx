import React, { useContext, useState } from "react";
import classNames from "./blogsidemenu.module.scss";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import moment from "moment-timezone";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
              if (window?.location?.pathname?.includes("news/article")) {
                setCategoryId(filters?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/news/articles/${filters?.title}`);
              } else if (selectedFilter == "Same Author") {
                navigate(`/${publisherData?.email}/article`);
                localStorage.setItem("selectedauthor", publisherData?._id);
                // console.log(publisherData, "publisherData");
                // console.log(filters, "filters");
              } else {
                setCategoryId(filters?._id);
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/news/articles/${filters?.title}`);
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
          style={{ display: selectedFilter == "Same Author" ? "" : "none" }}
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
          ? publisherArticles?.map((eachArticle) => {
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
  const navigate = useNavigate();
  return (
    <div
      className={classNames.eachCardContentDiv}
      onClick={() => {
        if (type == "video") {
          navigate(`/news/video/${custom_url ? custom_url : ""}`);
        } else {
          navigate(`/news/article/${custom_url ? custom_url : ""}`);
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
            ? moment(createdAt)
                .startOf("day")
                .fromNow()
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
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
        <Skeleton circle width={50} height={50} />
      </div>
      <div className={classNames.contentContainer}>
        <div>
          <Skeleton width={250} height={10} />
        </div>
        <div>
          <Skeleton width={150} height={10} />
        </div>
      </div>
    </div>
  );
};
