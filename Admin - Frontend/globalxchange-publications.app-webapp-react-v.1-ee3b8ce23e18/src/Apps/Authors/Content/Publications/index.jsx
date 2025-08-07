import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

// import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import defaultImg from "../../../../static/images/icons/defaultImg.svg";
import copyIcon from "../../../../static/images/icons/copy.svg";
import AppsSubDrawer from "./PublicationsSubDrawer";
import "./dashboardApps.scss";
import { Typography } from "antd";
import PublicationsSubDrawer from "./PublicationsSubDrawer";

const Publications = () => {
  const { Paragraph } = Typography;
  const {
    loginData,
    bankerEmail,
    selectedMcbDashboardApp,
    setSelectedMcbDashboardApp,
    showSubDraw,
    setShowSubDraw,
    refetchAppData,
    setSelectedTab,
    mcbMenu,
    isMobile,
    refetchData,
    setRefetchData,
    allPublications,
    setAllPublications,
    selectedPublication,
    setSelectedPublication,
  } = useContext(GlobalContex);
  // const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [selectedPublication, setSelectedPublication] = useState(null);
  const [userSelectedPublication, setUserSelectedPublication] = useState(null);
  const [authorPublication , setAuthorPublication] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(
      `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
    )
      .then(({ data }) => {
        console.log("All-Publications-author", data.data);
        if(data.status && data.data.length > 0){
        setAuthorPublication(data.data);
        }else{
          setAuthorPublication([]);
        }
        // setSelectedPublication(data.data[0]);
        setLoading(false);
      }
      );
  }, [bankerEmail]);


  const conditionalResposiveView = (
    data,
    dataLoading,
    desktopDataGrid,
    mobileDataGrid
  ) => {

    // console.log("All-Publications-Data", JSON.stringify(allPublications));

    // https://publications.apimachine.com/application/publisher/detail/shorupan@gmail.com


    return (
      <>
        <div className="desktopWrapper">
          <div style={{ width: "100%" }}>
            {headerSection("listGrid", desktopDataGrid)}
          </div>
          <div
            style={{
              // display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              height: window.innerHeight - 175,
              overflowY: "scroll",
            }}
          >
            {!loading ? (
              authorPublication?.length > 0 ? (
                authorPublication.map((item) => {
                  return contentSection(item, "listDataGrid", desktopDataGrid);
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  No Records Found
                </div>
              )
            ) : (
              loadingSection("listDataGrid", desktopDataGrid)
            )}
            <PublicationsSubDrawer
              userSelectedPublication={userSelectedPublication}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>

        <div className="mobileWrapper">
          {!showSubDraw ? (
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              {headerSection("listGridMobile", mobileDataGrid)}

              {!loading ? (
                authorPublication?.length > 0 ? (
                  authorPublication.map((item, index) => {
                    return contentSection(
                      item,
                      "listDataGridMobile",
                      mobileDataGrid
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60vh",
                    }}
                  >
                    No Records Found
                  </div>
                )
              ) : (
                loadingSection("listDataGrid", mobileDataGrid)
              )}
              <PublicationsSubDrawer
                selectedPublication={selectedPublication}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          ) : (
            <PublicationsSubDrawer
              selectedPublication={selectedPublication}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </div>
      </>
    );
  };

  // return (
  //   <p>sample data</p>
  // )
  // };

  // Change these three Sections according to the design

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Name</div>
        {/* <div style={{ textAlign: "left" }}>Founder</div> */}
        <div style={{ textAlign: "left" }}>App Code</div>
        <div style={{ textAlign: "left" }}>Users</div>
        <div style={{ textAlign: "left" }}>Holdings</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    console.log("item-item", item);
    return (
      <div
        onClick={(e) => {
          setUserSelectedPublication(item);
          setShowSubDraw(true);
        }}
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.PublicationDetails ? item.PublicationDetails[0].PublicationDetail[0].profile_pic : defaultImg}
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph copyable={{ text: item.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0].name : "--" }}>{item.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0].name : "--"}</Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?._id }}>
                {item?._id?.substring(0, 10)}...{" "}
              </Paragraph>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={
              item?.FounderDetails
                ? item?.PublicationDetail ? item?.PublicationDetail[0].profile_pic : item?.FounderDetails[0]?.FounderDetails[0].profile_pic
                : defaultImg
            }
            alt=""
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph
                copyable={{
                  text: item?.FounderDetails
                    ? item?.FounderDetails[0]?.FounderDetails[0].name
                    : "--",
                }}
              >
                {item?.FounderDetails
                  ? item?.PublicationDetail ? item?.PublicationDetail[0].name : item?.FounderDetails[0]?.FounderDetails[0].name
                  : "--"}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item.email }}>
                {item.email}
              </Paragraph>
            </div>
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={item?.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0]?.app_code[2]?.app_icon : defaultImg}
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
          // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">
              <Paragraph copyable={{ text: item?.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0]?.app_code[0]?.app_name : "--" }}>
                {item?.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0].app_code[0]?.app_name : "--"}
              </Paragraph>
            </div>
            <div className="subtitle">
              <Paragraph copyable={{ text: item?.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0]?.app_code[1]?.app_code : "--" }}>
                {item?.PublicationDetails ? item?.PublicationDetails[0]?.PublicationDetail[0]?.app_code[1]?.app_code : "--"}
              </Paragraph>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div className="title">
              <Paragraph copyable={{ text: "--" }}>--</Paragraph>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ paddingLeft: "15px", textAlign: "center" }}>
            <div className="title">
              <Paragraph copyable={{ text: "--" }}>--</Paragraph>
            </div>
            {/* <div className="subtitle">{item?.date}</div> */}
          </div>
        </div>
      </div>
    );
  };

  const loadingSection = (gridClass, gridValues) => {
    return Array(10)
      .fill("")
      .map((item, i) => {
        return (
          <div
            className={gridClass}
            style={{
              width: "100%",
              gridTemplateColumns: gridValues,
              // borderBottom: "solid 0.5px #EEEEEE",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                className="dp"
                circle
                width={50}
                height={50}
                style={{ marginRight: "20px" }}
              />
              <div className="userDetail">
                <Skeleton width={100} />
                <Skeleton width={120} style={{ height: "10px" }} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Skeleton
                className="dp"
                circle
                width={50}
                height={50}
                style={{ marginRight: "20px" }}
              />
              <div className="userDetail">
                <Skeleton width={100} />
                <Skeleton width={120} style={{ height: "10px" }} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="userDetail">
                <Skeleton width={100} />
                <Skeleton width={120} style={{ height: "10px" }} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="userDetail">
                <Skeleton width={100} />
                <Skeleton width={120} style={{ height: "10px" }} />
              </div>
            </div>

            <div className="userDetail">
              <Skeleton width={100} />
              <Skeleton width={120} style={{ height: "10px" }} />
            </div>
          </div>
        );
      });
  };

  return (
    <>
      {conditionalResposiveView(
        authorPublication,
        loading,
        "1.5fr 1.2fr 1fr 1fr", // Desktop view Grid columns
        "250px 200px 100px 200px" // Mobile view Grid columns
      )}
    </>
  );
};

export default Publications;
