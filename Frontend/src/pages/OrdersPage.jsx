import React, { useEffect } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/order/order";
import CartItems from "../components/CartItems";

const OrdersPage = () => {
  const { orders, success, error, message, loading } = useSelector(
    (state) => state.order,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <div className="max-h-screen">
      <Navebar />
      <main className="h-1/2 w-full">
        {orders.length === 0 ? (
          <p className="h-full w-full flex items-center justify-center text-2xl font-semibold">
            No items added to cart
          </p>
        ) : (
          orders.map((order, index) => {
            return <CartItems item={order} key={index} />;
          })
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
