import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import classes from "./ThemeList.module.css";
import Card from "../card/Card";

const imgLoader = ({ src }) => src;

const ThemeList = ({ data }) => {
  const router = useRouter();

  return (
    <div className={classes.content}>
      {data.map((e) => (
        <Card
          key={e.rank}
          onClick={() => router.push(`/detail/${e.productId}`)}
        >
          <div>
            <Image
              style={{ borderRadius: "8px" }}
              src={e.imageUrl}
              loader={imgLoader}
              width={305}
              height={305}
              layout="responsive"
              objectFit="contain"
              unoptimized={true}
            />
          </div>
          <div className={classes.productInfo}>
            <p>{e.brandName}</p>
            <p>{e.displayName}</p>
            <p>{e.salePrice?.toLocaleString() + "원"}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ThemeList;
