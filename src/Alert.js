import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setInterval(() => {
      removeAlert();
    }, 3000);
    return () => {
      setTimeout(timeout);
    };
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
