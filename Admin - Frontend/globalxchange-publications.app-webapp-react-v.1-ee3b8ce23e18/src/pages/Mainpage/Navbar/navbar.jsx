import React from "react";
import "./navbar.scss";
import barsImg from "../../../assets/NavImages/barss.svg";
import searchImg from "../../../assets/NavImages/thesearch.svg";
import globeImg from "../../../assets/NavImages/thepin.svg";
import Web3ICON from "../../../assets/NavImages/web3logoo.svg";
import googleplay from "../../../assets/NavImages/googleplay.svg";
import appleico from "../../../assets/NavImages/appleico.svg";
import web3full from "../../../assets/NavImages/web3full.svg";

function Navbar({ collapsemenu, setcollapsemenu }) {
  const navdata12 = [
    {
      icon: barsImg,
      name: "Menu",
    },
    {
      icon: searchImg,
      name: "Search",
    },
    {
      icon: globeImg,
      name: "EN",
    },
  ];

  const openmenu = (e) => {
    console.log("the-id ", e.currentTarget.id);
  };
  return (
    <>
      <div>
        <div className="top-bg">
          <p className="top-text">
            Conducting operations with non-deliverable over-the-counter
            instruments does not entail the transfer of ownership and other
            rights to the underlying assets, is a risky activity and can bring
            not only profit but also losses. The size of the potential loss is
            limited to the size of the deposit. Past profits do not guarantee
            future profits.
          </p>
        </div>
        <br />
        <div className="thnavstart">
          <div className="mainnav12">
            <div className="thenav">
              <div
                className="navmbicon"
                id="Menu"
                onClick={() => setcollapsemenu(!collapsemenu)}
              >
                <img src={barsImg} alt="bars" className="thenavimg" />
              </div>
              {navdata12.map((e) => {
                return (
                  <div
                    className="navicons"
                    id={e.name}
                    onClick={() => setcollapsemenu(!collapsemenu)}
                  >
                    <img src={e.icon} alt="bars" className="thenavimg" />
                    &nbsp;
                    <p>{e.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="imgdisplay">
              <img src={Web3ICON} alt="web3icon" className="web3img" />
            </div>
            <div className="rightbtns">
              <button className="login-btn">Log In</button>
              <button className="trade-btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
