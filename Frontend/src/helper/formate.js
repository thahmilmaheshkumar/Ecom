export const calculateDiscount = (mrp, sellingPrice) => {
  return Math.ceil(((mrp - sellingPrice) / mrp) * 100);
};
