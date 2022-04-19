import React from "react";
import useFetch from "../../components/useFetch";
import HeadCommon from "../../components/layout/Head";
import ThemeScreen from "../../components/theme/ThemeScreen";
import ThemeTap from "../../components/theme/ThemeTap";
import ThemeList from "../../components/theme/ThemeList";
import classes from "../../components/theme/ThemeTap.module.css";

const ThemeHome = ({ data }) => {
  const banner =
    data &&
    data.themeTabs
      .filter((e) => e.type === "PRODUCT_GROUP")
      .filter((e) => e.property.collectionHead.type !== "NONE");

  const renderBanner = (type, property, items, i) => {
    switch (type) {
      case "TAB": {
        return (
          <div className={classes.container}>
            {property?.tabs.map((e, i) => (
              <ThemeTap
                key={i}
                tabs={e}
                collectionId={property.tabs[0].collectionId}
              />
            ))}
          </div>
        );
      }
      case "TITLE": {
        return (
          <React.Fragment key={i}>
            <h1>{property.displayTitle}</h1>
            <ThemeList data={items.map((e) => e)} />
          </React.Fragment>
        );
      }

      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <HeadCommon meta={data} />
      {data && banner && (
        <>
          <ThemeScreen data={data.themeName} banner={banner} />
          {banner.map((e, idx) =>
            renderBanner(
              e.property.collectionHead.type,
              e.property.collectionHead.property,
              e.property.collections[0].items,
              idx
            )
          )}
          <ThemeList data={data.themeList} />
        </>
      )}
    </React.Fragment>
  );
};

export async function getStaticProps(ctx) {
  const { list: name } = await useFetch(
    "https://gift.kakao.com/a/v1/home/contents?_=1650198967511"
  );

  const themeName = name.themes[0].themes.map((e) => e.name);

  const _theme = name.themes[0].themes.map((e) => e.linkUrl.split("/"));

  const themeUrl = _theme.map((e) => e[e.length - 1]);

  let totalArray = [];

  for (let i = 0; i < themeUrl.length; i++) {
    const { list: themeList } = await useFetch(
      `https://gift.kakao.com/a/v1/pages${
        isNaN(+themeUrl[i]) ? `/codes/${themeUrl[i]}` : `/${themeUrl[i]}`
      }`
    );

    totalArray = {
      ...totalArray,
      [themeName[i]]: themeList,
    };
  }

  const { list } = await useFetch(
    `https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds=${ctx.params.themeId}&filteringSoldOut=true&sortProperty=PRIORITY`
  );

  const itemList = list.items.map((e, i) => ({
    ...e,
    rank: i + 1,
  }));

  const filter = Object.entries(totalArray).filter(
    (e) =>
      e[1].components[1].property.collections[0].collectionId ===
      +ctx.params.themeId
  );

  const themeTabs =
    filter.length > 1
      ? filter[0][1].components.filter((e) => e.type === "PRODUCT_GROUP")
      : [];

  return {
    props: {
      data: {
        themeName: Object.entries(totalArray),
        themeList: itemList,
        themeTabs: themeTabs,
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
