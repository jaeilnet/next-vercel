import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import classes from "./ThemeList.module.css";
import Card from "../card/Card";

const imgLoader = ({ src }) => src;

const ThemeList = ({ data }) => {
  const router = useRouter();

  const dataList =
    data?.data.length === undefined ? Object.entries(data?.data) : data?.data;

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
      default:
        return;
    }
  };

  const renderTaps = (type, property) => {
    switch (type) {
      case "TAB":
        return (
          <div className={classes.tabBox}>
            {dataList.map((e, i) => (
              <div key={i}>
                <div className={classes.tabButton}> {e[0]}</div>
                <div className={classes.content}>
                  {e[1].map((e, i) => renderList(e, i))}
                </div>
              </div>
            ))}
          </div>
        );

      case "TITLE":
        return (
          <div>
            <div className={classes.tabContainer}>
              <div className={classes.tabBox}>
                {property.collectionHead.property.displayTitle}
              </div>
            </div>
            <div className={classes.content}>
              {property.collections[0].items.map((e, i) => (
                <React.Fragment key={i}>{renderList(e, i)}</React.Fragment>
              ))}
            </div>
          </div>
        );
      case "NONE":
        return (
          <div className={classes.content}>
            {dataList.map((e, i) => (
              <React.Fragment key={i}>{renderList(e, i)}</React.Fragment>
            ))}
          </div>
        );
      default:
        break;
    }
  };

  const renderList = (e, i) => {
    return (
      <Card
        key={e.rank ? e.rank : i}
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
    );
  };

  return (
    <React.Fragment>
      {data?.themeBanner.map((e, i) => {
        return (
          <React.Fragment key={i}>
            {renderBanner(e.type, e.property)}
            {renderTaps(e.property.collectionHead?.type, e.property)}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ThemeList;
