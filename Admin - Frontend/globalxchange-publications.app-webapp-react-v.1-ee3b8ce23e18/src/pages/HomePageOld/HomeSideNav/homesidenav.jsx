import React from "react";
import "./homesidenav.scss";
import { ImagesCS } from "../../../assets/0a-exporter";
import { useNavigate } from "react-router-dom";

function Sidenav({ sidedisp, setsidedisp, closeicon, setcloseicon }) {
  const navigate = useNavigate();
  return (
    <div className="sidebar" style={{ display: sidedisp }}>
      <div className="sideimg" onClick={() => navigate("/")}>
        <img src={ImagesCS.sideico} alt="sideico" className="thesideicon" />
        <p className="sidetext">CryptoStartup's</p>
        <img
          src={ImagesCS.closeimg}
          alt="closeicon"
          className="theclosee"
          onClick={() => setsidedisp("none")}
        />
      </div>
      <div className="thebuttons">
        <button className="logbtn">Log in</button>
        <button className="signbtn">Sign Up</button>
      </div>
      <div>
        <div className="sidemenu">
          <img
            src={ImagesCS.rightarrowico}
            alt="right-arrow"
            className="thearrowright"
          />
          <p className="menutxt">Menu</p>
        </div>
        <div className="sidemenu">
          <img
            src={ImagesCS.rightarrowico}
            alt="right-arrow"
            className="thearrowright"
          />
          <p className="menutxt">Search</p>
        </div>
        <div className="sidemenu">
          <img
            src={ImagesCS.rightarrowico}
            alt="right-arrow"
            className="thearrowright"
          />
          <p className="menutxt">About</p>
        </div>
      </div>
      <div className="buttonapps">
        <button className="appdata">App</button>
        <button className="appdata">Email</button>
        <button className="appdata">Discuss</button>
        <button className="appdata">Podcast</button>
      </div>
      <div className="socialapps">
        <img
          src={ImagesCS.twitterico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.facebookico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.instaico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.discordico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.socialico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.linkedinico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.telegramico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.podcastico}
          alt="twitterico"
          className="theappsocial"
        />
        <img
          src={ImagesCS.youtubeico}
          alt="twitterico"
          className="theappsocial"
        />
      </div>
    </div>
  );
}

export default Sidenav;
