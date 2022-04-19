import React from "react";
import useFetch from "../components/useFetch";
import HeadCommon from "../components/layout/Head";
import ThemeScreen from "../components/theme/ThemeScreen";

const Home = ({ data }) => {
  return (
    <React.Fragment>
      <HeadCommon />
      <ThemeScreen data={data} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650198967511"
  );

  const themeList = list.themes[0].themes;

  return {
    props: {
      data: themeList,
    },
  };
}

export default Home;
