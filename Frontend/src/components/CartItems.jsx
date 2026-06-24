import { IndianRupee, Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCartItems, removeItemCart } from "../redux/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const CartItems = ({ item }) => {
  //   const [cartNumber, setCartNumber] = useState(item.quantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plus = () => {
    const newQnt = item.quantity + 1;
    dispatch(addCartItems({ id: item.product, quantity: newQnt }));
  };
  const minus = () => {
    if (item.quantity <= 1) {
      return toast.error("Quantity cannot be less than 1");
    }
    const newQnt = item.quantity - 1;
    dispatch(addCartItems({ id: item.product, quantity: newQnt }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemCart(id));
  };

  return (
    <>
      <div className="w-full flex justify-between min-h-30 overflow-hidden bg-gray-100 rounded-2xl p-3 md:p-5">
        <div className="flex gap-5 items-center">
          <div>
            <Link to={`/products/${item.product}`}>
              <img
                src={item.image}
                alt={item.name}
                className="h-15 w-15 md:h-20 md:w-20 object-cover rounded-2xl cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-sm md:text-lg font-semibold">
            <h2>{item.name}</h2>
            <div>
              <span className="text-blue-600 text-sm md:text-lg">
                Rs.{item.price}
              </span>
              <p className="flex items-center text-gray-400">
                <IndianRupee size={18} />
                {item.price}x{item.quantity}=<IndianRupee size={18} />
                {item.price * item.quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <div className="flex items-center gap-1 md:gap-4 px-4 py-2 rounded-full">
              <button
                onClick={minus}
                className="hover:text-blue-700 border rounded-full hover:scale-110 cursor-pointer transition ease-in duration-100"
              >
                <Minus size={18} />
              </button>

              <span className="text-2xl">{item.quantity}</span>

              <button
                onClick={plus}
                className="hover:text-blue-700 rounded-full border hover:scale-110 cursor-pointer transition ease-in duration-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <button onClick={() => handleRemoveItem(item.product)}>
            <Trash2
              className="text-red-500
              cursor-pointer
              hover:scale-110
              transition
              ease-in
              duration-100"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
