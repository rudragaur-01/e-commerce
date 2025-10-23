"use client";

import useCartStore from "@/stores/CartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const {addToCart} = useCartStore()

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductType((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart=()=>{
    addToCart({
      ...product,
      quantity:1,
      selectedSize:productType.size,
      selectedColor:productType.color
    })
 
toast.success("Product added to cart")
  }

  return (
    <div className="shadow-lg rounded-md overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productType.color]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium line-clamp-1">{product.name}</h1>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* PRODUCT TYPE */}
        <div className="flex items-center justify-between gap-6 text-xs mt-2">
          {/* SIZE */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-600 font-medium tracking-wide">
              Size
            </span>
            <select
              name="size"
              id="size"
              className="min-w-[70px] bg-white ring-1 ring-gray-300 rounded-md px-2 py-1.5 text-gray-800 font-medium text-sm cursor-pointer transition-all duration-200 hover:ring-gray-400 focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
              value={productType.size}
            >
              {product.sizes.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-gray-800 text-white font-semibold"
                >
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* COLOR */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-gray-600 font-medium tracking-wide">
              Color
            </span>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  className={`relative cursor-pointer border-2 rounded-full transition-all duration-200 p-[1.2px] ${
                    productType.color === color
                      ? "border-gray-400  shadow-sm"
                      : "border-gray-200 hover:border-gray-300 "
                  }`}
                >
                  <div
                    className="w-[18px] h-[18px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE AND ADD TO CART BUTTON */}
        <div className=" flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button onClick={handleAddToCart} className=" flex items-center gap-2 ring-1 ring-gray-200 rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
