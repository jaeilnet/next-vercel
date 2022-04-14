import React, { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = () => {
    searchValue.trim().length > 0
      ? router.push(`/search/${searchValue}`)
      : alert("검색어를 입력해주세요");
  };

  return (
    <React.Fragment>
      <input
        value={searchValue}
        type="text"
        placeholder="검색 ---"
        onChange={onChange}
        onKeyPress={onSearch}
      />
      <button onClick={onSearch}>검색</button>
    </React.Fragment>
  );
};

export default Search;
