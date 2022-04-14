import React from "react";
import Detail from "../../components/Detail";
import HeadCommon from "../../components/Head";
import useFetch from "../../components/useFetch";

const ProductDetail = ({ detailItems }) => {
  return (
    <React.Fragment>
      <HeadCommon meta={detailItems[0]} />
      <Detail items={detailItems[0]} />;
    </React.Fragment>
  );
};

export async function getStaticProps(ctx) {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  const filter = list.items.filter(
    (e) => e.productId === +ctx.params.productId
  );

  return {
    props: {
      detailItems: filter,
    },
  };
}

export async function getStaticPaths() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  return {
    fallback: false,
    paths: list.items.map((e) => ({
      params: { productId: e.productId.toString() },
    })),
  };
}

export default ProductDetail;
