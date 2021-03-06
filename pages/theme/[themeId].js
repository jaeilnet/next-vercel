import React from "react";
import useFetch from "../../components/useFetch";
import HeadCommon from "../../components/layout/Head";
import ThemeList from "../../components/theme/ThemeList";

const ThemeHome = ({ data }) => {
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

  const tabName =
    tabs.length > 0 ? tabs[0].property.collectionHead.property.tabs : null;

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
        [tabName ? tabName[i].tabName : [i]]: dataList.items,
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

  return {
    props: {
      data: {
        themeBanner: bannerItems,
        productId: productId,
        data: totalList.length === 0 ? itemList : totalList,
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650198967511"
  );

  const _pathName = list.themes[0].themes.map((e) => e.linkUrl);

  const pathName = _pathName.map((e) => e.split("/"));

  return {
    fallback: false,
    paths: pathName.map((e) => ({
      params: {
        themeId: e[e.length - 1],
      },
    })),
  };
}

export default ThemeHome;
