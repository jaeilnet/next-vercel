import React from "react";
import SearchScreen from "../../components/SearchScreen";
import useFetch from "../../components/useFetch";

const SearchProduct = ({ searchData }) => {
  return (
    <React.Fragment>
      <SearchScreen searchData={searchData} />
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  console.log();
  const searchData = list.items.filter((e) =>
    e.displayName.includes(ctx.params.displayName.trim())
  );

  return {
    props: {
      searchData: searchData,
    },
  };
}

export default SearchProduct;
