import React from "react";
import Scroll from "../scroll/Scroll";
import Header from "./Header";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ paddingTop: "65px" }}>{props.children}</div>
      <Scroll />
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Layout;
