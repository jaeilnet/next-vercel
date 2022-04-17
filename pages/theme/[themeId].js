import React from "react";
import ThemeScreen from "../../components/ThemeScreen";
import useFetch from "../../components/useFetch";
import ThemeList from "../../components/ThemeList";
import ThemeTap from "../../components/ThemeTap";

const ThemeHome = ({ data }) => {
  // console.log(data, "data");
  return (
    <React.Fragment>
      {/* <ThemeScreen data={data.themeName} /> */}
      <ThemeTap />
      <ThemeList data={data.themeList} />
    </React.Fragment>
  );
};

export async function getStaticProps(ctx) {
  // console.log(ctx, "ctx");
  const { list: name } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650198967511"
  );

  const themeName = name.themes[0].themes.map((e) => e.name);

  const _theme = name.themes[0].themes.map((e) => e.linkUrl.split("/"));

  const themeUrl = _theme.map((e) => e[e.length - 1]);

  let totalArray = [];

  for (let i = 0; i < themeUrl.length; i++) {
    console.log(+themeUrl[i], "aa");
    const { list: themeList } = await useFetch(
      `https://gift.kakao.com/a/v1/pages${
        +themeUrl[i] === NaN ? `/codes/${themeUrl[i]}` : `/${themeUrl[i]}`
      }`
    );

    totalArray = {
      ...totalArray,
      [themeName[i]]: themeList,
    };
  }

  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=${ctx.params.themeId}&filteringSoldOut=true&sortProperty=PRIORITY`
  );

  const itmesList = list.items.map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  return {
    props: {
      data: {
        themeName: Object.entries(totalArray),
        themeList: itmesList,
      },
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
    fallback: true,
    paths: pathAry.map((e) => ({
      params: {
        themeId: String(e),
      },
    })),
  };
}

export default ThemeHome;
