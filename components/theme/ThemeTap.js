import { useRouter } from "next/router";
import React from "react";
import classes from "./ThemeTap.module.css";

const ThemeTap = ({ tabs, collectionId }) => {
  const handleTapClick = async (id) => {
    // const { list } = await useFetch(
    //   `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=2&size=20&productCollectionIds=${id}&filteringSoldOut=true&sortProperty=PRIORITY&sortDir=DESC`
    // );
    // console.log(list, "list");
  };

  const router = useRouter();

  console.log(+router.query.themeId, tabs.collectionId, collectionId);

  return (
    <div className={classes.container}>
      <button
        onClick={() => handleTapClick(tabs.collectionId)}
        className={
          +router.query.themeId === tabs.collectionId
            ? classes.button
            : classes.active
        }
      >
        {tabs.tabName}
      </button>
    </div>
  );
};

export default ThemeTap;
