import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";

import MainIco from "../../assets/mainico.svg";
import youTubeIcon from "../../assets/footer/youtube.svg";
import instaIcon from "../../assets/footer/insta.svg";
import twitterIcon from "../../assets/footer/twitter.svg";
import linkedinIcon from "../../assets/footer/linkedin.svg";
import telegramIcon from "../../assets/footer/telegram.svg";
import redittIcon from "../../assets/footer/reditt.svg";
import facebookIcon from "../../assets/footer/facebook.svg";
import axios from "axios";
import FooterContainer from "../NewFooter";

const Footer = () => {
  // const [allCategories, setAllCategories] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://publications.apimachine.com/category/publication/638dd769b257b3715a8fbe07`
  //     )
  //     .then(({ data }) => {
  //       setAllCategories(data.data);
  //     });
  // }, []);

  return (
    <>
      {window.innerWidth > 700 ? (
        <FooterContainer/>
        // <div className={styles.footerWrapper}>
        //   <footer className={styles.footer}>
        //     <div class={styles.column}>
        //       <img src={MainIco} alt="" />
        //     </div>
        //     <div class={styles.column}>
        //       <h4>Categories</h4>
        //       <div>{allCategories[0]?.title}</div>
        //       <div>{allCategories[1]?.title}</div>
        //       <div>{allCategories[2]?.title}</div>
        //       <div>{allCategories[3]?.title}</div>
        //       <div>{allCategories[4]?.title}</div>
        //     </div>
        //     <div class={styles.column}>
        //       <h4>Directory</h4>

        //       <div>WAPPs</div>
        //       <div>People</div>
        //       <div>Regulation</div>
        //       <div>Research</div>
        //       <div>Events</div>
        //     </div>
        //     <div class={styles.column}>
        //       <h4>About Us</h4>

        //       <div>Company</div>
        //       <div>Careers</div>
        //       <div>Masthead</div>
        //       <div>Newsletter</div>
        //       <div>Contact</div>
        //     </div>
        //     <div class={styles.column}>
        //       <h4>Partners</h4>

        //       <div>Authors</div>
        //       <div>Advertisers</div>
        //       <div>Educators</div>
        //       <div>Web3 Creator</div>
        //       <div>Employers</div>
        //     </div>
        //   </footer>
        //   <div className={styles.connect}>
        //     <div className={styles.left}>
        //       <div className={styles.title}>Follow Us On Social</div>
        //       <div>
        //         <img
        //           src={youTubeIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open(
        //               "https://www.youtube.com/@Web3today_io/featured",
        //               "_blank"
        //             );
        //           }}
        //         />
        //         <img
        //           src={instaIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open(
        //               "https://instagram.com/web3today_io?igshid=YmMyMTA2M2Y=",
        //               "_blank"
        //             );
        //           }}
        //         />
        //         <img
        //           src={twitterIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open("https://twitter.com/Web3today_io", "_blank");
        //           }}
        //         />
        //         <img
        //           src={linkedinIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open(
        //               "https://www.linkedin.com/company/web3today/",
        //               "_blank"
        //             );
        //           }}
        //         />
        //         <img
        //           src={telegramIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open("https://t.me/+rOkghEkm2QhhZTFl", "_blank");
        //           }}
        //         />
        //         <img
        //           src={redittIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open(
        //               "https://www.reddit.com/user/Web3today_io",
        //               "_blank"
        //             );
        //           }}
        //         />
        //         <img
        //           src={facebookIcon}
        //           alt=""
        //           onClick={(e) => {
        //             window.open(
        //               "https://www.facebook.com/profile.php?id=100091326445289&is_tour_dismissed=true",
        //               "_blank"
        //             );
        //           }}
        //         />
        //       </div>
        //     </div>
        //     <div className={styles.right}>
        //       <div className={styles.title}>Join Our Newsletter</div>
        //       <div className={styles.inputWrapper}>
        //         <input
        //           className={styles.input}
        //           type="text"
        //           placeholder="Enter Email..."
        //         />
        //         <div className={styles.inputButton}>Join</div>
        //       </div>
        //     </div>
        //   </div>
        //   <div className={styles.copyright}>
        //     <div style={{ borderTop: "1px solid white" }}>
        //       Terms Of services And Privacy Policy © Publishers 2022
        //     </div>
        //   </div>
        // </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
