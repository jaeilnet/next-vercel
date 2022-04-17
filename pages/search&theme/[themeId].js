import React from "react";
import useFetch from "../../components/useFetch";

const theme = ({ data }) => {
  return <div>dd</div>;
};

export async function getServerSideProps() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650010699300"
  );

  // const { list: text } = await useFetch(
  //   "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=2&size=20&productCollectionIds=165999"
  // );

  const _theme = list.themes[0].themes.map((e) => e.linkUrl.split("/"));

  const theme = _theme.map((e) => e[e.length - 1]);

  const themeUrl = theme.filter((e) => e.split("_").includes("life"));

  let totalArray = [];

  for (let i = 0; i < themeUrl.length; i++) {
    const { list } = await useFetch(
      `https://gift.kakao.com/a/v1/pages/codes/${themeUrl[i]}`
    );

    totalArray = {
      ...totalArray,
      [list.name]: list,
    };
  }

  // console.log(text, "dd");
  return {
    props: {
      data: totalArray,
    },
  };
}

export default theme;
