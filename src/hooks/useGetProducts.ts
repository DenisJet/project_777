import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { TOKEN } from "../constants/token.constant";
import { API_BASE_URL, API_ROUTES } from "../constants/routes.constants";
import { IProductCard } from "../components/ProductCard/ProductCard";
import { useToast } from "./useToast";

export const useFetchProducts = (activePage: number, productsLimit: number) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}${API_ROUTES.getProducts}?page=${activePage}&limit=${productsLimit}`,
          {
            headers: { Authorization: TOKEN },
          },
        );

        if (response.status === 200) {
          setProducts(response.data.products);
          toast({ title: "Данные успешно загружены" });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({ title: `Ошибка! ${error.response?.data.detail}` });
        }
      }
    };

    fetchProducts();
  }, [activePage, productsLimit, toast]);

  return products;
};
