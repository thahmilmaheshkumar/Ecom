import React, { useEffect, useState } from "react";
import OrderTimeline from "../components/OrderTimeline";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../redux/products/productSlice";
import { review as submitReview } from "../redux/order/order";
import Rating from "../components/Rating";
import { IndianRupee, PackageCheckIcon, Star } from "lucide-react";
import { calculateDiscount } from "../helper/formate";
import toast from "react-hot-toast";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import Imageslider from "../components/Imageslider";

const steps = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const SingleOrder = () => {
  const { state } = useLocation();
  const status = state?.status || "Processing";

  const { productDetails } = useSelector((state) => state.product);
  const { message, error, success } = useSelector((state) => state.order);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      toast.success(message);
    }
  }, [message]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  //   useEffect(() => {
  //     console.log(rating);
  //   }, [rating]);

  const status_index = steps.indexOf(status);

  const handleAddReview = () => {
    dispatch(
      submitReview({
        rating,
        comment: reviewText,
        productId: id,
      }),
    );
  };

  return (
    <div>
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
        </div>
      </div>
      <OrderTimeline currentStep={status_index} />

      <div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`w-7 h-7 cursor-pointer ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Review */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          rows={5}
          className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAddReview}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg"
        >
          Submit Review
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SingleOrder;
