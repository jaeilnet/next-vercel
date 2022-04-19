import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import classes from "./ThemeScreen.module.css";

const imgLoader = ({ src }) => src;

const ThemeScreen = ({ data }) => {
  const [selectTheme, setSelectTheme] = useState(data.name);

  const router = useRouter();

  // const condition = data.filter((e) => e[0] === selectTheme);

  // const filter = banner
  //   ?.filter((e) => e.type === "PRODUCT_GROUP")
  //   .filter((e) => e.property.collectionHead.type === "TAB");

  // const index =
  //   filter[0] && filter[0].property.collectionHead.property.defaultTabIndex;

  // const tabPath =
  //   filter[0] &&
  //   filter[0].property.collectionHead.property.tabs[index].collectionId;

  // console.log(tabPath, "vtabPath");

  const handleSelectTheme = (themeName) => {
    setSelectTheme(themeName);
  };

  const handleUrl = (url) => {
    const _split = url.split("/");

    const split = _split[_split.length - 1];

    // return split.includes("life") ? `/pages/codes/${split}` : `pages/${split}`;
    return split;
  };

  return (
    <div className={classes.container}>
      <div className={classes.themeBox}>
        {data.map((e) => {
          return (
            <Link key={e.id} href={`/theme/${handleUrl(e.linkUrl)}`}>
              <div
                className={classes.themeCard}
                onClick={() => {
                  handleSelectTheme(e.name);
                }}
              >
                <div>
                  <Image
                    src={e.images[0]}
                    width={80}
                    height={80}
                    loader={imgLoader}
                  />
                </div>
                <div
                  className={
                    e.name === selectTheme ? classes.selectTheme : classes.theme
                  }
                >
                  {e.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* {condition[0][1].components.map((e, i) => (
        <div key={i} className={classes.banner}>
          {renderBanner(e.type, e.property)}
        </div>
      ))} */}
    </div>
  );
};

export default ThemeScreen;
