import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GlobalContex } from "../../../../globalContex";
import Skeleton from "react-loading-skeleton";

import defaultImg from "../../../../static/images/icons/app_placeholder.png";
// import BrandsSubDrawer from "./BrandsSubDrawer";
import "./dashboardFieldGroups.scss";
import FieldGroupSubDrawer from "./GroupFieldSubDrawer";

const DashboardGroupFields = () => {
  const {
    loginData,
    bankerEmail,
    selectedMcbDashboardBrand,
    setSelectedMcbDashboardBrand,
    setShowSubDraw,
    showSubDraw,
    refetchAppData,
    refetchFieldGroupData,
    setSelectedFieldGroup,
  } = useContext(GlobalContex);

  const [allGroupFields, setAllGroupFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // useEffect(() => {
  //   setAppLoading(true);
  //   axios
  //     .get(
  //       `https://comms.globalxchange.io/gxb/apps/get?created_by=${bankerEmail}`
  //     )
  //     .then((res) => {
  //       setAllApps(res.data.apps);
  //     });

  //   axios
  //     .get(
  //       `https://comms.globalxchange.io/coin/vault/service/holdings/per/app/get?created_by=${bankerEmail}`
  //     )
  //     .then((res) => {
  //       if (res.data.status) {
  //         setAllApps1(res.data.apps);
  //         setAppLoading(false);
  //       } else {
  //         setAppLoading(false);
  //       }
  //     });
  // }, [bankerEmail, refetchAppData]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://comms.globalxchange.io/gxb/apps/fields/profile/get`)
      .then(({ data }) => {
        setAllGroupFields(data?.appFields);
        setLoading(false);
      });
  }, [bankerEmail, refetchFieldGroupData]);

  const conditionalResposiveView = (
    data,
    dataLoading,
    desktopDataGrid,
    mobileDataGrid
  ) => {
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
              data?.length > 0 ? (
                data.map((item) => {
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
            <FieldGroupSubDrawer allGroupFields={allGroupFields} />
          </div>
        </div>

        <div className="mobileWrapper">
          {!showSubDraw ? (
            <div style={{ overflowY: "scroll", height: "80vh" }}>
              {headerSection("listGridMobile", mobileDataGrid)}

              {!dataLoading ? (
                data?.length > 0 ? (
                  data.map((item, index) => {
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
              <FieldGroupSubDrawer allGroupFields={allGroupFields} />
            </div>
          ) : (
            <FieldGroupSubDrawer allGroupFields={allGroupFields} />
          )}
        </div>
      </>
    );
  };

  // Change these three Sections according to the design

  const headerSection = (gridClass, gridValues) => {
    return (
      <div className={gridClass} style={{ gridTemplateColumns: gridValues }}>
        <div>Group</div>
        <div style={{ textAlign: "left" }}>Collection</div>
        <div>Field</div>
        <div></div>
      </div>
    );
  };

  const contentSection = (item, gridClass, gridValues) => {
    return (
      <div
        onClick={(e) => {
          setSelectedFieldGroup(item);
          setShowSubDraw(true);
        }}
        className={gridClass}
        style={{
          gridTemplateColumns: gridValues,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.field_icon ? item.field_icon : defaultImg}
            alt=""
            style={{
              // borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
            // className={classNames.icon}
          />
          <div style={{ paddingLeft: "15px" }}>
            <div className="title">{item?.name} &nbsp;</div>
            <div className="subtitle">{item?.field_key}</div>
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
          <div style={{ textAlign: "left" }}>
            <div className="title">{item?.key_group}</div>
            <div className="subtitle">{item?.group_id}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div className="title">{item?.field_type}</div>
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
              // height: "120px",
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
                justifyContent: "flex-end",
              }}
            >
              <div className="userDetail">
                <Skeleton width={100} />
                {/* <Skeleton width={120} style={{ height: "10px" }} /> */}
              </div>
            </div>
            <div>&nbsp;</div>
          </div>
        );
      });
  };

  return (
    <>
      {conditionalResposiveView(
        allGroupFields,
        loading,
        "2fr 1fr 1fr 0.1fr", // Desktop view Grid columns
        "250px 250px 200px 100px 200px" // Mobile view Grid columns
      )}
      {/* <div className="desktopWrapper">
        <div style={{ width: "100%" }}>
          <div
            className="listGrid"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 0.1fr" }}
          >
            <div>Group</div>
            <div style={{ textAlign: "left" }}>Field Group</div>
            <div>Type</div>
            <div></div>
          </div>
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
            allGroupFields?.length > 0 ? (
              allGroupFields.map((item) => {
                return (
                  <div
                    onClick={(e) => {
                      setSelectedFieldGroup(item);
                      setShowSubDraw(true);
                    }}
                    className="listDataGrid"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1fr 0.1fr",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.field_icon ? item.field_icon : defaultImg}
                        alt=""
                        style={{
                          // borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                        // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">{item?.name} &nbsp;</div>
                        <div className="subtitle">{item?.field_key}</div>
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
                      <div style={{ textAlign: "left" }}>
                        <div className="title">{item?.key_group}</div>
                        <div className="subtitle">{item?.group_id}</div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <div className="title">{item?.field_type}</div>
                      </div>
                    </div>
                  </div>
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
            Array(10)
              .fill("")
              .map((item, i) => {
                return (
                  <div
                    className="listDataGrid post"
                    style={{
                      width: "100%",
                      // height: "120px",
                      gridTemplateColumns: "2fr 1fr 1fr 0.1fr",
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
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="userDetail">
                        <Skeleton width={100} />
                        
                      </div>
                    </div>
                    <div>&nbsp;</div>
                  </div>
                );
              })
          )}
         
        </div>
      </div>
      <div className="dashboardBrandsMobile">
        <div style={{ overflowY: "scroll", height: "80vh" }}>
          <div
            className="listGridMobile"
            style={{
              gridTemplateColumns: "300px 200px 200px 50px",
            }}
          >
            <div>Group</div>
            <div style={{ textAlign: "left" }}>Field Group</div>
            <div>Type</div>
            <div></div>
          </div>
          {!loading ? (
            allGroupFields?.length > 0 ? (
              allGroupFields.map((item) => {
                return (
                  <div
                    onClick={(e) => {
                      setSelectedFieldGroup(item);
                      setShowSubDraw(true);
                    }}
                    className="listDataGridMobile"
                    style={{
                      gridTemplateColumns: "300px 200px 200px 50px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.field_icon ? item.field_icon : defaultImg}
                        alt=""
                        style={{
                          // borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                        // className={classNames.icon}
                      />
                      <div style={{ paddingLeft: "15px" }}>
                        <div className="title">{item?.name} &nbsp;</div>
                        <div className="subtitle">{item?.field_key}</div>
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
                      <div style={{ textAlign: "left" }}>
                        <div className="title">{item?.key_group}</div>
                       
                        <div className="subtitle">{item?.group_id}</div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <div className="title">{item?.field_type}</div>
                      </div>
                    </div>
                  </div>
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
            Array(10)
              .fill("")
              .map((item, i) => {
                return (
                  <div
                    className="listDataGridMobile"
                    style={{
                      gridTemplateColumns: "300px 200px 300px 50px",
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
                      <div className="userDetail">
                        <Skeleton width={100} />
                        <Skeleton width={120} style={{ height: "10px" }} />
                      </div>
                    </div>

                    <div className="userDetail">
                      <Skeleton width={100} />
                      
                    </div>
                    <div>&nbsp;</div>
                  </div>
                );
              })
          )}
        </div>
      </div> */}
    </>
  );
};

export default DashboardGroupFields;
