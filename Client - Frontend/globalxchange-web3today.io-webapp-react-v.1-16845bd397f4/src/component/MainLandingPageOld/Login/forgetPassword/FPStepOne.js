import React from "react";
import InputBox from "../../common-components-cs/InputBox/InputBox";

export default function FPStepOne({
  setForgotPassword,
  email,
  setEmail,
  setSteps,
  submitEmail
}) {
  const emailRegex = /([\w\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/gm;
  return (
    <form onSubmit={(e) => e.preventDefault()} className="f-b-step-one">
      <h1>Forgot Password</h1>
      <InputBox
        handleChange={(e) => setEmail(e)}
        type="email"
        value={email}
        require={true}
        name="Enter Registered Email Address"
      />
      <button disabled={!emailRegex.test(email)} onClick={() => submitEmail()}>
        Next
      </button>
      <p className="remembered">
        I Remember My Password.{" "}
        <b onClick={() => setForgotPassword(false)}>Go Back</b>
      </p>
    </form>
  );
}
