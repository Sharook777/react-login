import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./Toast.css";

const Toast = (props) => {
  const { toastList, position } = props;

  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
            {/* <button>X</button> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default Toast;

Toast.defaultProps = {
  position: "bottom-right",
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
};
