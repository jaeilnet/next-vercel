import React, { useState } from "react";
import Image from "next/image";
import classes from "./Detail.module.css";
import { useRouter } from "next/router";

const imgLoader = ({ src }) => {
  return src;
};

const List = ({ items }) => {
  const router = useRouter();

  const [showDetail, setShowDetail] = useState(false);

  const styles = {
    margin: "0 auto",
    marginTop: "30px",
    zIndex: "99",
    background: "#fff",
    padding: "20px",
    boxShadow: " 0px 10px 10px 12px rgb(116 116 116 / 20%)",
    borderRadius: "12px",
  };

  const renderProductInfo = () => {
    return (
      <div
        className={classes.productDetail}
        dangerouslySetInnerHTML={{ __html: items.productDetailDescription }}
      ></div>
    );
  };
  return (
    <div className={classes.container} key={items.productId}>
      <div
        className={classes.bg}
        style={{ backgroundImage: `url(${items.imageUrl})` }}
      ></div>
      <div className={classes.items} style={styles}>
        <div className={classes.title}>{items.displayName}</div>
        <div className={classes.content}>
          <div className={classes.productInfo}>
            <Image
              style={{ borderRadius: "8px" }}
              loader={imgLoader}
              width={500}
              height={500}
              src={items.imageUrl}
              alt={items.displayName}
            />
            <div className={classes.productText}>
              <div className={classes.bottom}>
                <h2>{items.brandName}</h2>
                <h2>{items.name}</h2>
                <h2>{items.salePrice.toLocaleString()}원</h2>
                <button
                  className={classes.button}
                  onClick={() => router.push(`/search&brand/${items.brandId}`)}
                >
                  같은 브랜드 다른 제품 보기
                </button>
                <button onClick={() => setShowDetail(!showDetail)}>
                  제품 상세정보 보기
                </button>
              </div>
            </div>
          </div>
          <div className={classes.productTextBox}>
            {showDetail &&
              items.announcements.map((e) => (
                <div>
                  <div className={classes.productTitle}>{e.name}</div>
                  <div className={classes.productDesc}>{e.value}</div>
                </div>
              ))}
          </div>
          {renderProductInfo()}
        </div>
      </div>
    </div>
  );
};

export default List;
