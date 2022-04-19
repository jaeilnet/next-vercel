import Link from "next/link";
import React from "react";
import classes from "./Header.module.css";
import Search from "../Search";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>로고</a>
        </Link>
        <div>이름</div>
      </div>
      <div className={classes.search}>
        <Search />
      </div>
      <div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
};

export default Header;
