import React from "react";
import Test from "../../components/Test";
import useFetch from "../../components/useFetch";

const theme = ({ theme }) => {
  return (
    <div>
      <Test />
    </div>
  );
};

export async function getServerSideProps() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650010699300"
  );

  const _theme = list.themes[0].themes.map((e) => e.linkUrl.split("/"));

  const theme = _theme.map((e) => e[e.length - 1]);

  const themeUrl = theme.filter((e) => e.split("_").includes("life"));

  console.log(themeUrl);

  const { list: data1 } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/codes/${themeUrl[0]}`
  );

  console.log(data1.components[1].property.collections[0].items);

  // const data = themeUrl.map(
  //   async (e) => await fetch(`https://gift.kakao.com/a/v1/pages/codes/${e}`)
  // );

  return {
    props: {
      data: [],
    },
  };
}

export default theme;
