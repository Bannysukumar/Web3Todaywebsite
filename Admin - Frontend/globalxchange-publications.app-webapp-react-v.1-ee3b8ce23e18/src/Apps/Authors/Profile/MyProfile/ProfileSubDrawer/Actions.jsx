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
import addIcon from "../../../../../static/images/clipIcons/addicon.svg";
import loadingGif from "../../../../../static/images/loading.gif";
import cloudUploadIcon from "../../../../../static/images/clipIcons/cloudUpload.svg";

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
import { toast , ToastContainer} from "react-toastify";
import Skeleton from "react-loading-skeleton";
import Scrollbars from "react-custom-scrollbars";
import Axios from "axios";
import * as jose from "jose";
import "./subdrawer.scss";

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

const Actions = ({
  selectedPublication,
  allBonds,
  currenciesData,
  loading,
  setLoading,
  step,
  setStep,
  path,
  setPath,
  selectedStory,
  setSelectedStory
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
    StorySubDrawer,
    setStorySubDrawer,
    setTabSelected,
    setRefreshStories
  } = useContext(GlobalContex);

  const [bondStatus, setBondStatus] = useState("");
  const [search, setSearch] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allAuthorsInPub, setAllAuthorsInPub] = useState([]);
  const [allAuthorsNotInPub, setAllAuthorsNotInPub] = useState([]);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");


  useEffect(() => {
    setStep("Action");
    setPath(["Action"]);
  }, [StorySubDrawer]);

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

  const signJwt = async (fileName, emailDev, secret) => {
    try {
      const jwts = await new jose.SignJWT({ name: fileName, email: emailDev })
        .setProtectedHeader({ alg: "HS512" })
        .setIssuer("gxjwtenchs512")
        .setExpirationTime("10m")
        .sign(new TextEncoder().encode(secret));
      return jwts;
    } catch (error) {
      console.log(error, "kjbedkjwebdw");
    }
  };

  const uploadImage = async (e, setImage, setLoading) => {
    setLoading(true);
    const fileName = `${new Date().getTime()}${e.target.files[0].name.substr(
      e.target.files[0].name.lastIndexOf(".")
    )}`;
    const formData = new FormData();
    const file = renameFile(e.target.files[0], fileName);
    formData.append("files", file);
    const path_inside_brain = "root/";

    const jwts = await signJwt(fileName, emailDev, secret);
    console.log(jwts, "lkjkswedcf");
    let { data } = await Axios.post(
      `https://publications.apimachine.com/article/upload`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
     setImage(data[0].urlName);
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  };

  const handleDeletePub = () => {
    setLoading(true);
    axios
      .delete(
        `https://publications.apimachine.com/article/${selectedStory?._id}`
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
            height: window.innerHeight - 150,
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

  const validate = () => {
    if (
      colouredIcon &&
      name &&
      desc &&
      link
    ) {
      addNewStory();
    } else {
      toast.warning("All Fields Are Mandatory");
    }
  };

  const addNewStory = () => {
    setLoading(true);
    setStep("loading")

    axios
      .post(`https://publications.apimachine.com/story/new`, {
        web_story_id: selectedStory?._id,
        name : name,
        image: colouredIcon,
        desc : desc,
        link_to_article : link
      })
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            toast.error(data.message || "API Error");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        setTabSelected("Web Stories");
        setStep("");
        setPath([]);
        setStorySubDrawer(false);
        setRefreshStories(true);
      });
  };


  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(`Add ${name} to ${selectedStory?.name}`);

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
            You have successfully added {name} to {selectedStory.name}. You will be redirected to the updated web stories template page now.
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

      case "Add Story":
        return (
          <div className="scrollstory">
            <div className="storyname" style={{ paddingTop: "20px" }}>
              Name
            </div>
            <div className="StoryInput">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="textStory"
                placeholder="Enter Name..."
              />
            </div>
            <div className="storyname" style={{ paddingTop: "20px" }}>
              Description
            </div>
            <div className="StoryInput">
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                className="textStory"
                placeholder="Enter Description..."
              />
            </div>
            <div className="storyname" style={{ paddingTop: "20px" }}>Upload Image</div>
            <div>
              <div
                className="filesUpload"
                style={{ justifyContent: "flex-start" }}
              >
                <label className="fileInp icon">
                  <img
                    className={`${Boolean(colouredIcon)}`}
                    src={
                      colouredIconLoading
                        ? loadingGif
                        : colouredIcon || cloudUploadIcon
                    }
                    alt=""
                    style={{ width: "40px" }}
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(
                        e,
                        setColouredIcon,
                        setColouredIconLoading
                      );
                    }}
                    accept="image/*"
                  />
                  <div
                    className="text"
                    style={{ fontWeight: "700", fontSize: "12px" }}
                  >
                    Colored Icon
                  </div>
                  <div className="hovTxt">
                    Upload
                    <br />
                    New
                  </div>
                </label>
              </div>
            </div>
            <div className="storyname" style={{ paddingTop: "20px" }}>
              Link
            </div>
            <div className="StoryInput">
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                className="textStory"
                placeholder="Enter Link..."
              />
            </div>

          </div>
        );

      case "Delete Article":
        return (
          <>
            <div className="sidebarTitle">
              Are you sure you want to delete this article?
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("loading");
                setPath([...path, "loading"]);
                handleDeletePub();
              }}
            >
              <img
                src={yesIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Yes</div>
            </div>
            <div
              className="sidebarCard"
            // onClick={() => {
            //   setBondStatus("inactive");
            //   setStep("Verify Status");
            //   setPath([...path, "Verify Status"]);
            // }}
            >
              <img
                src={noIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>No</div>
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
            <div className="sidebarTitle">What Would You Like To Do? </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Add Story");
                setPath([...path, "Add Story"]);
              }}
            >
              <img
                src={addIcon}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Add Story</div>
            </div>
            <div
              className="sidebarCard"
              onClick={() => {
                setStep("Delete Template");
                // setPath([...path, "Delete Template"]);
              }}
            >
              <img
                src={deletePub}
                alt=""
                className="coin"
                style={{ width: "25px", height: "25px" }}
              />
              <div style={{ paddingLeft: "10px" }}>Delete Template</div>
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
                <img
                  src={
                    selectedStory?.icon
                      ? selectedStory?.icon
                      : defaultImg
                  }
                  alt=""
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "100%",
                  }}
                />
                <div style={{ paddingLeft: "10px" }}>
                  <div style={{ fontSize: "22px" }}>
                    {selectedStory?.name}
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
                    setStorySubDrawer(false);
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
      <div className="storyBtn" style={{ display: step === "Add Story" ? "" : "none" }}>
        <button className="btnStory"
          onClick={() => validate()}
          style={{
            fontWeight: 700,
            opacity:
              colouredIcon &&
                name &&
                desc &&
                link
                ? 1
                : 0.3,
          }}>Add Story</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Actions;
