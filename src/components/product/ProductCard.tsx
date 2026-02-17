"use client";

import AddIcon from "@/icons/AddIcon";
import AddToCartIcon from "@/icons/AddToCartIcon";
import RemoveIcon from "@/icons/RemoveIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Button from "../general/Button";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-gray-1 rounded-2xl overflow-hidden shadow-md flex flex-col">
      <div className="flex gap-4 p-4">
        <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src='/images/product2.png'
            alt={product.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="text-lg font-semibold text-gray-900">
            {product.name}
          </span>
          <span className="text-sm text-primary">{product.category}</span>
          <span className="text-lg font-semibold text-gray-900">
            ${product.price}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 pt-0">
        <div className="flex items-center bg-gray-900 rounded-xl overflow-hidden">
          <Button
            onClick={decrement}
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-gray-700 transition-colors"
          >
            <RemoveIcon size={20} color="white" />
          </Button>
          <span className="text-white text-sm font-medium w-8 text-center">
            {quantity}
          </span>
          <Button
            onClick={increment}
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-gray-700 transition-colors"
          >
            <AddIcon size={20} color="white" />
          </Button>
        </div>
        <Button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl h-10 hover:opacity-90 transition-opacity">
          <AddToCartIcon size={20} color="white" />
          <span className="text-sm font-medium">{t("add_to_cart_label")}</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;