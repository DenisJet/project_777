import { useState, useEffect } from "react";

export const usePagination = () => {
  const [activePage, setActivePage] = useState(1);
  const [productsLimit, setProductsLimit] = useState(5);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (productsLimit === 5) {
          setProductsLimit(10);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [productsLimit]);

  return {
    activePage,
    setActivePage: handlePageChange,
    productsLimit,
    setProductsLimit,
  };
};
