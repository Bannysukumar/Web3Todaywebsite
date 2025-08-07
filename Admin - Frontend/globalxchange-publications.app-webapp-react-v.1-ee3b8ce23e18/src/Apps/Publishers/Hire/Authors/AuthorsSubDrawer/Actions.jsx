import React, { useContext, useEffect, useState } from "react";

import back from "../../../../../static/images/icons/back.svg";
import close from "../../../../../static/images/icons/close1.svg";
import editPub from "../../../../../static/images/clipIcons/editPub.svg";
import userIcon from "../../../../../static/images/clipIcons/userIcon.svg";
import deletePub from "../../../../../static/images/clipIcons/delete.svg";
import bondIcon from "../../../../../static/images/clipIcons/bondIcon.svg";
import plusIcon from "../../../../../static/images/clipIcons/plus.svg";
import yesIcon from "../../../../../static/images/clipIcons/yes.svg";
import noIcon from "../../../../../static/images/clipIcons/no.svg";
// import defaultImg from "../../../../../static/images/icons/app_placeholder.png";
// import defaultImg from "../../../../static/images/icons/app_placeholder.png";
import defaultImg from "../../../../../static/images/icons/defaultImg.svg";
import lock from "../../../../../static/images/icons/lock.svg";

import changeBond from "../../../../../static/images/icons/changeBond.svg";
import okIcon from "../../../../../static/images/icons/tik.svg";
import backIcon from "../../../../../static/images/icons/backArrow.svg";

import { GlobalContex } from "../../../../../globalContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import Skeleton from "react-loading-skeleton";
import Scrollbars from "react-custom-scrollbars";

