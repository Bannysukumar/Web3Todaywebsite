import React, { useEffect } from "react";
import classNames from "./blogmenubar.module.scss";
import { BsDiscord, BsTelegram, BsInstagram } from "react-icons/bs";
import { RiLinkedinFill, RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";

import facebookIcon from "../../static/images/icons/facebook.svg";
import telegramIcon from "../../static/images/icons/telegram.svg";
import linkedinIcon from "../../static/images/icons/linkedin.svg";
import whatsappIcon from "../../static/images/icons/whatsapp.svg";
import twitterIcon from "../../static/images/icons/twitter.svg";
import redittIcon from "../../static/images/icons/reditt.svg";
import tumblerIcon from "../../static/images/icons/tumbler.svg";
import mailIcon from "../../static/images/icons/mail.svg";
import { Helmet } from "react-helmet-async";

const BlogMenuBar = ({ saved, saveArticle, saving, copyy, articleTitle, coverPhotoUrl }) => {
  console.log(copyy, "urrrll")

  // https://web3today.io/feed/article/The_Domino_Effect_How_Bank_Failures_Send_Shockwaves_Through_the_US_Economy_and_Crypto_Banks__

  // useEffect(() => {
  //   const metaTags = document.head.getElementsByTagName('meta');

  //   for (let i = 0; i < metaTags.length; i++) {
  //     const tag = metaTags[i];

  //     if (tag.getAttribute('name') === 'title') {
  //       tag.setAttribute('content', articleTitle);
  //     }

  //     if (tag.getAttribute('name') === 'image') {
  //       tag.setAttribute('content', coverPhotoUrl);
  //     }

  //     if (tag.getAttribute('name') === 'url') {
  //       tag.setAttribute('content', `https://web3today.io/feed/article/${copyy}`);
  //     }
  //     if (tag.getAttribute('name') === 'imagealt') {
  //       tag.setAttribute('content', articleTitle);
  //     }
  //   }
  // }, [])
  return (
    <>

      <div className={classNames.blogMenuBar}>
        {saved ? (
          <div className={classNames.primaryButton}>Already Saved</div>
        ) : (
          <div
            className={classNames.primaryButton}
            onClick={(e) => saveArticle()}
          >
            {saving ? "Saving..." : saved ? "Already Saved" : "Save Article"}
          </div>
        )}
        <div className={classNames.socialMediaIcons}>
          <a
            href={`https://mail.google.com/mail/u/0/?view=cm&to&su=Awesome+Blog!&body=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }&bcc&cc&fs=1&tf=1`}
            target="_blank"
          >
            <img src={mailIcon} alt="mailIcon" />
          </a>

          <a
            href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }&caption=Awesome%20blog!&tags=test%2Chello`}
            target="_blank"
          >
            <img src={tumblerIcon} alt="tumblerIcon" />
          </a>
          {/* const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(coverPhotoUrl)}`; */}

          <a
            href={`https://www.reddit.com/submit?url=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }&title=Awesome%20Blog!`}
            target="_blank"
          >
            <img src={redittIcon} alt="redittIcon" />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${articleTitle}&media=${encodeURIComponent(coverPhotoUrl)}&url=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }`}
            target="_blank"
          >
            <img src={twitterIcon} alt="twitterIcon" />
          </a>

          <a
            href={`https://wa.me/?text=${articleTitle}%5Cn%20${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }`}
            target="_blank"
          >
            <img src={whatsappIcon} alt="whatsappIcon" />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }`}
            target="_blank"
          >
            <img src={linkedinIcon} alt="linkedinIcon" />
          </a>

          <a
            href={`https://t.me/share/url?url=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }&text=${articleTitle}`}
            target="_blank"
          >
            <img src={telegramIcon} alt="telegramIcon" />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${"https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              }&quote=${articleTitle}`}
            target="_blank"
          >
            <img src={facebookIcon} alt="facebookIcon" />
          </a>

          <div
            onClick={() =>
              navigator.clipboard.writeText(
                "https://web3today.io/feed/article/" + encodeURIComponent(copyy)
              )
            }
          >
            <RiFileCopyLine />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogMenuBar;
