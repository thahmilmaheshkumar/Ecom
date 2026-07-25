import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  order,
  removeError,
  removeSuccess,
} from "../redux/cart/cartSlice";
import toast from "react-hot-toast";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import CartItems from "../components/CartItems";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

const Order = () => {
  const { cartItems, loading, message, success, error } = useSelector(
    (state) => state.cart,
  );
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    street: false,
    city: false,
    state: false,
    pincode: false,
  });

  const [deatils, setDetails] = useState({
    name: "",
    address: "",
    street: "",
    city: "",
    state: "",
    pincode: 0,
  });

  const shippingCharges = cartItems.length === 0 ? 0 : subTotal > 500 ? 0 : 50;
  const tax = subTotal * 0.18;
  const total = subTotal + shippingCharges + tax;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      if (message === "Order success") {
        navigate("/");
      }
      dispatch(removeSuccess());
    }
  }, [dispatch, message, success]);

  const handleChange = (e) => {
    setDetails({ ...deatils, [e.target.name]: e.target.value });
    // console.log(deatils);
  };
  const handleOrder = () => {
    setErrors({
      name: !deatils.name,
      address: !deatils.address,
      street: !deatils.street,
      city: !deatils.city,
      state: !deatils.state,
      pincode: !deatils.pincode,
    });

    if (
      !deatils.name ||
      !deatils.address ||
      !deatils.street ||
      !deatils.state ||
      !deatils.city ||
      !deatils.pincode
    ) {
      return toast.error("Please enter all details", { autoClose: 3000 });
    }

    const address = {
      street: deatils.street,
      city: deatils.city,
      state: deatils.state,
      pincode: deatils.pincode,
    };

    // console.log(address);

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
    <div className="max-h-screen">
      <Navebar />
      <main className="h-1/2 w-full flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="h-full flex-1 w-full flex flex-col gap-7 justify-center items-center">
          <div className="md:p-5 h-full flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <p className="h-full w-full flex items-center justify-center text-2xl font-semibold">
                No items added to cart
              </p>
            ) : (
              cartItems.map((item, index) => {
                return <CartItems item={item} key={index} order={true} />;
              })
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label htmlFor="name">Full Name</label>
            <motion.input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <label htmlFor="address">Address</label>
            <motion.input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.address ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex gap-2 flex-col justify-center">
            <label htmlFor="street">Street</label>
            <motion.input
              type="text"
              name="street"
              id="street"
              placeholder="Street"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.street ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex gap-2 flex-col justify-center">
            <label htmlFor="city">City</label>
            <motion.input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.city ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex gap-2 flex-col justify-center">
            <label htmlFor="state">State</label>
            <motion.input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.state ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex gap-2 flex-col justify-center">
            <label htmlFor="pincode">Pincode</label>
            <motion.input
              type="number"
              name="pincode"
              id="pincode"
              placeholder="Pincode"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`px-3 py-1 border-2 focus:outline-none border-gray-400 rounded-lg
                ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="flex-1 flex-col gap-7 justify-center items-center h-screen w-full flex">
          <div className=" min-h-30 gap-5 flex flex-col w-full">
            <h2 className="text-3xl">Order Summary</h2>

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
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-6">
            <img
              src="https://qrcode.tec-it.com/API/QRCode?data=QR+Code+Generator+by+TEC-IT"
              alt="UPI QR"
              className="h-50"
            />
            <p className="text-lg">Pay Now...</p>

            <button
              className="w-3/4 px-4 py-2 bg-blue-500 rounded-lg text-white cursor-pointer"
              onClick={handleOrder}
            >
              Order Now
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
