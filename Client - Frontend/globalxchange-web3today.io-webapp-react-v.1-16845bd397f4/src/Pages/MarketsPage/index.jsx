import React, { useEffect, useContext } from "react";
import Nav from "../../component/Nav";
import { useLocation } from "react-router-dom";
import { GlobalContex } from "../../globalContext";
import Crypto from "./Crypto";
import Forex from "./Forex";

const MarketsPage = () => {
  const { pathname } = useLocation();

  const { selectedSubNav, setSelectedSubNav, loginData } =
    useContext(GlobalContex);

  useEffect(() => {
    conditionalBody();
  }, [pathname]);

  const conditionalBody = () => {
    if (pathname === "/markets/crypto") {
      return <Crypto />;
    } else if (pathname === "/markets/forex") {
      return <Forex />;
    }
    // else if (pathname === "/markets/regulation") {
    //   return <div>Markets - Regulation</div>;
    // } else if (pathname === "/markets/people") {
    //   return <div>Markets - People</div>;
    // } else if (pathname === "/markets/research") {
    //   return <div>Markets - Research</div>;
    // } else if (pathname === "/markets/events") {
    //   return <div>Markets - Events</div>;
    // }
    else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          coming Soon
        </div>
      );
    }
  };

  return (
    <div>
      <Nav />
      {conditionalBody()}
    </div>
  );
};

export default MarketsPage;
