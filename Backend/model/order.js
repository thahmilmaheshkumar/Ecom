import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],

    taxPrice: {
      type: Number,
      required: true,
      default: 8,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 10,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      default: "",
    },

    orderId: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      required: true,
      default: "razorpay",
    },

    orderStatus: {
      type: String,
      default: "pending",
    },

    paidAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
