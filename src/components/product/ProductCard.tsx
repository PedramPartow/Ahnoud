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
    <div className="bg-gray-1 overflow-hidden flex flex-col p-4 gap-4">
      <div className="flex gap-4">
        <div className="relative w-[104px] h-[104px] md:w-[160px] md:h-[160px] flex-shrink-0 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <span className="subtitle-03 text-gray-13">
            {product.name}
          </span>
          <span className="subtitle-03 text-gray-7">{product.category}</span>
          <span className="body-01 text-gray-13">
            ${product.price}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="flex items-center bg-gray-13 w-[104px] md:w-[160px]">
          <Button
            onClick={decrement}
            className="outline-gray sm-md"
          >
            <RemoveIcon />
          </Button>
          <div className="w-full text-center">
            <span className="text-gray-1 body-03">
              {quantity}
            </span>
          </div>
          <Button
            onClick={increment}
            className="outline-gray sm-md"
            >
            <AddIcon />
          </Button>
        </div>
        <Button className="primary sm-md" href="/checkout">
          <AddToCartIcon />
          <span className="button-01 text-gray-13">{t("add_to_cart_label")}</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;