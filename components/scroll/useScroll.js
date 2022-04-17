import { useEffect, useState } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
      let windowHeight = window.innerHeight; // 스크린 창
      let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x

      scrollLocation + windowHeight >= fullHeight
        ? setScroll(true)
        : setScroll(false);

      return () => {
        setScroll(false);
      };
    });
  }, []);

  return { scroll };
};

export default useScroll;
