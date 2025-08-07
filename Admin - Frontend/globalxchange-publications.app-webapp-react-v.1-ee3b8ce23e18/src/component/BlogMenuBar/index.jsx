import React from "react";
import classNames from "./blogmenubar.module.scss";
import { BsDiscord, BsTelegram, BsInstagram } from "react-icons/bs";
import { RiLinkedinFill, RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";

import facebookIcon from "../../static/images/icons/facebook.svg";
import telegramIcon from "../../static/images/icons/telegram.svg";
import linkedinIcon from "../../static/images/icons/linkedin.svg";
import whatsappIcon from "../../static/images/icons/whatsappWeb3Today.svg";
import twitterIcon from "../../static/images/icons/twitter.svg";
import redittIcon from "../../static/images/icons/reditt.svg";
import tumblerIcon from "../../static/images/icons/tumbler.svg";
import mailIcon from "../../static/images/icons/mail.svg";

const BlogMenuBar = ({ saved, saveArticle, saving, copyy }) => {
  return (
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
          href="https://mail.google.com/mail/u/0/?view=cm&to&su=Awesome+Blog!&body=https%3A%2F%2Fweb3today.io%0A&bcc&cc&fs=1&tf=1"
          target="_blank"
        >
          <img src={mailIcon} alt="mailIcon" />
        </a>

        <a
          href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=web3today.io&caption=Awesome%20blog!&tags=test%2Chello"
          target="_blank"
        >
          <img src={tumblerIcon} alt="tumblerIcon" />
        </a>

        <a
          href="https://www.reddit.com/submit?url=web3today.io&title=Awesome%20Blog!"
          target="_blank"
        >
          <img src={redittIcon} alt="redittIcon" />
        </a>

        <a
          href="https://twitter.com/intent/tweet?text=Awesome%20Blog!&url=web3today.io"
          target="_blank"
        >
          <img src={twitterIcon} alt="twitterIcon" />
        </a>

        <a
          href="https://wa.me/?text=Awesome%20Blog!%5Cn%20web3today.io"
          target="_blank"
        >
          <img src={whatsappIcon} alt="whatsappIcon" />
        </a>

        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=web3today.io"
          target="_blank"
        >
          <img src={linkedinIcon} alt="linkedinIcon" />
        </a>

        <a
          href="https://t.me/share/url?url=web3today.io&text=Awesome%20blog!"
          target="_blank"
        >
          <img src={telegramIcon} alt="telegramIcon" />
        </a>

        <a
          href="https://www.facebook.com/sharer/sharer.php?u=web3today.io&quote=Awesome%20Blog!"
          target="_blank"
        >
          <img src={facebookIcon} alt="facebookIcon" />
        </a>

        <div
          onClick={() =>
            navigator.clipboard.writeText(
              "https://web3today.io/news/article/" + copyy
            )
          }
        >
          <RiFileCopyLine />
        </div>
      </div>
    </div>
  );
};

export default BlogMenuBar;