const Actions = ({
  allBonds,
  currenciesData,
  loading,
  setLoading,
  step,
  setStep,
  path,
  setPath,
  selectedArticle,
  setSelectedArticle
}) => {
  const navigate = useNavigate();
  const {
    showSubDraw,
    setShowSubDraw,
    actionsSubDrawer,
    selectedListItem,
    setSelectedListItem,
    bondSelected,
    setBondSelected,
    bankerEmail,
    loginData,
    refetchBonds,
    setRefetchBonds,
    selectedMcbDashboardApp,
    allPublications,
    setActionsSubDrawer,
    setRefetchAppData,
    selectedAuthor,
    selectedPublication,
    setSelectedAuthor
  } = useContext(GlobalContex);

  console.log(selectedPublication, "selectedPublication");

  const [bondStatus, setBondStatus] = useState("");
  const [search, setSearch] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsInPub, setAllAuthorsInPub] = useState([]);
  const [allAuthorsNotInPub, setAllAuthorsNotInPub] = useState([]);

  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    setStep("Action");
    setPath(["Action"]);
  }, [actionsSubDrawer]);

  const handleBackStep = () => {
    if (path.length > 1) {
      path.splice(-1);
      // console.log(tempPath, "kqjdkjwed");
      setPath([...path]);
      if (path.length > 0) {
        setStep(path[path.length - 1]);
      }
    }
  };

  const handleBreadcrumbClick = (clickedStep) => {
    const foundStepIndex = path.findIndex((o) => o === clickedStep);
    const tempPath = path;
    tempPath.splice(foundStepIndex + 1, tempPath.length);
    setPath([...tempPath]);
    console.log(path, "lwndwed");
  };

  useEffect(() => {
    setStep(path[path.length - 1]);
  }, [path]);

  const handleAddToPub = () => {
    setLoading(true);
    let body = {
      "publication_id": selectedPublication?._id,
      "publisher_id": [
        selectedAuthor?._id
      ]
    }
    axios
      .post(
        `https://publications.apimachine.com/publication/add/publisher`, body
      )
      .then(({ data }) => {
        if (data.status) {
          setStep("success");
          setTimeout(() => {
            setLoading(false);
            setPath([]);
            setStep("");
            setActionsSubDrawer(false);
            setRefetchAppData(true);
          }, 1000);
        }
      });
  };

  const fullHeightDrawer = (message) => {
    if (message) {
      return (
        <div
          style={{
            height: window.innerHeight - 123,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {message}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: window.innerHeight - 123,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
            }}
          >
            Updating Brand List...
          </div>
        </div>
      );
    }
  };

  // useEffect(() => {
  //   if (selectedPublication && selectedPublication !== null) {
  //     axios
  //       .all([
  //         axios.get(
  //           `https://publications.apimachine.com/application/notInPublication/${selectedPublication?._id}`
  //         ),
  //         axios.get(
  //           `https://publications.apimachine.com/application/publication/${selectedPublication?._id}`
  //         ),
  //       ])
  //       .then(
  //         axios.spread((...responses) => {
  //           const responseOne = responses[0];
  //           const responseTwo = responses[1];
  //           setAllAuthorsNotInPub(responseOne.data.data);
  //           setAllAuthorsInPub(responseTwo.data.data);
  //           // console.log(responseTwo.data.data);
  //         })
  //       )
  //       .catch((errors) => {
  //         console.log(errors);
  //       });
  //   }
  // }, [selectedPublication, refetchData]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://publications.apimachine.com/publisher/`)
  //     .then(({ data }) => {
  //       setAllAuthors(data.data);
  //       setLoading(false);
  //     });
  // }, [selectedPublication]);





  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(`Adding ${selectedAuthor?.name} "to" ${selectedPublication?.name} Publication`);

      case "success":
        return (
          <div
            className="assetDispText"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "60vh",
              padding: "0px 20px",
            }}
          >
            You have successfully added {selectedAuthor?.name} to {selectedPublication?.name}. You will now be redirected to your authors list .
            {/* Publisher Added/Removed successfully to {selectedPublication?.name}{" "}
            Publication */}
          </div>
        );

      case "Token Expired":
        return (
          <>
            <div className="sidebarTitle">Token Expired. Login Again.</div>
            <div
              className="sidebarCard"
              onClick={(e) => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <img src={lock} alt="" style={{ width: "20px" }} />
              <div style={{ paddingLeft: "10px" }}>Logout</div>
            </div>
          </>
        );

      case "Add To My Publication":
        return (
          <>
            <div className="sidebarTitle">
              What do you want to add {selectedAuthor?.name} to {selectedPublication?.name}?
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("loading");
                setPath([...path, "loading"]);
                handleAddToPub();
              }}
            >
              {/* <img
                src={yesIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Yes</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("");
                setPath(["Action"]);
              }}
            >
              {/* <img
                src={noIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Never Mind</div>
            </div>
          </>
        );
      // case "Add To Publication":
      //   return (
      //     <>
      //       <div className="sidebarTitle" style={{ paddingTop: "0px" }}>
      //         Select Authors to Add
      //       </div>
      //       <div
      //         className="newConglomerate"
      //         style={{
      //           paddingBottom: "0px",
      //           padding: "0px",
      //           height: window.innerHeight - 420,
      //         }}
      //       >
      //         <div className="searchWrap">
      //           <input
      //             value={search}
      //             onChange={(e) => setSearch(e.target.value)}
      //             type="text"
      //             placeholder="Search Publication....|"
      //           />
      //         </div>
      //         <Scrollbars className="searchList">
      //           {loading
      //             ? Array(6)
      //                 .fill("")
      //                 .map((_, i) => (
      //                   <div className="user" key={i}>
      //                     <Skeleton className="dp" circle />
      //                     <div className="userDetail">
      //                       <Skeleton className="name" width={200} />
      //                       <Skeleton className="email" width={200} />
      //                     </div>
      //                   </div>
      //                 ))
      //             : allAuthorsNotInPub
      //                 ?.filter((o) =>
      //                   o.name?.toLowerCase().includes(search.toLowerCase())
      //                 )
      //                 ?.map((item) => (
      //                   <div
      //                     className="user"
      //                     style={{
      //                       backgroundColor: selectedAuthors.find(
      //                         (o) => o.name === item.name
      //                       )
      //                         ? "whitesmoke"
      //                         : "#fff",
      //                     }}
      //                     key={item._id}
      //                     onClick={() => {
      //                       if (
      //                         selectedAuthors.find((o) => o.name === item.name)
      //                       ) {
      //                         setSelectedAuthors(
      //                           selectedAuthors.filter(
      //                             (o) => o.name !== item.name
      //                           )
      //                         );
      //                       } else {
      //                         setSelectedAuthors([...selectedAuthors, item]);
      //                       }
      //                     }}
      //                   >
      //                     <img
      //                       className="dp"
      //                       src={
      //                         item?.profile_pic ? item?.profile_pic : defaultImg
      //                       }
      //                       alt=""
      //                     />
      //                     <div className="userDetail">
      //                       <div className="name">{item?.name}</div>
      //                       <div className="email">
      //                         {item?._id?.substring(0, 10)}...
      //                       </div>
      //                     </div>
      //                   </div>
      //                 ))}
      //           <div className="space"></div>
      //         </Scrollbars>
      //       </div>
      //       <div className="ftBtns">
      //         <div className="newField" onClick={() => handleBackStep()}>
      //           Go Back
      //         </div>
      //         <div className="btnSubmit" onClick={() => handleAddAuthorToPub()}>
      //           Submit
      //         </div>
      //       </div>

      //       {/* <div
      //           className="sidebarCard"
      //           onClick={() => {
      //             setStep("loading");
      //             setPath([...path, "loading"]);
      //             handleDeleteAuthor();
      //           }}
      //         >
      //           <img
      //             src={yesIcon}
      //             alt=""
      //             className="coin"
      //             style={{ width: "25px", height: "25px" }}
      //           />
      //           <div style={{ paddingLeft: "10px" }}>Yes</div>
      //         </div> */}
      //     </>
      //   );

      // case "Remove From Publication":
      //   return (
      //     <>
      //       <div className="sidebarTitle" style={{ paddingTop: "0px" }}>
      //         Select Authors to Remove
      //       </div>
      //       <div
      //         className="newConglomerate"
      //         style={{
      //           paddingBottom: "0px",
      //           padding: "0px",
      //           height: window.innerHeight - 420,
      //         }}
      //       >
      //         <div className="searchWrap">
      //           <input
      //             value={search}
      //             onChange={(e) => setSearch(e.target.value)}
      //             type="text"
      //             placeholder="Search Publication....|"
      //           />
      //         </div>
      //         <Scrollbars className="searchList">
      //           {loading
      //             ? Array(6)
      //                 .fill("")
      //                 .map((_, i) => (
      //                   <div className="user" key={i}>
      //                     <Skeleton className="dp" circle />
      //                     <div className="userDetail">
      //                       <Skeleton className="name" width={200} />
      //                       <Skeleton className="email" width={200} />
      //                     </div>
      //                   </div>
      //                 ))
      //             : allAuthorsInPub
      //                 ?.filter((o) =>
      //                   o.name?.toLowerCase().includes(search.toLowerCase())
      //                 )
      //                 ?.map((item) => (
      //                   <div
      //                     className="user"
      //                     style={{
      //                       backgroundColor: selectedAuthors.find(
      //                         (o) => o.name === item.name
      //                       )
      //                         ? "whitesmoke"
      //                         : "#fff",
      //                     }}
      //                     key={item._id}
      //                     onClick={() => {
      //                       if (
      //                         selectedAuthors.find((o) => o.name === item.name)
      //                       ) {
      //                         setSelectedAuthors(
      //                           selectedAuthors.filter(
      //                             (o) => o.name !== item.name
      //                           )
      //                         );
      //                       } else {
      //                         setSelectedAuthors([...selectedAuthors, item]);
      //                       }
      //                     }}
      //                   >
      //                     <img
      //                       className="dp"
      //                       src={
      //                         item?.profile_pic ? item?.profile_pic : defaultImg
      //                       }
      //                       alt=""
      //                     />
      //                     <div className="userDetail">
      //                       <div className="name">{item?.name}</div>
      //                       <div className="email">
      //                         {item?._id?.substring(0, 10)}...
      //                       </div>
      //                     </div>
      //                   </div>
      //                 ))}
      //           <div className="space"></div>
      //         </Scrollbars>
      //       </div>
      //       <div className="ftBtns">
      //         <div className="newField" onClick={() => handleBackStep()}>
      //           Go Back
      //         </div>
      //         <div
      //           className="btnSubmit"
      //           onClick={() => handleRemoveAuthorFromPub()}
      //         >
      //           Submit
      //         </div>
      //       </div>

      //       {/* <div
      //             className="sidebarCard"
      //             onClick={() => {
      //               setStep("loading");
      //               setPath([...path, "loading"]);
      //               handleDeleteAuthor();
      //             }}
      //           >
      //             <img
      //               src={yesIcon}
      //               alt=""
      //               className="coin"
      //               style={{ width: "25px", height: "25px" }}
      //             />
      //             <div style={{ paddingLeft: "10px" }}>Yes</div>
      //           </div> */}
      //     </>
      //   );

      default:
        return (
          <>
            <div className="sidebarTitle">What do you want to do with {selectedAuthor?.name}?</div>
            <div
              className="sidebarCard"
              onClick={() => {
                // setStep("Edit Bond Data");
              }}
            >
              {/* <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div style={{ opacity: 0.5 }}>See Profile</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Add To My Publication");
                setPath([...path, "Add To My Publication"]);
              }}
            >
              {/* <img
                src={deletePub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              /> */}
              <div>Add To My Publication</div>
            </div>
            {/* <div
              className="sidebarCard"
              onClick={() => {
                setStep("Add To Publication");
                setPath([...path, "Add To Publication"]);
              }}
            >
              <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>
                Add Authors To Publication
              </div>
            </div> */}
            {/* <div
              className="sidebarCard"
              onClick={() => {
                setStep("Remove From Publication");
                setPath([...path, "Remove From Publication"]);
              }}
            >
              <img
                src={editPub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>
                Remove Authors From Publication
              </div>
            </div> */}
          </>
        );
    }
  };

  return (
    <>
      <div
        style={{
          padding: "30px",
          height: "90px",
        }}
      >
        {loading ||
          step === "loading" ||
          step === "Token Expired" ||
          step == "success" ? (
          ""
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <img
                  src={
                    selectedArticle?.profile_pic
                      ? selectedArticle?.profile_pic
                      : defaultImg
                  }
                  alt=""
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "100%",
                  }}
                /> */}
                <div>
                  <div style={{ fontSize: "22px" }}>
                    {selectedAuthor?.name}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {path.length > 1 ? (
                  <div
                    className="backButton icon-imgs"
                    onClick={(e) => handleBackStep()}
                  >
                    <img src={back} alt="" />
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="backButton icon-imgs"
                  onClick={(e) => {
                    setPath([]);
                    setActionsSubDrawer(false);
                  }}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <img src={close} alt="" />
                </div>
              </div>
            </div>

            <div
              className="breadcrumb"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {path?.map((item, index) => {
                return (
                  <div>
                    {index !== 0 ? <span>&nbsp;{`->`}&nbsp;</span> : ""}
                    <span
                      onClick={(e) => handleBreadcrumbClick(item)}
                      className={
                        index === path.length - 1 ? "crumbSelected" : "crumbs"
                      }
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {conditionalSteps()}
      </div>
    </>
  );
};

export default Actions;
