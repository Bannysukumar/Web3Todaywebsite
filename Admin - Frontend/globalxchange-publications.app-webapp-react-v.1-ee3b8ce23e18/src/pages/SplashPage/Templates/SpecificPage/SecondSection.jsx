import React, { useContext, useEffect } from "react";

import businessOverview from "../../../../static/images/templateIcons/businessOverview.svg";
import revenueModels from "../../../../static/images/templateIcons/revenueModels.svg";
import technology from "../../../../static/images/templateIcons/technology.svg";
import coreGxProducts from "../../../../static/images/templateIcons/coreGxProducts.svg";
import marketsversePlugin from "../../../../static/images/templateIcons/marketsversePlugin.svg";
import caseStudy from "../../../../static/images/templateIcons/caseStudy.svg";
import deployment from "../../../../static/images/templateIcons/deployment.svg";
import pricing from "../../../../static/images/templateIcons/pricing.svg";
import { useLocation } from "react-router-dom";
import { GlobalContex } from "../../../../globalContex";

const SecondSection = () => {
  const { pathname } = useLocation();
  const { selectedTemplateMenu, setSelectedTemplateMenu } =
    useContext(GlobalContex);

  const templateMenu = [
    {
      icon: businessOverview,
      name: "Business Overview",
      id: "businessOverview",
    },
    {
      icon: revenueModels,
      name: "Revenue Models",
      id: "revenueModels",
    },
    {
      icon: technology,
      name: "Technology",
      id: "technology",
    },
    {
      icon: coreGxProducts,
      name: "Core GX Products",
      id: "coregxproducts",
    },
    {
      icon: marketsversePlugin,
      name: "Marketsverse Plugins",
      id: "marketsverse",
    },
    {
      icon: caseStudy,
      name: "Case Studies",
      id: "caseStudies",
    },
    {
      icon: deployment,
      name: "Deployment",
      id: "deployment",
    },
    {
      icon: pricing,
      name: "Pricing",
      id: "pricing",
    },
  ];

  useEffect(() => {
    var temp = pathname.lastIndexOf("/");
    var result = pathname.substring(temp + 1);

    if (pathname) {
      if (templateMenu.find((o) => o.id === result)) {
        document
          .getElementById(`${result}`)
          .scrollIntoView({ behavior: "smooth" });
      }
      setSelectedTemplateMenu(templateMenu.find((o) => o.id === result));
    }
  }, [pathname]);

  return (
    <div>
      {templateMenu?.map((item) => {
        return (
          <div className="eachSection" id={item.id}>
            <div className="title">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SecondSection;
