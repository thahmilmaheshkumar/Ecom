import React, { useEffect } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/order/order";
import CartItems from "../components/CartItems";
import Order from "../components/Order";

const OrdersPage = () => {
  const { orders, success, error, message, loading } = useSelector(
    (state) => state.order,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    // console.log(orders);
  }, []);
  return (
    <div className="max-h-screen">
      {/* {console.log(orders)} */}
      <Navebar />
      <main className="h-1/2 w-full">
        {orders.length === 0 ? (
          <p className="h-full w-full flex items-center justify-center text-2xl font-semibold">
            No items Ordered
          </p>
        ) : (
          orders.flatMap((order, orderIndex) =>
            order.products.map((prod, prodIndex) => (
              <Order
                item={prod}
                status={order.orderStatus}
                key={`${orderIndex}-${prodIndex}`}
              />
            )),
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
