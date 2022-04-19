import React from "react";
import useFetch from "../../components/useFetch";
import HeadCommon from "../../components/layout/Head";
import ThemeList from "../../components/theme/ThemeList";

const ThemeHome = ({ data }) => {
  // console.log(data, "data");
  return (
    <React.Fragment>
      <HeadCommon meta={data && data} />
      <ThemeList data={data && data} />
    </React.Fragment>
  );
};

export async function getStaticProps(ctx) {
  const params = ctx.params.themeId;

  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/${
      params.includes("life") ? `codes/${params}` : params
    }`
  );

  const bannerItems = list.components.map((e) => e);

  const productGroup = bannerItems.filter((e) => e.type === "PRODUCT_GROUP");

  const tabs = productGroup.filter(
    (e) => e.property.collectionHead.type === "TAB"
  );

  const productId =
    tabs.length > 0
      ? tabs.map((e) => e.property.collections.map((e) => e.collectionId))
      : productGroup[0].property.collections[0].collectionId;

  let totalList = [];

  if (typeof productId === "object") {
    for (let i = 0; i < productId.flat().length; i++) {
      const { list: dataList } = await useFetch(
        `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=${
          productId.flat()[i]
        }&filteringSoldOut=true&sortProperty=PRIORITY`
      );

      totalList = {
        ...totalList,
        [i]: dataList,
      };
    }
  }

  const { list: dataList } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=${productId}&filteringSoldOut=true&sortProperty=PRIORITY`
  );

  const itemList = dataList.items.map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  // console.log(bannerItems);
  // Object.entries(totalList).map((e) => console.log(e));

  return {
    props: {
      data: {
        themeBanner: bannerItems,
        themeList: itemList,
        productId: productId,
        // data:
        //   totalList.length === 0
        //     ? itemList
        //     : Object.entries(totalList).map((e) => e.map((e) => e)),
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
        themeId: e.toString(),
      },
    })),
  };
}

export default ThemeHome;
