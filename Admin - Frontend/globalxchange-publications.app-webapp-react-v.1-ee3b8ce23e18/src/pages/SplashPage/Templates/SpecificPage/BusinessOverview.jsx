import React from "react";
import { Outlet } from "react-router-dom";

const BusinessOverview = () => {
  return (
    <>
      <div>Business Overview</div>
      <Outlet />
    </>
  );
};

export default BusinessOverview;
