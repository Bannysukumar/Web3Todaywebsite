import React from "react";

function GodsEyeFilterDisplay() {
  return (
    <>
      <div className="godsEyeFilterDisplay">
        <div className="labelItm">What Is Primary Identifier?</div>
        <div className="options">
          <div className={`disable option`} onClick={() => {}}>
            Name
          </div>
          <div className={`option true`} onClick={() => {}}>
            Username
          </div>
        </div>
      </div>
      <div className="footerBtns">
        <div className="btnReset" onClick={() => {}}>
          Reset
        </div>
        <div className="btnSave" onClick={() => {}}>
          Save
        </div>
      </div>
    </>
  );
}

export default GodsEyeFilterDisplay;
