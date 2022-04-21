import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import classes from "./ThemeScreen.module.css";

const imgLoader = ({ src }) => src;

const ThemeScreen = ({ data }) => {
  const [selectTheme, setSelectTheme] = useState(data.name);

  const handleSelectTheme = (themeName) => {
    setSelectTheme(themeName);
  };

  const handleUrl = (url) => {
    const _split = url.split("/");

    const split = _split[_split.length - 1];

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
                    style={{ borderRadius: "8px" }}
                    src={e.images[0]}
                    width={80}
                    height={80}
                    loader={imgLoader}
                    layout="fixed"
                    objectFit="contain"
                    unoptimized={true}
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
    </div>
  );
};

export default ThemeScreen;
