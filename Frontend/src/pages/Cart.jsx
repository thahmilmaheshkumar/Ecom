import React, { useEffect } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { BadgeIndianRupee, IndianRupee, Trash, Trash2 } from "lucide-react";
import CartItems from "../components/CartItems";
import {
  clearCart,
  order,
  removeError,
  removeSuccess,
} from "../redux/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, loading, message, success, error } = useSelector(
    (state) => state.cart,
  );
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingCharges = cartItems.length === 0 ? 0 : subTotal > 500 ? 0 : 50;
  const tax = subTotal * 0.18;
  const total = subTotal + shippingCharges + tax;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(removeSuccess());
    }
  }, [dispatch, message, success]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrder = () => {
    const address = {
      street: "arachalur",
      city: "Erode",
      state: "tamilnadu",
      pincode: "688e7",
    };
    dispatch(
      order({
        products: cartItems,
        tax,
        shipping: shippingCharges,
        total,
        address,
      }),
    );
  };

  return (
    <>
      <Navebar />
      <main className="flex gap-7 w-full flex-col md:flex-row md:justify-between p-2">
        <div className="w-full flex-2 p-5 min-h-20 shadow-2xl rounded-2xl">
          <div className="flex mt-3 justify-between">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <button
              onClick={handleClearCart}
              className="flex text-red-500 cursor-pointer hover:scale-110 transition ease-in duration-100"
            >
              <Trash2 />
              <p>Clear Cart</p>
            </button>
          </div>

          <div className="md:p-5 h-full flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <p className="h-full w-full flex items-center justify-center text-2xl font-semibold">
                No items added to cart
              </p>
            ) : (
              cartItems.map((item, index) => {
                return <CartItems item={item} key={index} />;
              })
            )}
          </div>
        </div>
        <div className="flex-1 p-9 gap-5 flex flex-col min-h-30 shadow-2xl rounded-2xl">
          <h2>Order Summary</h2>

          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between items-center h-2 w-full p-3">
              <h3 className="text-gray-500">SubTotal</h3>
              <span className="flex gap-1 items-center text-sm font-semibold">
                <IndianRupee size={20} />
                {subTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center h-2 w-full p-3">
              <h3 className="text-gray-500">Shipping</h3>
              <span className="flex gap-1 items-center text-sm font-semibold">
                <IndianRupee size={20} />
                {shippingCharges.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center h-2 w-full p-3">
              <h3 className="text-gray-500">Tax 18%</h3>
              <span className="flex gap-1 items-center text-sm font-semibold">
                <IndianRupee size={20} />
                {tax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4 h-2 w-full p-3">
              <h3 className="text-black text-2xl font-semibold">Total</h3>
              <span className="flex gap-1 text-blue-600 items-center text-2xl font-bold">
                <IndianRupee size={20} />
                {total.toFixed(2)}
              </span>
            </div>

            <div className="w-full">
              <button
                onClick={handleOrder}
                className="bg-blue-600 w-full px-3 py-4 rounded-lg text-white cursor-pointer hover:scale-110 transition ease-in duration-200"
              >
                {loading ? "Procceding..." : "Procced to order"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
