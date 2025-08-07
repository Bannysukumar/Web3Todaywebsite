import React, { useContext, useState } from "react";
// import "../../../../../static/scss/subdrawer.scss";
import "./subdrawer.module.scss";
import "./subdrawer.scss";
import close from "../../../../../static/images/icons/close.svg";
import LoadingAnimation from "../../../../../globalComponents/LoadingAnimation";
import lock from "../../../../../static/images/icons/lock.svg";
import Axios from "axios";
import * as jose from "jose";
import loadingGif from "../../../../../static/images/loading.gif";
import cloudUploadIcon from "../../../../../static/images/clipIcons/cloudUpload.svg";
import { ToastContainer, toast } from "react-toastify";
import { GlobalContex } from "../../../../../globalContex";
import { useEffect } from "react";

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

const ActionIndex = ({
  showDrawer,
  SetShowDrawer,
  refechProfile,
  setRefechProfile,
  ActionBtn,
}) => {
  const [step, setStep] = useState("default");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [country, setCountry] = useState("");
  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");

  const { bankerEmail, setTabSelected } = useContext(GlobalContex);

  // useEffect(() => {
  //   console.log(ActionBtn, "ActionBtn")
  //   if (ActionBtn === "Actions") {
  //     setStep("Actions")
  //   } else{
  //     setStep("default")
  //   }
  // }, [step, ActionBtn])

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
          SetShowDrawer(false);
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

  const conditionalSteps = () => {
    switch (step) {
      case "loading":
        return fullHeightDrawer(`Creating Profile...`);
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
            You have successfully added Created publisher profile. You will be
            redirected to the updated Profile page now.
          </div>
        );

      case "Actions":
        return (
          <>
            <div className="sidebarTitle">Actions</div>
          </>
        );

      default:
        return (
          <>
            <div className="authorDrawer-title">
              <p className="auth-title">Create Author Profile</p>
              <img
                src={close}
                alt="closeico"
                className="closeico-sty"
                onClick={() => SetShowDrawer(false)}
              />
            </div>
            <div className="scrollDrawer">
              {/* <div className="storyname" style={{ paddingTop: "20px" }}>
            Name
          </div> */}
              <div className="image-data">
                <div className="storyname">Upload Image</div>

                <div
                  className="filesUpload ImgBox"
                  style={{ justifyContent: "flex-start", width: "100%" }}
                >
                  <label className="fileInp icon flexImg">
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
                        uploadImage(e, setColouredIcon, setColouredIconLoading);
                      }}
                      accept="image/*"
                    />

                    <div className="hovTxt">
                      Upload
                      <br />
                      New
                    </div>
                  </label>
                </div>
              </div>
              <div className="StoryInput">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Full Name"
                />
              </div>
              {/* <div className="storyname" style={{ paddingTop: "20px" }}>
            Description
          </div> */}
              <div className="StoryInput">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Username"
                />
              </div>
              <div className="StoryInput">
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Your Bio"
                />
              </div>
              {/* <div className="storyname" style={{ paddingTop: "20px" }}>Upload Image</div> */}

              {/* <div className="storyname" style={{ paddingTop: "20px" }}>
            Link
          </div> */}
              <div className="StoryInput">
                <input
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Your LinkedIn"
                />
              </div>
              <div className="StoryInput">
                <input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Your Twitter"
                />
              </div>

              <div className="StoryInput">
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  className="textStory width100"
                  placeholder="Country Of Residence"
                />
              </div>
            </div>
            <div className="btnss">
              <div>
                <button className="crtbtn" onClick={() => validate()}>
                  Create Profile
                </button>
              </div>
              <div>
                <button className="bckbtn" onClick={() => SetShowDrawer(false)}>
                  Go Back
                </button>
              </div>
              <ToastContainer />
            </div>
          </>
        );
    }
  };

  return (
    <div
      className={showDrawer ? "right-drawer-visible" : "right-drawer-hidden"}
      style={{
        // height: window.innerHeight - 123,
        height: "calc(100vh - 123px)",
        top: "0px",
        borderTop: "1px solid #e5e5e5",
      }}
    >
      {conditionalSteps()}
    </div>
  );
};

export default ActionIndex;
