import React from "react";
import List from "../components/List";
import useFetch from "../components/useFetch";
import HeadCommon from "../components/Head";

const Home = ({ itemsList }) => {
  return (
    <React.Fragment>
      <HeadCommon />
      <List list={itemsList.items} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  return {
    props: {
      itemsList: list,
    },
  };
}

export default Home;
