import ProductCard, {
  IProductCard,
} from "../../components/ProductCard/ProductCard";
import { sortProducts } from "../../helpers/sortProducts";
import { Badge } from "../../components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFetchProducts } from "../../hooks/useGetProducts";
import { useSort } from "../../hooks/useSort";
import { usePagination } from "../../hooks/usePagination";
import PaginationComponent from "../../components/Pagination/Pagination";

export default function HomePage() {
  const { activePage, setActivePage, productsLimit } = usePagination();
  const products = useFetchProducts(activePage, productsLimit);
  const { sortField, setSortField, sortDirection, toggleSortDirection } =
    useSort();

  // console.log("home-cookie:", document.cookie); // returns empty even though the token is set in cookies (remove after fixing)

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
      <PaginationComponent
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}
