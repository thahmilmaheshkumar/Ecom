import products from "../model/product.js";
import handleError from "../helpper/handleError.js";
import apihelpper from "../helpper/apihelpper.js";

export const createProduct = async (req, res, next) => {
  const product = await products.create({ user_id: req.user._id, ...req.body });
  res.status(201).json({
    success: true,
    product,
  });
};

export const getAllProducts = async (req, res, next) => {
  const apiHelp = new apihelpper(products.find(), req.query).search().filter();

  const totalProducts = await apiHelp.query.clone().countDocuments();
  const totalPages = Math.ceil(totalProducts / (Number(req.query.limit) || 1));
  const page = Number(req.query.page) || 1;

  if (totalPages > 0 && page > totalPages) {
    return next(new handleError("Invalid page number", 400));
  }

  apiHelp.pagination();
  const product = await apiHelp.query;
  res
    .status(200)
    .json({ success: true, product, totalPages, page, totalProducts });
};

export const singleProduct = async (req, res, next) => {
  const id = req.query.i;
  const product = await products.findById(id);
  if (!product) {
    return next(new handleError("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
};

export const updateProduct = async (req, res, next) => {
  const id = req.query.i;
  const product = await products.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) {
    return next(new handleError("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
};

export const deleteProduct = async (req, res, next) => {
  const id = req.query.i;
  const product = await products.findByIdAndDelete(id);
  if (!product) {
    return next(new handleError("Product not found", 404));
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully", product });
};

export const reviewProduct = async (req, res, next) => {
  const id = req.user._id;
  const { rating, comment, productId } = req.body;
  const product = await products.findById(productId);
  if (!product) {
    return next(new handleError("Product not found", 404));
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === id.toString(),
  );

  if (alreadyReviewed) {
    //update the review
    alreadyReviewed.rating = rating;
    alreadyReviewed.comment = comment;
    alreadyReviewed.name = req.user.name;
  } else {
    //create the review
    product.reviews.push({
      user: id,
      rating,
      comment,
      name: req.user.name,
      avathar: req.user.avathar.url,
    });
    product.numberOfRating = product.reviews.length;
  }

  let sum = 0;
  product.reviews.forEach((r) => {
    sum += r.rating;
  });
  product.rating = sum / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, product });
};

export const getAdminProducts = async (req, res, next) => {
  const product = await products.find({ user_id: req.user._id });
  if (!product) {
    return next(new handleError("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
};
