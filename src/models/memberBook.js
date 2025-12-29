const mongoose = require ("mongoose");

const memberBookSchema = new mongoose.Schema(
  {
    bookNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    savingAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    bookMemberName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memberBook", memberBookSchema);
