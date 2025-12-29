const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema(
  {
    memberBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberBook",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    signature: {
      type: String, // image URL / base64 / file path
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("installment", installmentSchema);
