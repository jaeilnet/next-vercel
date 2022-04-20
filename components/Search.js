import React, { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = () => {
    // 여유되면 테마검색도

    if (searchValue.trim().length === 0) {
      return alert("입력해주세요");
    }

    switch (selectValue) {
      case "brand":
        return router.push(`/search&brand/${searchValue}`);

      case "item":
        return router.push(`/search/${searchValue}`);

      case "default":
      default:
        return;
    }
  };

  const disabled = (type) => {
    const conditionAry = ["default", "", "brand"];

    return conditionAry.includes(type) ? true : false;
  };

  return (
    <React.Fragment>
      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="default">검색어를 설정해주세요</option>
        <option value="brand">브랜드 검색</option>
        <option value="item">상품명 검색</option>
      </select>
      <input
        value={searchValue}
        type="text"
        placeholder={disabled(selectValue) ? "검색 불가능" : "검색 가능"}
        onChange={onChange}
        onKeyUp={onEnterPress}
        disabled={disabled(selectValue)}
      />
      <button onClick={onSearch}>검색</button>
    </React.Fragment>
  );
};

export default Search;
