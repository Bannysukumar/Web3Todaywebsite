import React from "react";
import { useEffect, useContext } from "react";
import GlobalSidebar from "../../globalComponents/GlobalSidebar";
import LocalSidebar from "../../globalComponents/LocalSidebar";
import { GlobalContex } from "../../globalContex";

import TabsLayout from "../../globalComponents/TabsLayout";
import MobileMenu from "../../globalComponents/MobileMenu";
import ClassContent from "./ClassContent";

const Classrooms = () => {
    const {
        collapse,
        setTabs,
        setSelectedTab,
        selectedTab,
        loginData,
        setBankerEmail,
        modalOpen,
        setModalOpen,
        localMenu,
        globalMenu,
        mcbMenu,
        ClassMenu,
        setDispdraw,
        showMobileMenu,
        tabSelected,
        setTabSelected,
    } = useContext(GlobalContex);

    useEffect(() => {
        setTabSelected("Content");
    }, []);

    const conditionalPages = () => {
        switch (selectedTab?.menuName) {
            case "Content":
                return (
                    <ClassContent
                        tabSelected={tabSelected}
                        setTabSelected={setTabSelected}
                    />
                );
            default:
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 700,
                            fontSize: "20px",
                            height: "70vh",
                        }}
                    >
                        Coming Soon
                    </div>
                );
        }
    };

    return (
        <>
            <div className="desktopWrapper">
                <div className={collapse ? "grid-cap-collapsed" : "grid-cap"}>
                    <GlobalSidebar globalMenu={globalMenu} />
                    <LocalSidebar localMenu={ClassMenu} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <TabsLayout />
                        <div style={{}}>{conditionalPages()}</div>
                    </div>
                </div>
            </div>
            {showMobileMenu ? (
                <MobileMenu />
            ) : (
                <div className="mobileWrapper">
                    <TabsLayout />
                    <div style={{}}>{conditionalPages()}</div>
                </div>
            )}
            {/* {modalOpen && (
          <AdminModal
            onClose={() => setModalOpen(false)}
            onSuccess={() => setModalOpen(false)}
          />
        )} */}
        </>
    )
}

export default Classrooms;