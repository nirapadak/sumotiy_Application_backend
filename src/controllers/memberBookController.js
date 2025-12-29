const memberBook = require ("../models/memberBook");

// =====================
// CREATE MEMBER BOOK
// =====================
exports.createMemberBook = async (req, res) => {
  try {
    const {
      bookNumber,
      savingAmount,
      memberId,
      bookMemberName,
      address,
    } = req.body;

    const book = new memberBook({
      bookNumber,
      savingAmount,
      memberId,
      bookMemberName,
      address,
    });

    await book.save();

    res.status(201).json({
      message: "Member book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create failed",
      error: error.message,
    });
  }
};

// =====================
// UPDATE MEMBER BOOK
// =====================
exports.updateMemberBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await memberBook.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Member book not found",
      });
    }

    res.status(200).json({
      message: "Member book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

// =====================
// DELETE MEMBER BOOK
// =====================
exports.deleteMemberBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await memberBook.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Member book not found",
      });
    }

    res.status(200).json({
      message: "Member book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

// =====================
// GET ALL MEMBER BOOKS
// =====================
exports.getAllMemberBooks = async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // search
    const search = req.query.search || "";

    const searchQuery = {
      $or: [
        { bookNumber: { $regex: search, $options: "i" } },
        { bookMemberName: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ],
    };

    const total = await memberBook.countDocuments(searchQuery);

    const books = await memberBook.find(searchQuery)
      .populate("memberId", "name phone")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};

// =====================
// GET SINGLE MEMBER BOOK
// =====================
exports.getSingleMemberBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await memberBook.findById(id)
      .populate("memberId", "name phone");

    if (!book) {
      return res.status(404).json({
        message: "Member book not found",
      });
    }

    res.status(200).json({
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};
