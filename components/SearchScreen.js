import React from "react";
import List from "./List";
import classes from "./SearchScreen.module.css";
import { useRouter } from "next/router";

const SearchScreen = ({ searchData }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      {searchData.length > 0 ? (
        <List list={searchData}>결과가 있어</List>
      ) : (
        <div className={classes.notFound}>
          <div>
            <span className={classes.searchParams}>
              {router.query.displayName}
            </span>
            의 검색 결과가 없습니다
          </div>
          <button onClick={() => router.replace("/")}>돌아가기</button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchScreen;
