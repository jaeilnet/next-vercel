import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import classes from "./ThemeScreen.module.css";

const imgLoader = ({ src }) => src;

const ThemeScreen = ({ data, banner }) => {
  const [selectTheme, setSelectTheme] = useState(data[1][0]);

  const router = useRouter();

  const condition = data.filter((e) => e[0] === selectTheme);

  const filter = banner
    ?.filter((e) => e.type === "PRODUCT_GROUP")
    .filter((e) => e.property.collectionHead.type === "TAB");

  const index =
    filter[0] && filter[0].property.collectionHead.property.defaultTabIndex;

  const tabPath =
    filter[0] &&
    filter[0].property.collectionHead.property.tabs[index].collectionId;

  console.log(tabPath, "vtabPath");

  const handleSelectTeheme = (themeName) => {
    setSelectTheme(themeName);
  };

  const renderBanner = (type, property) => {
    switch (type) {
      case "TEXT_BANNER":
        return (
          <div className={classes.bannerText}>
            <p>{property.subText}</p>
            <p>{property.mainText}</p>
            <p>{property.descriptionText}</p>
          </div>
        );
      case "IMAGE_BANNER":
        return (
          <div className={classes.imgBanner}>
            <Image
              loader={imgLoader}
              width="100%"
              height="100%"
              layout="fill"
              objectFit="contain"
              src={property?.banners[0].imageUrl}
            />
          </div>
        );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.themeBox}>
        {data.map((e, i) => (
          <React.Fragment key={i}>
            <div
              className={
                e[0] === selectTheme ? classes.selectTheme : classes.theme
              }
              onClick={() => {
                handleSelectTeheme(e[0]);
                console.log(banner);
                router.push(
                  `/theme/${
                    banner.length <= 1
                      ? e[1].components[1].property.collections[0].collectionId
                      : tabPath
                  }`
                );
              }}
            >
              {e[1].name.split("_")[1]}
            </div>
          </React.Fragment>
        ))}
      </div>
      {condition[0][1].components.map((e, i) => (
        <div key={i} className={classes.banner}>
          {renderBanner(e.type, e.property)}
        </div>
      ))}
    </div>
  );
};

export default ThemeScreen;
