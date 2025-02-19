import { IProductCard } from "../components/ProductCard/ProductCard";

export const sortProducts = (
  products: IProductCard[],
  sortField: string,
  sortDirection: string,
) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    let valueA, valueB;
    switch (sortField) {
      case "name":
      case "brand":
      case "barcode":
        valueA = a[sortField].toLowerCase();
        valueB = b[sortField].toLowerCase();
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      case "price":
      case "stock":
      case "rating":
      case "reviews_count":
        valueA = a[sortField];
        valueB = b[sortField];
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      default:
        valueA = a.id;
        valueB = b.id;
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }
  });
  return sortedProducts;
};
