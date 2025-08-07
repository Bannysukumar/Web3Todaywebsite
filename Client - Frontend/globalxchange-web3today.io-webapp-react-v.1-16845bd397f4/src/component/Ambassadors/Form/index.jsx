import React from "react";

import classNames from "./form.module.scss";

const AmbassadorsForm = () => {
  return (
    <div className={classNames.ambassadorsForm}>
      <div className={classNames.ambassadorsMain}>
        <div className={classNames.title}>
          Web3
          <span className={classNames.colorTitle}> Ambassador </span>Form
        </div>
        <div className={classNames.formDiv}>
          <div className={classNames.eachInput}>
            <div className={classNames.title}>Enter Your Full Name</div>
            <input
              type="text"
              placeholder="Name...."
              className={classNames.inputContainer}
            />
          </div>
          <div className={classNames.eachInput}>
            <div className={classNames.title}>Enter Your Email</div>
            <input
              type="email"
              placeholder="Email..."
              className={classNames.inputContainer}
            />
          </div>
          <div className={classNames.eachInput}>
            <div className={classNames.title}>Enter Your Phone Number</div>
            <input
              type="tel"
              placeholder="Phone Number..."
              className={classNames.inputContainer}
            />
          </div>
        </div>
        <div className={classNames.submitBtn}>Submit Form</div>
      </div>
    </div>
  );
};

export default AmbassadorsForm;
