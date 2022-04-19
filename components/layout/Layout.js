import React from "react";
import Scroll from "../scroll/Scroll";
import Header from "./Header";

const Layout = (props) => {
  const styles = {
    paddingTop: "65px",
    margin: "0 auto",
  };

  return (
    <React.Fragment>
      <Header />
      <div style={styles}>{props.children}</div>
      <Scroll />
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Layout;
