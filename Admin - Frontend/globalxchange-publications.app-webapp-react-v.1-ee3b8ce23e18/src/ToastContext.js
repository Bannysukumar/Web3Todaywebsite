import React, { createContext, useState } from "react";
import vaultIcon from "./static/images/logos/tokenHashIcon.svg";
import ToastMessage from "./Apps/MyCryptoBrand/McbTokenHash/McbTokenWithdrawals/ToastMessage/ToastMessage";

export const ToastContext = createContext();
function ToastContextProvider({ children }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [icon, setIcon] = useState(vaultIcon);
  function toastShowOn(message, submessage, icon) {
    setShow(true);
    setMessage(message);
    setSubMessage(submessage);
    setIcon(icon || vaultIcon);
    setTimeout(() => {
      setShow(false);
      setMessage("");
      setSubMessage("");
      setIcon("");
    }, 2000);
  }
  function copyToClipboard(value, title) {
    navigator.clipboard.writeText(value).then(() => {
      toastShowOn(value, title);
    });
  }
  return (
    <ToastContext.Provider value={{ copyToClipboard, toastShowOn }}>
      {children}
      {show && (
        <ToastMessage icon={icon} textOne={subMessage} textTwo={message} />
      )}
    </ToastContext.Provider>
  );
}

export default ToastContextProvider;
