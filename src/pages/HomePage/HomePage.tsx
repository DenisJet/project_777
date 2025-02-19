import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TOKEN } from "../../constants/token.constant";
import { API_BASE_URL, API_ROUTES } from "../../constants/routes.constants";
import ProductCard, {
  IProductCard,
} from "../../components/ProductCard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../components/ui/pagination";
import { useToast } from "../../hooks/use-toast";

export default function HomePage() {
  const [productsLimit, setProductsLimit] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);

  const { toast } = useToast();

  // console.log("home-cookie:", document.cookie); // returns empty even though the token is set in cookies (remove after fixing)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}${API_ROUTES.getProducts}?page=${activePage}&limit=${productsLimit}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          },
        );

        if (response.status === 200) {
          setProducts(response.data.products);
          toast({ title: "Данные успешно загружены" });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({ title: `Ошибка! ${error.response?.data.detail}` });
          throw new Error(error.response?.data.message);
        }
      }
    };

    getProducts();
  }, [activePage, productsLimit]);

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
          <h2 className="text-3xl font-semibold mb-6">Products</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {products.map((product: IProductCard) => {
              return <ProductCard card={product} key={product.id} />;
            })}
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
