import React from "react";
import Head from "next/head";

const HeadCommon = ({ meta }) => {
  console.log(meta, "meta");
  const ogImage =
    "https://blog.kakaocdn.net/dn/bqCsrL/btrr5VxRKxV/adusUrS4nWZt0SNfY48yU0/img.jpg";

  return (
    <Head>
      <title>{meta?.displayName || "재일이의 넥스트js"}</title>
      <meta property="og:image" content={meta?.imageUrl || ogImage} />
      <meta
        property="og:description"
        content={meta?.discountedPrice || "넥스트 연습 desc og"}
      />
      <meta property="keyword" content="넥스트 연습 keyword" />
      <meta
        property="description"
        content={meta?.price || "넥스트 연습 desc og"}
      />
      <meta property="author" content="jaeilnet" />
    </Head>
  );
};

export default HeadCommon;
