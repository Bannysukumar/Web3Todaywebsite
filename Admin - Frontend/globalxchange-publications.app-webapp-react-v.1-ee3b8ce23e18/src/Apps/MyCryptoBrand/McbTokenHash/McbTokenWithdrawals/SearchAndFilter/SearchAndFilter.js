import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./searchAndFilter.module.scss";
import { ReactComponent as SettingsIcon } from "../../../../../static/images/clipIcons/settings.svg";
import { ReactComponent as CloseIcon } from "../../../../../static/images/clipIcons/close.svg";
import { ReactComponent as BackIcon } from "../../../../../static/images/clipIcons/back.svg";
import { ReactComponent as SearchIcon } from "../../../../../static/images/clipIcons/search.svg";
import { GlobalContex } from "../../../../../globalContex";
// import ProfileModal from "../ProfileModal/ProfileModal";
// import AdminButtons from "../AdminButtons/AdminButtons";

function SearchAndFilter({
  search,
  setSearch,
  placeholder,
  filterBy,
  mainList,
  filterList,
  iconOne,
  iconTwo,
  iconThree,
  iconFour,
  iconMain,
}) {
  const { name, profileImg, admin, adminEmail, email } = useContext(
    GlobalContex
  );
  const [searchOn, setSearchOn] = useState(false);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref?.current && ref.current.focus();
    }, 200);
  }, []);
  const [settings, setSettings] = useState(false);
  const [step, setStep] = useState(0);
  const [profileModal, setProfileModal] = useState(false);
  const [profileAdmin, setProfileAdmin] = useState();

  function getContent() {
    switch (step) {
      case 1:
        return (
          <div className={styles.filterView}>
            {filterList?.map((item) => (
              <div key={item.key} className={styles.listItem}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.switchGroup}>
                  <div
                    className={`${styles.switch} ${item.switch && styles.on}`}
                    onClick={() => {
                      try {
                        item.switchClick();
                      } catch (error) {}
                    }}
                  >
                    <div className={styles.switchBall} />
                  </div>
                  <div className={styles.switchLabel}>{item.switchLabel}</div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={styles.filterView}>
            {mainList?.map((item) => (
              <div key={item.key} className={styles.listItem}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.switchGroup}>
                  <div
                    className={`${styles.switch} ${item.switch && styles.on}`}
                    onClick={() => {
                      try {
                        item.switchClick();
                      } catch (error) {}
                    }}
                  >
                    <div className={styles.switchBall} />
                  </div>
                  <div className={styles.switchLabel}>{item.switchLabel}</div>
                </div>
              </div>
            ))}
            <div className={styles.listItem} onClick={() => setStep(1)}>
              <span className={styles.label}>Filter By</span>
              <span className={styles.value}>{filterBy}</span>
            </div>
          </div>
        );
    }
  }

  return (
    <>
      {searchOn ? (
        <div className={styles.searchAndFilter}>
          <input
            className={styles.serchInp}
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {step === 1 && (
            <div
              key="back"
              className={styles.moreFilter}
              onClick={() => setStep(0)}
            >
              <BackIcon />
            </div>
          )}
          <div
            className={styles.moreFilter}
            key="settinClose"
            onClick={() => {
              setSettings(!settings);
              setStep(0);
            }}
          >
            {settings ? <CloseIcon /> : <SettingsIcon />}
            <div className={styles.label}>Search Settings</div>
          </div>
          <div
            key="searchClose"
            className={styles.moreFilter}
            onClick={() => {
              setSearchOn(false);
            }}
          >
            <CloseIcon />
            <div className={styles.label}>Close Search</div>
          </div>
          {settings && getContent()}
        </div>
      ) : (
        <div className={styles.searchAndFilter}>
          <div className={styles.imgWrap}>
            {iconMain ? (
              <img
                src={iconMain?.icon}
                alt=""
                onClick={() => {
                  try {
                    iconMain?.onClick();
                  } catch (error) {}
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div
            key="search"
            className={styles.moreFilter}
            onClick={() => {
              setSearchOn(true);
            }}
          >
            <SearchIcon />
            <div className={styles.label}>Search</div>
          </div>
          {iconOne && (
            <div
              key="icOne"
              className={styles.moreFilter}
              onClick={() => {
                try {
                  iconOne.onClick();
                } catch (error) {}
              }}
            >
              <img src={iconOne?.icon} alt="" />
              <div className={styles.label}>{iconOne?.label}</div>
            </div>
          )}
          {iconTwo && (
            <div
              key="icTwo"
              className={styles.moreFilter}
              onClick={() => {
                try {
                  iconTwo.onClick();
                } catch (error) {}
              }}
            >
              <img src={iconTwo?.icon} alt="" />
              <div className={styles.label}>{iconTwo?.label}</div>
            </div>
          )}
          {iconThree && (
            <div
              key="icThree"
              className={styles.moreFilter}
              onClick={() => {
                try {
                  iconThree.onClick();
                } catch (error) {}
              }}
            >
              <img src={iconThree?.icon} alt="" />
              <div className={styles.label}>{iconThree?.label}</div>
            </div>
          )}
          {iconFour && (
            <div
              key="icFour"
              className={styles.moreFilter}
              onClick={() => {
                try {
                  iconFour.onClick();
                } catch (error) {}
              }}
            >
              <img src={iconFour?.icon} alt="" />
              <div className={styles.label}>{iconFour?.label}</div>
            </div>
          )}
          {/* <div
            key="dp"
            className={styles.dp}
            onClick={() => setProfileModal(true)}
          >
            <img src={profileImg} alt="" />
            <div className={styles.label}>{name}</div>
          </div> */}
        </div>
      )}
      {/* {profileModal && (
        <ProfileModal
          onClose={() => setProfileModal(false)}
          profileAdmin={profileAdmin}
        />
      )}
      {admin && adminEmail !== email && (
        <AdminButtons setProfileAdmin={setProfileAdmin} />
      )} */}
    </>
  );
}

export default SearchAndFilter;
