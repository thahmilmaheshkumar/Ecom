import Order from "../model/order.js";
import products from "../model/product.js";
import handleError from "../helpper/handleError.js";

export const createOrder = async (req, res, next) => {
  const {
    productsId,
    taxPrice,
    shippingPrice,
    quantity,
    paymentMethod,
    address,
  } = req.body;

  const product = await products.findById(productsId);

  if (!product) {
    return next(new handleError("Product not found", 404));
  }

  const totalAmount = Number(
    product.price * quantity + taxPrice + shippingPrice,
  );

  const order = await Order.create({
    user: req.user._id,
    products: {
      product: product._id,
      quantity,
      price: product.price,
    },
    address,
    taxPrice,
    shippingPrice,
    totalAmount: Number(totalAmount),
    paymentMethod,
    paidAt: Date.now(),
  });
  res.status(201).json({ success: true, order });
};

export const getUserOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ success: true, orders });
};

export const getadminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const orderProduct = [];

    for (const order of orders) {
      const productId = order.products?.[0]?.product;
      if (!productId) continue;

      const product = await products.findById(productId);
      if (!product) continue;

      if (product.user_id.toString() === req.user._id.toString()) {
        orderProduct.push(order);
      }
    }

    res.status(200).json({ success: true, orderProduct });
  } catch (error) {
    next(error);
  }
};
