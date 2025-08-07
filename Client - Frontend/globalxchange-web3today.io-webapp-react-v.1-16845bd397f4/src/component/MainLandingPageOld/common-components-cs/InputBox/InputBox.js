import React from "react";
import { ImagesCS } from "../../../../assets/0a-exporter";
import "./input-box.style.scss";
export default function InputBox({
  name,
  type,
  error,
  required = false,
  value,
  handleChange,
  disable = false,
}) {
  const [show, setShow] = React.useState(false);
  return (
    <div style={disable ? { opacity: 0.25 } : {}} className="input-box">
      <p>{name}</p>
      <div className={error ? "red-line" : ""}>
        <input
          disabled={disable}
          required={required}
          type={show ? "text" : type}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
        <img
          onClick={() => setShow(!show)}
          className={type === "password" ? "" : "d-none"}
          src={show ? ImagesCS.doNotShowPassword : ImagesCS.showPassword}
        />
      </div>
    </div>
  );
}
