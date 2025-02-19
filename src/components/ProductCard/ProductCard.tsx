import { Card } from "../ui/card";

export interface IProductCard {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  stock: number;
  category: string;
  created_at: string;
  updated_at: string;
  brand: string;
  weight: number;
  dimensions: string;
  color: string;
  rating: number;
  reviews_count: number;
  images: string[];
  seller_id: number;
  warranty_period: number;
  return_policy: string;
  barcode: string;
}

export default function ProductCard({ card }: { card: IProductCard }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/default.png";
  };

  return (
    <Card className="bg-slate-800 p-6 text-sm">
      <div className="flex flex-wrap gap-4 justify-around">
        <img
          className="max-w-[175px] max-h-[175px]"
          src={card.images[0]}
          onError={handleError}
          alt={card.name}
        />
        <div className="flex flex-wrap gap-4">
          <div>
            <p>Name: {card.name}</p>
            <p>Description: {card.description}</p>
            <p>Price: {card.price}</p>
            <p>Discount price: {card.discount_price}</p>
            <p>Stock: {card.stock}</p>
            <p>Category: {card.category}</p>
            <p>Created at: {card.created_at}</p>
            <p>Updated at: {card.updated_at}</p>
            <p>Brand: {card.brand}</p>
          </div>
          <div>
            <p>Weight: {card.weight}</p>
            <p>Dimensions: {card.dimensions}</p>
            <p>Color: {card.color}</p>
            <p>Rating: {card.rating}</p>
            <p>Reviews count: {card.reviews_count}</p>
            <p>Seller id: {card.seller_id}</p>
            <p>Warranty period: {card.warranty_period}</p>
            <p>Return policy: {card.return_policy}</p>
            <p>Barcode: {card.barcode}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
