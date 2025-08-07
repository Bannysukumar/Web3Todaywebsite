import React, { useContext, useEffect, useState } from "react";
import classNames from "./footer.module.scss";
import axios from "axios";

//assets
import youtubeIcon from "../../assets/shareIcons/youtube.svg";
import instagramIcon from "../../assets/shareIcons/instagram.svg";
import twitterIcon from "../../assets/shareIcons/twitter.svg";
import linkedinIcon from "../../assets/shareIcons/linkedin.svg";
import telegramIcon from "../../assets/shareIcons/telegram.svg";
import redittIcon from "../../assets/shareIcons/reditt.svg";
import facebookIcon from "../../assets/shareIcons/facebook.svg";
import { GlobalContex } from "../../globalContext";
import { useHistory } from "react-router-dom";

const FooterContainer = () => {
  const history = useHistory();
  const { setCategoryId, setAuthorDetails } = useContext(GlobalContex);
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        console.log(data?.data, "all categories footer");
        setAllCategories(data.data);
      });
  }, []);

  return (
    <>
      <div className={classNames.footer}>
        {/* <div className={classNames.footerBackground}></div> */}
        <div className={classNames.footerLeft}>
          <div className={classNames.footerCategories}>
            <div className={classNames.title}>Topics</div>
            <div className={classNames.options}>
              <div
                onClick={() => {
                  if (window.location.pathname?.includes("video")) {
                    setCategoryId(allCategories[0]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[0]?.title}/videos`);
                  } else {
                    setCategoryId(allCategories[0]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[0]?.title}/articles`);
                  }
                }}
              >
                {allCategories[0]?.title}
              </div>
              <div
                onClick={() => {
                  if (window.location.pathname?.includes("video")) {
                    setCategoryId(allCategories[1]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[1]?.title}/videos`);
                  } else {
                    setCategoryId(allCategories[1]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[1]?.title}/articles`);
                  }
                }}
              >
                {allCategories[1]?.title}
              </div>
              <div
                onClick={() => {
                  if (window.location.pathname?.includes("video")) {
                    setCategoryId(allCategories[2]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[2]?.title}/videos`);
                  } else {
                    setCategoryId(allCategories[2]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[2]?.title}/articles`);
                  }
                }}
              >
                {allCategories[2]?.title}
              </div>
              <div
                onClick={() => {
                  if (window.location.pathname?.includes("video")) {
                    setCategoryId(allCategories[3]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[3]?.title}/videos`);
                  } else {
                    setCategoryId(allCategories[3]?._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.push(`/feed/${allCategories[3]?.title}/articles`);
                  }
                }}
              >
                {allCategories[3]?.title}
              </div>
            </div>
          </div>
          <div className={classNames.footerCategories}>
            <div className={classNames.title}>Directory</div>
            <div className={classNames.options}>
              <div
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  history.push("feed/articles");
                }}
              >
                Articles
              </div>
              <div
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  history.push("feed/videos");
                }}
              >
                Videos
              </div>
              <div
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  history.push("feed/wapps");
                }}
              >
                WAPPs
              </div>
              <div>Markets</div>
            </div>
          </div>
          <div className={classNames.footerCategories}>
            <div className={classNames.title}>About Us</div>
            <div className={classNames.options}>
              <div>Company</div>
              <div>Careers</div>
              <div>Newsletter</div>
              <div>Contact</div>
            </div>
          </div>
          <div className={classNames.footerCategories}>
            <div className={classNames.title}>Partners</div>
            <div className={classNames.options}>
              <div>Authors</div>
              <div>Advertisers</div>
              <div>Employers</div>
              <div>Web3 Creator</div>
            </div>
          </div>
        </div>
        <div className={classNames.footerRight}>
          <div className={classNames.footerCategories}>
            <div className={classNames.title}>Follow Us</div>
            <div className={classNames.socialHandles}>
              <div>
                <img src={youtubeIcon} alt="youtubeIcon" />
              </div>
              <div>
                <img src={instagramIcon} alt="instagramIcon" />
              </div>
              <div>
                <img src={twitterIcon} alt="twitterIcon" />
              </div>
              <div>
                <img src={linkedinIcon} alt="linkedinIcon" />
              </div>
              <div>
                <img src={telegramIcon} alt="telegramIcon" />
              </div>
              <div>
                <img src={redittIcon} alt="redittIcon" />
              </div>
              <div>
                <img src={facebookIcon} alt="facebookIcon" />
              </div>
            </div>
          </div>
          <div
            id="google_translate_element"
            style={{ marginTop: "15px" }}
          ></div>
        </div>
      </div>
      <div className={classNames.terms}>
        Terms Of services And Privacy Policy © Web3Today 2022
      </div>
    </>
  );
};

export default FooterContainer;
