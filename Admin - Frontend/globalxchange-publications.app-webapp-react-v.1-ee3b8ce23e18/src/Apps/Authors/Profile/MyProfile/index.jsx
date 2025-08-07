import React, { useContext, useEffect, useState } from "react";
import "./myProfile.scss";
import { GlobalContex } from "../../../../globalContex";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import defaultImg from "../../../../static/images/icons/defaultImg.svg";
// import ProfileSubDrawer from "./ProfileSubDrawer";
import ActionIndex from "./ProfileSubDrawer/ActionIndex";
import EditActionIndex from "./ProfileSubDrawer/EditActionIndex";
// import { Typography } from "antd";
import axios from "axios";

const MyProfile = () => {
  // const { Paragraph } = Typography;
  const {
    selectedPublication,
    showSubDraw,
    setShowSubDraw,
    bankerEmail,
    StorySubDrawer,
    setStorySubDrawer,
    profileSubDrawer,
    setAllPublications,
    setSelectedPublication,
    setProfileSubDrawer,
    refechProfile,
    setRefechProfile,
  } = useContext(GlobalContex);
  const [allApps, setAllApps] = useState([]);
  const [allApps1, setAllApps1] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [showDrawer, SetShowDrawer] = useState(false);
  const [showEditDrawer, SetShowEditDrawer] = useState(false);
  const [ActionBtn, setActionBtn] = useState("");

  // console.log("click", profileSubDrawer)

  // console.log(selectedPublication._id, "selectedPublication");
  useEffect(() => {
    let authorData;
    setAppLoading(true);
    let pubdata;
    if (!selectedPublication) {
      pubdata = "63a1a2c60e46260e093cf260";
    } else {
      pubdata = selectedPublication._id;
    }
    axios
      .get(
        `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}?publication_id=638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAppLoading(false);
        // console.log(data.status.toString(), "false", "data-publishers");
        console.log("data", bankerEmail, pubdata);
        if (
          data.status.toString() === "false" &&
          data.data.toString() === "publisher not found"
        ) {
          setAllApps([
            {
              type: "Creator",
              status: "Not Created",
              addedToThisPublication: "No",
              button: "Create",
            },
          ]);
        } else if (
          data.status.toString() === "false" ||
          data.data.length === 0
        ) {
          setAllApps([
            {
              type: "Creator",
              status: "Created",
              addedToThisPublication: "No",
              button: "Join",
            },
          ]);
        } else {
          setAllApps([
            {
              type: "Creator",
              status: "Created",
              addedToThisPublication: "Yes",
              button: "Actions",
            },
          ]);
        }
      })
      .catch((err) => {
        setAppLoading(false);
        console.log(err, "err");
      });
    // setData(prevData => [...prevData, newData]);
    axios
      .get(
        `https://publications.apimachine.com/userpublication?email=${bankerEmail}&publication_id=638dd769b257b3715a8fbe07`
      )
      .then(({ data }) => {
        setAppLoading(false);
        if (data.status) {
          setAllApps1([
            {
              type: "User",
              status: "Created",
              addedToThisPublication: "Yes",
              button: "Redirect",
            },
          ]);
        } else {
          if (
            data.status.toString() === "false" &&
            data.message.toString() === "User does not exist"
          ) {
            setAllApps1([
              {
                type: "User",
                status: "Not Created",
                addedToThisPublication: "No",
                button: "Redirect",
              },
            ]);
          } else {
            setAllApps1([
              {
                type: "User",
                status: "Created",
                addedToThisPublication: "No",
                button: "Redirect",
              },
            ]);
          }
        }

        // console.log("data", [allApps, { type: "User", status: "Created", addedToThisPublication: "Yes", button: "Redirect" }]);
      })
      .catch((err) => {
        setAppLoading(false);
        console.log(err, "err");
      });
  }, [bankerEmail, selectedPublication, refechProfile]);

  const openAction = (item) => {
    if (item === "Create") {
      SetShowDrawer(true);
    } else if (item === "Redirect") {
      window.open("http://web3today.io", "_blank");
    } else if (item === "Join") {
      AddPublisher();
    } else if (item === "Actions") {
      console.log("Actions");
      SetShowEditDrawer(true);
    } else {
      SetShowDrawer(false);
    }
  };

  const AddPublisher = async () => {
    console.log("AddPublisher");
    let PublisherDetail = await axios.get(
      `https://publications.apimachine.com/publisher?email=${bankerEmail}`
    );
    if (PublisherDetail) {
      let PublisherId = PublisherDetail.data.data[0]._id;
      let body = {
        publication_id: "638dd769b257b3715a8fbe07",
        publisher_id: [PublisherId],
      };
      console.log(body, "body");
      let AddPublisher = await axios.post(
        `https://publications.apimachine.com/publication/add/publisher`,
        body
      );
      if (AddPublisher) {
        setRefechProfile(!refechProfile);
        axios
          .get(
            `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
          )
          .then(({ data }) => {
            setAllPublications(data?.data[0]?.PublicationDetails);
            setSelectedPublication(
              data?.data[0]?.PublicationDetails[0]?.PublicationDetail[0]
            );
          });
      }
    }
  };

  const conditionalResposiveView = (
    data,
    data1,
    dataLoading,
    desktopDataGrid,
    mobileDataGrid
  ) => {
    // console.log(data, data1, "Detailss")
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
            {!dataLoading ? (
              data?.length > 0 && data1.length > 0 ? (
                data1
                  .map((item) => {
                    return contentSection(
                      item,
                      "listDataGrid",
                      desktopDataGrid
                    );
                  })
                  .concat(
                    data.map((item) => {
                      return contentSection(
                        item,
                        "listDataGrid",
                        desktopDataGrid
                      );
                    })
                  )
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  No Data Found
                </div>
              )
            ) : (
              loadingSection("listDataGrid", desktopDataGrid)
            )}
            {/* <ArticlesSubDrawer
                  selectedArticle={selectedArticle}
                  setSelectedArticle={setSelectedArticle}
                /> */}
            <ActionIndex
              showDrawer={showDrawer}
              SetShowDrawer={SetShowDrawer}
              refechProfile={refechProfile}
              setRefechProfile={setRefechProfile}
            />
            <EditActionIndex
              showEditDrawer={showEditDrawer}
              SetShowEditDrawer={SetShowEditDrawer}
              refechProfile={refechProfile}
              setRefechProfile={setRefechProfile}
            />
          </div>
        </div>

        <div className="mobileWrapper">
          {!showSubDraw ? (
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              {headerSection("listGridMobile", mobileDataGrid)}

              {!appLoading ? (
                allApps?.length > 0 ? (
                  allApps.map((item, index) => {
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
              <ActionIndex
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                refechProfile={refechProfile}
                setRefechProfile={setRefechProfile}
              />
              <EditActionIndex
                showEditDrawer={showEditDrawer}
                SetShowEditDrawer={SetShowEditDrawer}
                refechProfile={refechProfile}
                setRefechProfile={setRefechProfile}
              />
            </div>
          ) : (
            <>
              <ActionIndex
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                refechProfile={refechProfile}
                setRefechProfile={setRefechProfile}
              />
              <EditActionIndex
                showEditDrawer={showEditDrawer}
                SetShowEditDrawer={SetShowEditDrawer}
                refechProfile={refechProfile}
                setRefechProfile={setRefechProfile}
              />
            </>
          )}
        </div>
      </>
    );
  };

  // Change these three Sections according to the design

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Type</div>
        <div style={{ textAlign: "left" }}>Status</div>
        <div style={{ textAlign: "left" }}>Added To This Publicaiton</div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <div className="title">{item?.type}</div>
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
          {/* <img
                        src={defaultImg}
                        alt=""
                        style={{
                            width: "30px",
                            height: "30px",
                        }}
                    /> */}
          <div>
            <div className="title">{item?.status}</div>
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
            <div className="title">{item?.addedToThisPublication}</div>
            {/* <div className="subtitle">{item?.date}</div> */}
            {/* <div className="subtitle">{item?.email}</div> */}
          </div>
        </div>
        <div className="btngrp">
          <button
            className="actionbtn"
            onClick={() => openAction(item?.button)}
          >
            {item?.button}
          </button>
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
          </div>
        );
      });
  };

  return (
    <>
      {conditionalResposiveView(
        allApps,
        allApps1,
        appLoading,
        "2.5fr 2fr 2fr 1fr", // Desktop view Grid columns
        "350px 250px 250px" // Mobile view Grid columns
      )}
    </>
  );
};

export default MyProfile;
