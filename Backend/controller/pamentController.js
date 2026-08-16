import handleError from "../helpper/handleError.js";
import Razorpay from "razorpay";
import order from "../model/order.js";
import crypto from "crypto";
import Order from "../model/order.js";

function instance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_key",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_razorpay_secret",
  });
}

export const createPayment = async (req, res, next) => {
  const { orderId } = req.body;

  //   console.log("Received orderId:", orderId); // Debugging line

  const order = await Order.findById(orderId);
  //   console.log("Fetched order:", order); // Debugging line
  if (!order) {
    return next(handleError(401, "Order not found"));
  }

  const option = {
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: order._id.toString(),
  };

  try {
    const razorpay = instance();
    const paymentOrder = await razorpay.orders.create(option);
    order.paymentId = paymentOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      razorpayOrderId: paymentOrder.id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return next(handleError(500, "Failed to create Razorpay order"));
  }
};

export const verifyPayment = async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  const order = await Order.findById(orderId);

  //   console.log("Verifying payment for order:", order); // Debugging line

  if (!order) {
    return next(handleError(404, "Order not found"));
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  //   console.log("Expected signature:", expected); // Debugging line
  //   console.log("Received signature:", razorpay_signature); // Debugging line

  if (expected !== razorpay_signature) {
    return next(handleError(400, "Invalid signature"));
  }

  order.orderStatus = "Order Placed";
  order.paymentId = razorpay_payment_id;
  order.orderId = razorpay_order_id;
  await order.save();

  res.json({ success: true, message: "Payment verified", order });
};
