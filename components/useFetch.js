export const useFetch = async (url) => {
  const response = await fetch(url);
  console.log(url, "url");

  const list = await response.json();

  return { list };
};

export default useFetch;
