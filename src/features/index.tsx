import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useProducts, useDebounce } from "../hooks";
import { Product, SearchBar } from "./infinitescroll/components";

export interface InfiniteScrollProps {}

export default function InfiniteScroll(props: InfiniteScrollProps) {
  const [pageNum, setPageNum] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const debouncedValue = useDebounce(searchContent, 500);
  const { productList, isLoading, hasNextPage } = useProducts(
    pageNum,
    debouncedValue
  );
  // implement search
  const handleOnChange = (e) => {
    setSearchContent(e.target.value);
    setPageNum(1);
  };
  // implement infinite scroll
  const observer = useRef(null);
  const lastProductRef = useCallback(
    (prod) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((prods) => {
        if (prods[0].isIntersecting && hasNextPage && !debouncedValue) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (prod) observer.current.observe(prod);
    },
    [hasNextPage, isLoading]
  );

  const content = productList.map((product: any, idx) => {
    if (productList.length === idx + 1)
      return (
        <Grid item key={product.id} xs={12} sm={6} md={3}>
          <Product ref={lastProductRef} product={product} />
        </Grid>
      );
    return (
      <Grid item key={product.id} xs={12} sm={6} md={3}>
        <Product product={product} />
      </Grid>
    );
  });

  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", pt: 4, pb: 4 }}>
        <Container maxWidth="md">
          <SearchBar onChange={handleOnChange} />
        </Container>
      </Box>
      <Box sx={{ bgcolor: "background.paper", pt: 2, pb: 2 }}>
        <Container maxWidth="md">
          {isLoading && <p>Loading data...</p>}
          <Grid container spacing={2}>
            {content}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
