import React from "react";
import ThemeScreen from "../../components/ThemeScreen";
import useFetch from "../../components/useFetch";

const ThemeHome = ({ data }) => {
  return (
    <React.Fragment>
      <ThemeScreen data={data} />
    </React.Fragment>
  );
};

export async function getStaticProps(ctx) {
  const { list: name } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650010699300"
  );
  console.log(name);

  const _theme = name.themes[0].themes.map((e) => e.linkUrl.split("/"));

  const theme = _theme.map((e) => e[e.length - 1]);

  const themeUrl = theme.filter((e) => e.split("_").includes("life"));

  let totalArray = [];

  console.log(themeUrl, "themeUrl");

  // for (let i = 0; i < themeUrl.length; i++) {
  //   const { list } = await useFetch(
  //     `https://gift.kakao.com/a/v1/pages/codes/${themeUrl[i]}`
  //   );

  //https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=165999&filteringSoldOut=true&sortProperty=PRIORITY

  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=${ctx.params.themeId}&filteringSoldOut=true&sortProperty=PRIORITY`
  );

  // console.log(list, " list");

  const itmesList = list.items.map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  return {
    props: {
      data: itmesList,
    },
  };
}

export async function getStaticPaths() {
  const pathAry = [
    165624, 165625, 165626, 165627, 165999, 165927, 166006, 165997, 168688,
    168689, 168690, 160779, 160779, 160780, 160781, 165933, 165932, 166412,
    166413, 166002, 165594, 165595,
  ];

  return {
    fallback: false,
    paths: pathAry.map((e) => ({
      params: {
        themeId: String(e),
      },
    })),
  };
}

export default ThemeHome;
