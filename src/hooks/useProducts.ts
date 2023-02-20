import { useState, useEffect, useRef } from "react";

export const useProducts = (
  pageNumber: number = 1,
  searchContent: string = ""
) => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const searchChange = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const urlSearch = `https://dummyjson.com/products/search?q=${searchContent}&limit=20&skip=${
        (pageNumber - 1) * 20
      }`;
      const urlFetchAllProducts = `https://dummyjson.com/products?limit=20&skip=${
        (pageNumber - 1) * 20
      }`;
      const urlFetchData = !!searchContent ? urlSearch : urlFetchAllProducts;
      setIsLoading(true);
      try {
        const respond = await fetch(urlFetchData);
        const data = await respond.json();
        console.log(data);
        if (searchContent === "" && searchChange.current === null) {
          setProductList((pre) => [...pre, ...data.products]);
          setHasNextPage(Boolean(data.products.length));
          setIsLoading(false);
        }
        if (!!searchContent) {
          searchChange.current = searchContent;
          setProductList([...data.products]);
          setIsLoading(false);
        }

        if (searchContent === "" && !!searchChange.current) {
          searchChange.current = null;
          setProductList([...data.products]);
          setHasNextPage(Boolean(data.products.length));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pageNumber, searchContent]);
  // return value
  return { productList, isLoading, hasNextPage };
};
