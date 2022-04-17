import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Card from "./card/Card";
import classes from "./ThemeList.module.css";

const imgLoader = ({ src }) => src;

const ThemeList = ({ data }) => {
  const router = useRouter();

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
      case "PRODUCT_GROUP":
        return (
          <div className={classes.content}>
            {property.collections[0].items.map((e) => (
              <Card onClick={() => router.push(`/detail/${e.productId}`)}>
                <Image
                  style={{ borderRadius: "8px" }}
                  src={e.imageUrl}
                  loader={imgLoader}
                  width={305}
                  height={305}
                  layout="responsive"
                  objectFit="contain"
                />
                <div className={classes.productInfo}>
                  <p>{e.brandName}</p>
                  <p>{e.displayName}</p>
                  <p>{e.salePrice.toLocaleString() + "원"}</p>
                </div>
              </Card>
            ))}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div>
      {data[0][1].components.map((e, i) => (
        <div key={i} className={classes.banner}>
          {renderBanner(e.type, e.property)}
        </div>
      ))}
    </div>
  );
};

export default ThemeList;
