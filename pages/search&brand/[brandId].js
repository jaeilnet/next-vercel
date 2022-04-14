import React from "react";
import List from "../../components/List";
import useFetch from "../../components/useFetch";

const SearchBrand = ({ searchData }) => {
  return (
    <React.Fragment>
      <List list={searchData} />
      <div>dd</div>
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  const searchData = list.items.filter(
    (e) => +e.brandId === +ctx.query.brandId
  );

  return {
    props: {
      searchData: searchData,
    },
  };
}

export default SearchBrand;
