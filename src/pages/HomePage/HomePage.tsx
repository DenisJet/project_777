import { useEffect, useState } from "react";
import ProductCard, {
  IProductCard,
} from "../../components/ProductCard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../components/ui/pagination";
import { sortProducts } from "../../helpers/sortProducts";
import { Badge } from "../../components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFetchProducts } from "../../hooks/useGetProducts";
import { useSort } from "../../hooks/useSort";

export default function HomePage() {
  const [productsLimit, setProductsLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const products = useFetchProducts(activePage, productsLimit);
  const { sortField, setSortField, sortDirection, toggleSortDirection } =
    useSort();

  // console.log("home-cookie:", document.cookie); // returns empty even though the token is set in cookies (remove after fixing)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (productsLimit === 5) {
          setProductsLimit(10);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productsLimit]);

  return (
    <div className="p-2">
      {products && (
        <div className="mb-6">
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h2 className="text-3xl font-semibold mb-2">Products</h2>
            <div className="flex items-center gap-1">
              <p>Sorted by:</p>
              <select
                name="select"
                className="bg-slate-700 cursor-pointer rounded-md"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="id">id</option>
                <option value="name">name</option>
                <option value="price">price</option>
                <option value="stock">stock</option>
                <option value="brand">brand</option>
                <option value="rating">rating</option>
                <option value="reviews_count">reviews_count</option>
                <option value="barcode">barcode</option>
              </select>
              <Badge onClick={toggleSortDirection} className="cursor-pointer">
                {sortDirection === "asc" ? <ChevronDown /> : <ChevronUp />}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {sortProducts(products, sortField, sortDirection).map(
              (product: IProductCard) => {
                return <ProductCard card={product} key={product.id} />;
              },
            )}
          </div>
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={activePage === 1}
              onClick={() => setActivePage(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={activePage === 2}
              onClick={() => setActivePage(2)}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={activePage === 3}
              onClick={() => setActivePage(3)}
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={activePage === 4}
              onClick={() => setActivePage(4)}
            >
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={activePage === 5}
              onClick={() => setActivePage(5)}
            >
              5
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
