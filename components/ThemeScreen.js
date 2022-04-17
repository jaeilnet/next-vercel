import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ThemeList from "./ThemeList";
import classes from "./ThemeScreen.module.css";

const ary = [
  {
    생일: [165624, 165625, 165626, 165627],
  },
  {
    "건강/회복": [165999],
  },
  {
    가벼운선물: [165927],
  },
  {
    럭셔리: [166006],
  },
  {
    어른: [165997],
  },
  {
    명품: [168690, 168688, 168689],
  },
  {
    출산: [160779, 160780, 160780],
  },
  {
    쓸모: [165933],
  },
  {
    응원: [165932],
  },
  {
    취미: [166412, 166413],
  },
  {
    결혼: [166002],
  },
  {
    배달: [165594, 165595],
  },
];

const ThemeScreen = ({ data }) => {
  const [selectTheme, setSelectTheme] = useState(data[0][0]);

  const router = useRouter();

  // console.log(data, "data");

  // const path = data[1][1].components.filter(
  //   (e) => e.type === "PRODUCT_GROUP"
  // )[0].property.collections[0].collectionId;

  const handleSelectTeheme = (themeName) => {
    setSelectTheme(themeName);
  };

  return (
    <div className={classes.container}>
      <div className={classes.themeBox}>
        {data.map((e, i) => (
          <React.Fragment key={i}>
            <div
              // className={
              //   e[1].name.split("_")[1] === selectTheme.split("_")[1]
              //     ? classes.selectTheme
              //     : classes.theme
              // }
              onClick={() => {
                handleSelectTeheme(e[0]);
                router.push(`/theme/${path}`);
              }}
            >
              {/* {e[1].name.split("_")[1]} */}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={classes.content}>
        {/* <ThemeList data={data.filter((e) => e[0] === selectTheme)} /> */}
      </div>
    </div>
  );
};

export default ThemeScreen;
