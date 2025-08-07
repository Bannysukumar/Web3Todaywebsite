import React from "react";
import InputBox from "../common-components-cs/InputBox/InputBox";

export default function LoginForm({
  credentials,
  setCredentials,
  handleSubmit,
  setErrors,
  errors
}) {
  const emailRegex = /([\w\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/gm;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const beforeSubmission = () => {
    let a = emailRegex.test(credentials.email);
    let b = passwordRegex.test(credentials.password);
    if (!a || !b) {
      setErrors({
        email: !a,
        password: !b,
      });
      return;
    }
    handleSubmit();
  };
  return (
    <div className="login-form-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          beforeSubmission();
        }}
        className="login-form"
      >
        <h1>Login</h1>
        <InputBox
          value={credentials?.email}
          name="Email"
          type="email"
          required={true}
          error={errors.email}
          handleChange={(val) => {
            setErrors({ email: false, password: false });
            setCredentials({ ...credentials, email: val });
          }}
        />
        <InputBox
          value={credentials?.password}
          name="Password"
          type="password"
          error={errors.password}
          handleChange={(val) => {
            setErrors({ email: false, password: false });
            setCredentials({ ...credentials, password: val });
          }}
        />
        <button
          disabled={
            errors.email ||
            errors.password ||
            !credentials.email ||
            !credentials.password
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}
