import React from "react";
import Image from "next/image";
import classes from "./List.module.css";
import Link from "next/link";

const imgLoader = ({ src }) => src;

const List = ({ list }) => {
  return (
    <div style={{ marginTop: "60px" }}>
      <ul className={classes.container}>
        {list.map((e, idx) => (
          <Link href={`/detail/${e.productId}`} key={e.productId}>
            <li className={classes.list} key={e.productId}>
              <p className={classes.lank}>{idx + 1}</p>
              <Image
                style={{ borderRadius: "50%" }}
                loader={imgLoader}
                width={105}
                height={105}
                src={e.imageUrl}
              />
              <div className={classes.productInfo}>
                <p className={classes.brand}>{e.brandName}</p>
                <p className={classes.name}>{e.displayName}</p>
                <p className={classes.price}>
                  {e.discountedPrice.toLocaleString()}원
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default List;
