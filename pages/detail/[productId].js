import React from "react";
import Detail from "../../components/Detail";
import HeadCommon from "../../components/layout/Head";
import useFetch from "../../components/useFetch";

const ProductDetail = ({ detailItems }) => {
  return (
    <React.Fragment>
      <HeadCommon meta={detailItems} />
      <Detail items={detailItems} />;
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const reqProductId = ctx.params.productId;

  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/products/${reqProductId}`
  );

  const result = list.itemDetails.item;

  return {
    props: {
      detailItems: {
        ...result,
        salePrice: result.sellingPrice,
      },
    },
  };
}

// export async function getStaticPaths() {
//   const { list } = await useFetch(
//     "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
//   );

//   return {
//     fallback: false,
//     paths: list.items.map((e) => ({
//       params: {
//         productId: e.productId.toString(),
//       },
//     })),
//   };
// }

export default ProductDetail;
