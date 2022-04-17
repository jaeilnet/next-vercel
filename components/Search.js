import React, { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
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
    const searchText = searchValue.toUpperCase() || searchValue.toUpperCase();
    searchText.trim().length > 0 && router.pathname === "/theme"
      ? router.push(`/search&theme/${searchValue}`)
      : router.push(`/search/${searchValue}`);
  };

  return (
    <React.Fragment>
      <input
        value={searchValue}
        type="text"
        placeholder="검색 ---"
        onChange={onChange}
        onKeyUp={onEnterPress}
      />
      <button onClick={onSearch}>검색</button>
    </React.Fragment>
  );
};

export default Search;
