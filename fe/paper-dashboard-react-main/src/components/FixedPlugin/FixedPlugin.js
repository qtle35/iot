
import React from "react";
import "assets/css/fixed.css";

function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };
  const handleStartColorChange = (color) => {
    props.setStartColor(color);
  };

  const handleEndColorChange = (color) => {
    props.setEndColor(color);
  };
  return (
    <div className="fixed-plugin">
      <div className={classes}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu show">
          <li className="header-title">SIDEBAR BACKGROUND</li>
          <li className="adjustments-line">
            <div className="badge-colors text-center">
              <span
                className={
                  props.bgColor === "black"
                    ? "badge filter badge-dark active"
                    : "badge filter badge-dark"
                }
                data-color="black"
                onClick={() => {
                  props.handleBgClick("black");
                }}
              />
              <span
                className={
                  props.bgColor === "white"
                    ? "badge filter badge-light active"
                    : "badge filter badge-light"
                }
                data-color="white"
                onClick={() => {
                  props.handleBgClick("white");
                }}
              />
            </div>
          </li>
          <li className="header-title">SIDEBAR ACTIVE COLOR</li>
          <li className="adjustments-line">
            <div className="badge-colors text-center">
              <span
                className={
                  props.activeColor === "primary"
                    ? "badge filter badge-primary active"
                    : "badge filter badge-primary"
                }
                data-color="primary"
                onClick={() => {
                  props.handleActiveClick("primary");
                }}
              />
              <span
                className={
                  props.activeColor === "info"
                    ? "badge filter badge-info active"
                    : "badge filter badge-info"
                }
                data-color="info"
                onClick={() => {
                  props.handleActiveClick("info");
                }}
              />
              <span
                className={
                  props.activeColor === "success"
                    ? "badge filter badge-success active"
                    : "badge filter badge-success"
                }
                data-color="success"
                onClick={() => {
                  props.handleActiveClick("success");
                }}
              />
              <span
                className={
                  props.activeColor === "warning"
                    ? "badge filter badge-warning active"
                    : "badge filter badge-warning"
                }
                data-color="warning"
                onClick={() => {
                  props.handleActiveClick("warning");
                }}
              />
              <span
                className={
                  props.activeColor === "danger"
                    ? "badge filter badge-danger active"
                    : "badge filter badge-danger"
                }
                data-color="danger"
                onClick={() => {
                  props.handleActiveClick("danger");
                }}
              />
            </div>
          </li>
          <li className="header-title">DASHBOARD GRADIENT BACKGROUND</li>
          <li className="adjustments-line">
            <div className="badge-colors text-center">
              <input
                type="color"
                className="color-picker"
                value={props.startColor}
                onChange={(e) => props.setStartColor(e.target.value)}
              />
              <input
                type="color"
                className="color-picker"
                value={props.endColor}
                onChange={(e) => props.setEndColor(e.target.value)}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FixedPlugin;
