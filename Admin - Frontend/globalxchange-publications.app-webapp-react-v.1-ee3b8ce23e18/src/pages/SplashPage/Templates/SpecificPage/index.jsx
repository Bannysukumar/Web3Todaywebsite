import React, { useContext, useEffect, useRef, useState } from "react";
import "./specific.scss";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import SplashHeader from "../../../../globalComponents/SplashHeader";
import BusinessOverview from "./BusinessOverview";
import { GlobalContex } from "../../../../globalContex";

import searchIcon from "../../../../static/images/icons/searchIcon.svg";

import businessOverview from "../../../../static/images/templateIcons/businessOverview.svg";
import revenueModels from "../../../../static/images/templateIcons/revenueModels.svg";
import technology from "../../../../static/images/templateIcons/technology.svg";
import coreGxProducts from "../../../../static/images/templateIcons/coreGxProducts.svg";
import marketsversePlugin from "../../../../static/images/templateIcons/marketsversePlugin.svg";
import caseStudy from "../../../../static/images/templateIcons/caseStudy.svg";
import deployment from "../../../../static/images/templateIcons/deployment.svg";
import pricing from "../../../../static/images/templateIcons/pricing.svg";

const SpecificPage = () => {
  const {
    selectedTemplate,
    setSelectedTemplate,
    templateList,
    selectedTemplateMenu,
    setSelectedTemplateMenu,
  } = useContext(GlobalContex);
  const { id } = useParams();
  const idRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuQuery, setMenuQuery] = useState("");
  const [subPath, setSubPath] = useState("");

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
    setSelectedTemplate(templateList.find((o) => o.name.toLowerCase() === id));
  }, [id]);

  useEffect(() => {
    if (pathname) {
      var temp = pathname.lastIndexOf("/");
      var result = pathname.substring(temp + 1);
      console.log(result, "kwjbedkwjebss");
      if (!templateMenu.find((o) => o.id === result)) {
        setSelectedTemplateMenu(templateMenu[0]);
        navigate(templateMenu[0].id);
      }
    }
  }, [pathname]);

  return (
    <div>
      <SplashHeader />
      <div className="templateGrid">
        <div className="leftSection">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={selectedTemplate?.logo} alt="" />
            <div className="templateTitle">{selectedTemplate?.name}</div>
          </div>
          <div className="searchDiv">
            <img src={searchIcon} alt="" />
            <input
              value={menuQuery}
              onChange={(e) => setMenuQuery(e.target.value)}
              type="text"
              className="searchInput"
              placeholder="Search Sections"
            />
          </div>

          <div
            className="templateMenuWrapper"
            style={{ height: window.innerHeight - 320 }}
          >
            {templateMenu
              .filter((item) => {
                const lowquery = menuQuery.toLowerCase();
                return item.name.toLowerCase().indexOf(lowquery) >= 0;
              })
              .map((item, index) => {
                return (
                  //   <a href={`#${item.id}`} onClick={(e) => e.preventDefault()}>
                  <>
                    <div
                      onClick={(e) => {
                        setSelectedTemplateMenu(item);
                        navigate(item.id);
                      }}
                      className="templateMenuItem"
                      key={index}
                    >
                      <img src={item.icon} alt="" />
                      <div
                        style={{
                          paddingLeft: "13px",
                          fontWeight:
                            selectedTemplateMenu?.name === item?.name
                              ? 700
                              : "",
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    {selectedTemplateMenu?.name === "Technology" &&
                    item.name === "Technology" ? (
                      <div className="subMenu">
                        <div>Web</div>
                        <div>Mobile</div>
                        <div>Backend</div>
                        <div>Hosting</div>
                        <div>Security</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>

                  //   </a>
                );
              })}
          </div>
        </div>
        <div className="rightSection">
          <Outlet />
        </div>
      </div>
      {/* <div>This is a Template Page for {id}</div>
      <BusinessOverview /> */}
    </div>
  );
};

export default SpecificPage;
