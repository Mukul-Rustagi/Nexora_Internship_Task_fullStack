const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff",
    },
    wishlist: [
      {
        type: Number,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to check if password matches (in production, use bcrypt)
userSchema.methods.comparePassword = function (candidatePassword) {
  return candidatePassword === this.password;
};

module.exports = mongoose.model("User", userSchema);

