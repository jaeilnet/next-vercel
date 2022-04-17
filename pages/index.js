import React from "react";
import List from "../components/List";
import useFetch from "../components/useFetch";
import HeadCommon from "../components/layout/Head";

const Home = ({ itemsList }) => {
  return (
    <React.Fragment>
      <HeadCommon />
      <List list={itemsList} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  const itmesList = list.items.map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  return {
    props: {
      itemsList: itmesList,
    },
  };
}

export default Home;
