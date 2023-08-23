import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";

import routes from "routes.js";

var ps;

function Admin(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [startColor, setStartColor] = React.useState("#FFFFFF");
  const [endColor, setEndColor] = React.useState("#50E3A6");
  const mainPanel = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  }, []);

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard startColor={startColor} endColor={endColor} />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
        {/* <Footer fluid /> */}
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
        startColor={startColor}
        endColor={endColor}
        setStartColor={setStartColor}
        setEndColor={setEndColor}
      />
    </div>
  );
}

export default Admin;
