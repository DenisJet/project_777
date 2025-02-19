import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TOKEN } from "../../constants/token.constant";
import { API_BASE_URL, API_ROUTES } from "../../constants/routes.constants";
import ProductCard, {
  IProductCard,
} from "../../components/ProductCard/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  console.log("home-cookie:", document.cookie); // returns empty even though the token is set in cookies

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}${API_ROUTES.getProducts}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          },
        );

        if (response.status === 200) {
          console.log("getProducts", response.data.products);
          setProducts(response.data.products);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("getProducts-error", error.response?.data.message);
          throw new Error(error.response?.data.message);
        }
      }
    };

    getProducts();
  }, []);

  return (
    <div className="px-2">
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
    </div>
  );
}
