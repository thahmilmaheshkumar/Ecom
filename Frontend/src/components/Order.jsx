import React from "react";
import { useNavigate } from "react-router-dom";

const Order = ({ item, status }) => {
  const navigate = useNavigate();

  const handleOpenOrder = () => {
    navigate(`/orders/single/${item?.product ?? ""}`, {
      state: { status: status ?? "Order Placed" },
    });
  };

  return (
    <div>
      <div className="w-full flex justify-between min-h-30 overflow-hidden bg-gray-100 rounded-2xl p-3 md:p-5">
        <div className="flex gap-5 items-center">
          <div
            onClick={handleOpenOrder}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpenOrder()}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-15 w-15 md:h-20 md:w-20 object-cover rounded-2xl cursor-pointer"
            />
          </div>
          <div className="flex flex-row gap-3 text-sm md:text-lg font-semibold">
            <h2>{item.name}</h2>
            <div>
              <span className="text-blue-600 text-sm md:text-lg">{status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
