import React from "react";
import classNames from "./wapp.module.scss";

//components
import Nav from "../../component/Nav";
import Crypto from "./Crypto";

const WappPage = () => {
  return (
    <div className={classNames.wappPage}>
      <Nav />
      <div className={classNames.wappTableContainer}>
        <Crypto />
      </div>
    </div>
  );
};

export default WappPage;
