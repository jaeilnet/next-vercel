import React from "react";
import HeadCommon from "../../components/layout/Head";
import List from "../../components/List";
import useFetch from "../../components/useFetch";

const SearchBrand = ({ searchData }) => {
  return (
    <React.Fragment>
      <HeadCommon meta={searchData} />
      <List list={searchData} />
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const params = ctx.params.brandId;
  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/brand/${params}`
  );

  const filter = list.components.filter((e) => e.type === "PRODUCT_GROUP");

  const data = filter[0].property.collections[0].items;

  return {
    props: {
      searchData: data,
    },
  };
}

export default SearchBrand;
