import React, { useState, useEffect, useContext } from "react";
import styles from "./createProfile.module.scss";
import upload from "../../assets/upload.svg";
import axios from "axios";
import * as jose from "jose";
import loadingGif from "../../assets/images/loading.gif";
import { GlobalContex } from "../../globalContext";
import LoadingAnimation from "../../globalComponents/LoadingAnimation";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const { loginData, setHideArrow, userProfile, setUserProfile } =
    useContext(GlobalContex);
  const [countryList, setCountryList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (userProfile) {
      console.log(userProfile, "kjkjjkhgkvjh");
      setFirstName(userProfile.first_name);
      setLastName(userProfile.last_name);
      setUsername(userProfile.username);
      setBio(userProfile.bio);
      setAge(userProfile.age);
      setUserType(userProfile.user_type);
      setCountry(userProfile.country);
      setAddress(userProfile.address);
      setProfilePicture(userProfile.profile_pic);
      setCoverPhoto(userProfile.cover_photo);
      setPhoneNumber(userProfile.phoneNumber);
    }
  }, [userProfile]);

  useEffect(() => {
    // setHideArrow(true);
    axios
      .get(`https://comms.globalxchange.io/coin/vault/countries/data/get`)
      .then(({ data }) => {
        // console.log(res.data);
        setCountryList(data.countries);
      });
  }, []);

  const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
  const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

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
    let { data } = await axios.post(
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

  const handleRegistration = () => {
    setLoadingRegister(true);
    if (
      !firstName ||
      !lastName ||
      !username ||
      !bio ||
      !age ||
      !userType ||
      !country ||
      !address ||
      !profilePicture ||
      !coverPhoto ||
      userType === "" ||
      country === ""
    ) {
      setLoadingRegister(false);
      alert("Please fill all the fields");
    } else {
      axios
        .post(`https://publications.apimachine.com/userprofile`, {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: loginData?.user?.email,
          profile_pic: profilePicture,
          cover_pic: coverPhoto,
          age: age,
          bio: bio,
          address: address,
          country: country,
          user_type: userType,
          publication_id: "638dd769b257b3715a8fbe07",
          phoneNumber: phoneNumber,
        })
        .then(({ data }) => {
          if (data.status) {
            // console.log(data, "data");
            setLoadingRegister(false);
            setUserProfile(data.data);
            localStorage.setItem("userProfile", JSON.stringify(data.data));
            // console.log(data.data._id, "userID");
            axios
              .post("https://publications.apimachine.com/userpublication", {
                user_id: data.data._id,
                email: loginData?.user?.email,
                publication_ids: ["638dd769b257b3715a8fbe07"],
              })
              .then(({ data }) => {
                console.log(data, "data");
                console.log("User added to publication");
              });

            axios
              .post("https://publications.apimachine.com/signuppoints", {
                user_id: data.data._id,
                publication_id: "638dd769b257b3715a8fbe07",
              })
              .then(({ data }) => {
                console.log("signup point added");
              });
            // alert("Profile Created Successfully");
            // window.location.reload();
            // navigate("/news/articles");
          } else {
            setLoadingRegister(false);
            alert(data.message);
          }
        });
    }
  };

  // const updateProfile = () => {
  //   axios.post(`https://publications.apimachine.com/userprofile/:id`)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <div className={styles.header}>My Settings</div>
          <div className={styles.breadcrumb}>
            <span
              onClick={(e) => (userProfile ? navigate("/settings") : "")}
              className={styles.prevLink}
            >
              My Settings
            </span>{" "}
            {`->`}{" "}
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              Create Profile
            </span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          id="imgupload"
          style={{ display: "none" }}
          onChange={(e) => {
            uploadImage(e, setProfilePicture, setLoading);
          }}
        />
        <label for="imgupload" className={styles.profilePicture}>
          <img
            src={
              loading ? loadingGif : profilePicture ? profilePicture : upload
            }
            alt=""
            style={{
              height: profilePicture ? "60px" : "30px",
              width: profilePicture ? "60px" : "30px",
              borderRadius: profilePicture ? "50%" : "",
            }}
          />
        </label>
      </div>
      <div className={styles.formContainer}>
        <div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>First Name</div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="First Name.."
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Last Name</div>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="Last Name.."
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Publishers Username</div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="Username.."
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Bio</div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
              className={styles.inputStyle}
              style={{ height: "170px", padding: "10px" }}
              placeholder="Tell Us About Yourself...."
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Age</div>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="How Old Are You.."
            />
          </div>
          <div
            className={styles.registraionBtn}
            onClick={(e) => handleRegistration()}
          >
            {userProfile ? "Update Profile" : "Complete Registration"}
          </div>
        </div>
        {/* Right Side */}
        <div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>User Type</div>
            {/* <input
              type="text"
              className={styles.inputStyle}
              placeholder="Select Type.."
            /> */}

            <select
              defaultValue="Reader"
              className={styles.inputStyle}
              style={{}}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Select User Type
              </option>
              <option value="Reader">Reader</option>
              <option value="Advertiser">Advertiser</option>
              <option value="Founder">Founder</option>
              <option value="Author">Author</option>
              <option value="Web3 Marketplace Creator">
                Web3 Marketplace Creator
              </option>
              <option value="Hiring Representative">
                Hiring Representative
              </option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Country</div>
            <select
              className={styles.inputStyle}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Select Country
              </option>
              {countryList.map((item) => {
                return <option value={item.name}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Address</div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="Address.."
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="imgupload1"
            style={{ display: "none" }}
            onChange={(e) => {
              uploadImage(e, setCoverPhoto, setLoadingCover);
            }}
          />
          <label
            for="imgupload1"
            className={styles.inputContainer}
            style={{ width: "100%" }}
          >
            <div className={styles.inputLabel}>Cover Photo</div>
            <div
              className={styles.uploadStyle}
              style={{ height: "170px", padding: "10px" }}
            >
              {loadingCover ? (
                <div style={{ width: "50px", height: "50px" }}>
                  <img
                    src={loadingGif}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ) : coverPhoto ? (
                <img
                  src={coverPhoto}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              ) : userProfile ? (
                <img
                  src={userProfile?.cover_pic}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <>
                  <img src={upload} alt="" />
                  <div className={styles.uploadText}>Upload Cover Photo</div>
                </>
              )}
            </div>
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>Phone Number</div>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              className={styles.inputStyle}
              placeholder="Enter Number.."
            />
          </div>
        </div>
      </div>
      {loadingRegister ? (
        <div className={styles.loadingBackground}>
          <LoadingAnimation logoAnim />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyProfile;
