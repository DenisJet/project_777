import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TOKEN } from "../../constants/token.constant";
import { API_BASE_URL, API_ROUTES } from "../../constants/routes.constants";

export default function HomePage() {
  const [products, setProducts] = useState([]);

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
      Home Page
      {products && (
        <div>
          <h2>Products</h2>
          {products.map((product) => {
            return <p key={product.id}>{product.name}</p>;
          })}
        </div>
      )}
    </div>
  );
}
