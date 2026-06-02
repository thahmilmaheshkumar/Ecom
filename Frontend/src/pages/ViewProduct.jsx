import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { IndianRupee, Minus, PackageCheckIcon, Plus } from "lucide-react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import Imageslider from "../components/Imageslider";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  removeError,
} from "../redux/products/productSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { calculateDiscount } from "../helper/formate";

const ViewProduct = () => {
  const { productDetails, loading, error } = useSelector(
    (state) => state.product,
  );

  const [cartNumber, setCartNumber] = useState(1);
  const [cartNumber, setCartNumber] = useState(1);

  const plus = () => {
    setCartNumber((pre) => pre + 1);
  };
  const minus = () => {
    setCartNumber((pre) => (pre === 1 ? 1 : pre - 1));
  };

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navebar />
      <div className="max-w-6xl md:w-200 mx-auto my-8 items-center shadow-lg p-6 rounded-4xl flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full flex-1">
          {productDetails?.images.length > 1 ? (
            <Imageslider image={productDetails.images} isproductpage={true} />
          ) : (
            <img
              src={productDetails?.images[0].urls}
              alt="Product"
              className="w-full h-67 md:h-87 hover:scale-105 transition-transform duration-300 rounded-2xl object-cover"
            />
          )}
        </div>

        {/* content */}
        <div className="flex-1 h-full flex-col gap-4 ">
          <h1 className="text-2xl font-bold">{productDetails?.name}</h1>
          <Rating rating={4} reviews={120} />

          <div className="flex items-center gap-4">
            <p className="text-9xl align-middle text-blue-600 flex gap-2 items-center font-semibold">
              <IndianRupee size={18} />
              <span className="text-2xl">{productDetails?.price}</span>
            </p>
            <p className="flex line-through text-gray-400 items-center gap-0.5">
              <IndianRupee size={18} /> {productDetails?.mrp}
            </p>
            <p className="flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
              {calculateDiscount(productDetails?.mrp, productDetails?.price)}%
              OFF
            </p>
          </div>

          <p className="text-gray-600 mb-3">{productDetails?.description}</p>

          <div
            className={`flex gap-3 ${productDetails?.stock > 0 ? "text-green-500 my-5" : "text-red-500 my-5"} `}
          >
            <PackageCheckIcon />
            <span>{`${productDetails?.stock > 0 ? `IN STOCK (${productDetails?.stock} Available)` : "f"}`}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 border w-max px-4 py-2 rounded-full">
              <button
                onClick={minus}
                className="hover:text-blue-700 hover:scale-110 cursor-pointer"
              >
                <Minus />
              </button>

              <span className="text-2xl">{cartNumber}</span>

              <button
                onClick={plus}
                className="hover:text-blue-700 hover:scale-110 cursor-pointer"
              >
                <Plus />
              </button>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 cursor-pointer hover:scale-105 ">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full flex gap-4 flex-col items-center justify-center">
        {/* reviews */}
        <h2 className="font-semibold text-3xl text-blue-600">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
          {productDetails?.reviews?.map((review, index) => (
            <div
              key={index}
              className="min-h-30 w-screen md:w-100 border-transparent hover:shadow-2xl hover:border-blue-600 hover:border-3  transition-all duration-200 flex flex-col gap-3 shadow-lg rounded-4xl overflow-hidden p-7"
            >
              <div className=" flex gap-3 ">
                <img
                  className="object-cover rounded-full h-14 w-14"
                  src={review?.avathar}
                  alt={review.name}
                />

                <div>
                  <h3>{review?.name}</h3>
                  <Rating rating={review?.rating} />
                </div>
              </div>

              <div>
                <p>{review?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewProduct;
