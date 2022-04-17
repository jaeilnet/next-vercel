import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from "./ThemeScreen.module.css";

// const ary = [
//   {
//     생일: [165624, 165625, 165626, 165627],
//   },
//   {
//     "건강/회복": [165999],
//   },
//   {
//     가벼운선물: [165927],
//   },
//   {
//     럭셔리: [166006],
//   },
//   {
//     어른: [165997],
//   },
//   {
//     명품: [168690, 168688, 168689],
//   },
//   {
//     출산: [160779, 160780, 160780],
//   },
//   {
//     쓸모: [165933],
//   },
//   {
//     응원: [165932],
//   },
//   {
//     취미: [166412, 166413],
//   },
//   {
//     결혼: [166002],
//   },
//   {
//     배달: [165594, 165595],
//   },
// ];

const imgLoader = ({ src }) => src;

const ThemeScreen = ({ data }) => {
  const [selectTheme, setSelectTheme] = useState(data[1][0]);

  const router = useRouter();

  const condition = data.filter((e) => e[0] === selectTheme);

  const path =
    condition[0][1].components[1].property.collections[0].collectionId;

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
                e[1].name === selectTheme ? classes.selectTheme : classes.theme
              }
              onClick={() => {
                handleSelectTeheme(e[0]);
                router.push(
                  `/theme/${
                    e[1].components[1].property.collections.length &&
                    e[1].components[1].property.collections[0].collectionId
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
