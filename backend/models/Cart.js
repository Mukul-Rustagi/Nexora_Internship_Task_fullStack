const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: "guest-user",
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
