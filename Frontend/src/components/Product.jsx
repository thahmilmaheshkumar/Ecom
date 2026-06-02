import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product, rating }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="rounded-4xl p-4 flex flex-col shadow-lg items-center gap-2 hover:shadow-2xl transition"
    >
      <div className="m-4 p-4 w-full cursor-pointer rounded-md transition flex flex-col gap-2">
        <div className="h-64 w-full">
          <img
            src={product.images[0].urls}
            alt={product.name}
            className="w-full h-full object-cover rounded-md mb-4 hover:scale-105 transition-transform"
          />
        </div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <Rating rating={rating} />
        <div className="flex items-center justify-between">
          <p>Price: ${product.price.toFixed(2)}</p>
          <button className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
