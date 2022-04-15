import React from "react";
import Head from "next/head";

const HeadCommon = ({ meta }) => {
  return (
    <Head>
      <title>{meta ? meta.displayName : "재일이의 넥스트js"}</title>
      <meta
        name="og:title"
        content={meta ? meta.displayName : "재일이의 넥스트js"}
      />
      <meta
        name="og:image"
        content={
          meta
            ? meta.imageUrl
            : "https://blog.kakaocdn.net/dn/bqCsrL/btrr5VxRKxV/adusUrS4nWZt0SNfY48yU0/img.jpg"
        }
      />
      <meta
        name="og:description"
        content={meta ? meta.discountedPrice : "넥스트 연습 desc og"}
      />
      <meta name="keyword" content="넥스트 연습 keyword" />
      <meta
        name="description"
        content={meta ? meta.price : "넥스트 연습 desc og"}
      />
      <meta name="author" content="jaeilnet" />
    </Head>
  );
};

export default HeadCommon;
