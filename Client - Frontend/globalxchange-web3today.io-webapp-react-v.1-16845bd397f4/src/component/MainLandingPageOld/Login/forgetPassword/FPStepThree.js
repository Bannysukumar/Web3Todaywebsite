import React from "react";
import InputBox from "../../common-components-cs/InputBox/InputBox";

export default function FPStepThree({ setPassword, updatePassword, password }) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const [cPassword, setCPassword] = React.useState("");
  const [valid, setValid] = React.useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updatePassword();
      }}
      className="f-s-step-three"
    >
      <h1>Forget Password</h1>
      <InputBox
        handleChange={(e) => {
          setValid(passwordRegex.test(e));
          setPassword(e);
        }}
        type="password"
        name="Enter A New Password"
      />
      <InputBox
        handleChange={(e) => setCPassword(e)}
        disable={!valid}
        type="password"
        name="Confirm New Password"
      />
      <button
        onClick={() => updatePassword()}
        disabled={password !== cPassword}
      >
        Complete
      </button>
    </form>
  );
}
