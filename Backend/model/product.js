import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },

    description: {
      type: String,
      required: [true, "Please enter the description"],
    },

    category: {
      type: String,
      required: [true, "Please enter the category"],
    },

    rating: {
      type: Number,
      default: 0,
    },

    images: [
      {
        public_id: {
          type: String,
          required: [true, "Please enter the public id"],
        },

        url: {
          type: String,
          required: [true, "Please enter the image url"],
        },
      },
    ],

    stock: {
      type: Number,
      required: [true, "Please enter the stock"],
      default: 1,
    },

    numberOfRating: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Please enter the price"],
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        avathar: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        name: { type: String },
        comment: {
          type: String,
        },
        createdat: { type: Date, default: Date.now },
      },
    ],

    rating: { type: Number, default: 0 },
    mrp: { type: Number, required: [true, "Please enter the mrp"] },
  },
  { timestamps: true },
);

export default mongoose.model("product", productSchema);
