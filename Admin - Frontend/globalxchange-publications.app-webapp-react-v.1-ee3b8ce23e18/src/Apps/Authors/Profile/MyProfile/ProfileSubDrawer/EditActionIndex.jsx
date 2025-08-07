import React, { useContext, useState } from "react";
// import "../../../../../static/scss/subdrawer.scss";
import "./subdrawer.module.scss";
import "./subdrawer.scss";
import close from "../../../../../static/images/icons/close.svg";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import lock from "../../../../../static/images/icons/lock.svg";
import back from "../../../../../static/images/icons/back.svg";
import Axios from "axios";
import * as jose from "jose";
import loadingGif from "../../../../../static/images/loading.gif";
import cloudUploadIcon from "../../../../../static/images/clipIcons/cloudUpload.svg";
import UploadIconImg from "../../../../../static/images/uploadIconImg.svg";
import { ToastContainer, toast } from "react-toastify";
import { GlobalContex } from "../../../../../globalContex";
import { useEffect } from "react";
import axios from "axios";

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

const EditActionIndex = ({
  showEditDrawer,
  SetShowEditDrawer,
  refechProfile,
  setRefechProfile,
  ActionBtn,
}) => {
  const [step, setStep] = useState("default");
  const [path, setPath] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [country, setCountry] = useState("");
  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");
  const [SelectedPath, setSelectedPath] = useState("");
  const [newField, setNewField] = useState("");
  const [publisherProfile, setPublisherProfile] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const { bankerEmail, setTabSelected } = useContext(GlobalContex);

  // useEffect(() => {
  //   console.log(ActionBtn, "ActionBtn")
  //   if (ActionBtn === "Actions") {
  //     setStep("Actions")
  //   } else{
  //     setStep("default")
  //   }
  // }, [step, ActionBtn])

  useEffect(() => {
    axios
      .get(`https://publications.apimachine.com/publisher?email=${bankerEmail}`)
      .then((res) => {
        if (res.data.status) {
          setPublisherProfile(res.data.data[0]);
        }
      });
  }, [refechProfile, bankerEmail]);

  useEffect(() => {
    setStep("Action");
    setPath(["Action"]);
  }, []);

  useEffect(() => {
    setStep(path[path.length - 1]);
  }, [path]);

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
      setLoading(false);
    }, 5000);
  };

  const handleBreadcrumbClick = (clickedStep) => {
    const foundStepIndex = path.findIndex((o) => o === clickedStep);
    const tempPath = path;
    tempPath.splice(foundStepIndex + 1, tempPath.length);
    setPath([...tempPath]);
    console.log(path, "lwndwed");
  };

  const validate = () => {
    if (
      name &&
      username &&
      bio &&
      linkedIn &&
      twitter &&
      country &&
      colouredIcon
    ) {
      let data = {
        name,
        user_name: username,
        email: bankerEmail,
        description: bio,
        social_media: [{ LinkedIn: linkedIn, Twitter: twitter }],
        profile_pic: colouredIcon,
        country,
      };
      // console.log("validated", data)
      addProfile(data);
    } else {
      toast.warning("Please fill all the fields");
    }
  };

  const addProfile = (body) => {
    // console.log(body, "body")
    setStep("loading");
    Axios.post("https://publications.apimachine.com/publisher/register", body)
      .then(({ data }) => {
        console.log(data, "data");
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          } else {
            setStep("default");
            toast.warning(data.message || "API Error");
          }
          setStep("default");
          toast.warning(data.message || "API Error");
        } else {
          setStep("success");
          setTabSelected("My Profile");
          setStep("default");
          SetShowEditDrawer(false);
          setRefechProfile(!refechProfile);
        }
      })
      .catch((err) => {
        toast.error("API Error");
      });
    // .finally(() => {
    //   setTabSelected("My Profile")
    //   setStep("default");
    //   SetShowDrawer(false);
    //   setRefechProfile(!refechProfile)
    // })
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
            Creating Profile...
          </div>
        </div>
      );
    }
  };

  const validateProfile = (data, e) => {
    setStep("loading");
    if (!newField) {
      toast.warning("Field is empty");
    } else {
      let body = {
        [selectedKey]: newField,
      };
      console.log(body, "body");
      axios
        .put(
          `https://publications.apimachine.com/publisher/${publisherProfile._id}`,
          body
        )
        .then(({ data }) => {
          console.log(data, "data");
          if (data.status === false) {
            if (data.message === "jwt expired") {
              toast.warning("Token Expired");
            } else {
              toast.warning(data.message || "API Error");
            }
          } else {
            setStep("success");
            setTimeout(() => {
              setStep("default");
              setNewField("");
              SetShowEditDrawer(false);
              setPath(["Actions"]);
              setRefechProfile(!refechProfile);
            }, 1000);
          }
        });
    }
  };

  let EditProfileFields = [
    {
      name: "Name",
      key: "name",
      pathValue: "Edit Name",
      FieldValue: publisherProfile?.name,
    },
    {
      name: "Username",
      key: "user_name",
      pathValue: "Edit Username",
      FieldValue: publisherProfile?.user_name,
    },
    {
      name: "Profile picture",
      key: "profile_pic",
      pathValue: "Edit Profile Picture",
      FieldValue: publisherProfile?.profile_pic,
    },
    {
      name: "Cover photo",
      key: "cover_pic",
      pathValue: "Edit Cover Photo",
      FieldValue: publisherProfile?.cover_pic,
    },
    {
      name: "Bio",
      key: "description",
      pathValue: "Edit Bio",
      FieldValue: publisherProfile?.description,
    },
    {
      name: "Website",
      key: "website",
      pathValue: "Edit Website",
      FieldValue: publisherProfile?.website,
    },
    {
      name: "Country",
      key: "country",
      pathValue: "Edit Country",
      FieldValue: publisherProfile?.country,
    },
  ];

  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(`Updating Profile...`);
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
            You have successfully added Updated publisher profile. You will be
            redirected to the updated Profile page now.
          </div>
        );

      case "Edit Profile":
        return (
          <>
            <div className="sidebarTitle" style={{ paddingBottom: "5px" }}>
              What do you want to Edit?
            </div>
            <div className="sidebarSelectData">
              {EditProfileFields.map((item, index) => {
                return (
                  <div
                    className="sidebarCard"
                    key={index}
                    id={item.key}
                    onClick={() => {
                      setStep(item.pathValue);
                      setPath([...path, item.pathValue]);
                      setSelectedPath(item.pathValue);
                      setSelectedField(item.FieldValue);
                      setSelectedText(item.name);
                      setSelectedKey(item.key);
                    }}
                  >
                    <div>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </>
        );

      case `${SelectedPath}`:
        switch (SelectedPath) {
          case "Edit Profile Picture":
          case "Edit Cover Photo":
            return (
              <>
                <div>
                  <img src={selectedField} alt="" className="category-img" />
                </div>
                <div className="breakLine">
                  <div className="horizantalLine"></div>
                  &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                  <div className="horizantalLine"></div>
                </div>
                <div
                  className="bottomSubmit"
                  style={{ bottom: "12px" }}
                  onClick={(e) => validateProfile(e, selectedKey)}
                >
                  <p className="btm-text">Submit Edit</p>
                </div>
                <label className="fileInp icon centerIco">
                  <img
                    className={`${Boolean(newField)} centerImg`}
                    src={
                      colouredIconLoading
                        ? loadingGif
                        : newField || UploadIconImg
                    }
                    alt=""
                    style={{ width: "40px" }}
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e, setNewField, setColouredIconLoading);
                    }}
                    accept="image/*"
                  />
                  {/* <div
                                      className="text"
                                      style={{ fontWeight: "700", fontSize: "12px" }}
                                    >
                                      Colored Icon
                                    </div> */}
                  <div className="hovTxt">
                    Upload
                    <br />
                    New
                  </div>
                </label>
              </>
            );
          default:
            return (
              <>
                <div className="sidebarInputBox">
                  <div>{selectedField}</div>
                </div>
                <div className="breakLine">
                  <div className="horizantalLine"></div>
                  &nbsp;&nbsp;&nbsp;<div>New</div>&nbsp;&nbsp;&nbsp;
                  <div className="horizantalLine"></div>
                </div>
                <div className="sidebarInputBox">
                  <input
                    type="text"
                    value={newField}
                    className="inputBox"
                    placeholder={`Enter New ${selectedText}`}
                    onChange={(e) => setNewField(e.target.value)}
                  />
                </div>
                <div
                  className="bottomSubmit"
                  style={{ bottom: "12px" }}
                  onClick={(e) => validateProfile(e, selectedKey)}
                >
                  <p className="btm-text">Submit Edit</p>
                </div>
              </>
            );
        }

      default:
        return (
          <>
            <div className="sidebarTitle" style={{ paddingBottom: "5px" }}>
              What do you want to do?
            </div>
            <div className="sidebarSelect">
              <div
                className="sidebarCard"
                onClick={() => {
                  setStep("Edit Profile");
                  setPath([...path, "Edit Profile"]);
                }}
              >
                <div>Edit Profile</div>
              </div>
            </div>
            <ToastContainer />
          </>
        );
    }
  };

  return (
    <div
      className={
        showEditDrawer ? "right-drawer-visible" : "right-drawer-hidden"
      }
      style={{
        // height: window.innerHeight - 123,
        height: "calc(100vh - 123px)",
        top: "0px",
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <div
        style={{
          padding: "30px",
          height: "90px",
        }}
      >
        {step === "loading" || step === "Token Expired" || step == "success" ? (
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
                  <div style={{ fontSize: "22px" }}>My Creator Profile</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* {path.length > 1 ? (
                                        <div
                                            className="backButton icon-imgs"
                                            onClick={(e) => handleBackStep()}
                                        >
                                            <img src={back} alt="" />
                                        </div>
                                    ) : (
                                        ""
                                    )} */}
                <div
                  className="backButton icon-imgs close-img"
                  onClick={(e) => {
                    setPath(["Action"]);
                    SetShowEditDrawer(false);
                  }}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  <img src={close} alt="" />
                </div>
              </div>
              {/* {path.length > 0 ? (
                                    <div className="back-btm-button">
                                        <p className="btm-text">Go Back</p>
                                        
                                    </div>
                                ) : (
                                    ""
                                )} */}
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditActionIndex;
