const Installment = require("../models/installment");

// =======================
// CREATE INSTALLMENT
// =======================
exports.createInstallment = async (req, res) => {
  try {
    const { memberBookId, amount, date, signature } = req.body;

    const installment = new Installment({
      memberBookId,
      amount,
      date,
      signature,
    });

    await installment.save();

    res.status(201).json({
      message: "Installment created successfully",
      data: installment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create installment failed",
      error: error.message,
    });
  }
};

// =======================
// UPDATE INSTALLMENT
// =======================
exports.updateInstallment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedInstallment = await Installment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedInstallment) {
      return res.status(404).json({
        message: "Installment not found",
      });
    }

    res.status(200).json({
      message: "Installment updated successfully",
      data: updatedInstallment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update installment failed",
      error: error.message,
    });
  }
};

// =======================
// DELETE INSTALLMENT
// =======================
exports.deleteInstallment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInstallment = await Installment.findByIdAndDelete(id);

    if (!deletedInstallment) {
      return res.status(404).json({
        message: "Installment not found",
      });
    }

    res.status(200).json({
      message: "Installment deleted successfully",
      data: deletedInstallment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete installment failed",
      error: error.message,
    });
  }
};


// get all installments ===========================================================================



// =======================
// GET BY MEMBER BOOK ID
// =======================
exports.getInstallmentsByMemberBookId = async (req, res) => {
  try {
    const { memberBookId } = req.params;

    const installments = await Installment.find({ memberBookId })
      .sort({ date: -1 });

    res.status(200).json({
      count: installments.length,
      data: installments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};

// =======================
// GET BY MEMBER ID
// (via populate)
// =======================
exports.getInstallmentsByMemberId = async (req, res) => {
  try {
    const { memberId } = req.params;

    const installments = await Installment.find()
      .populate({
        path: "memberBookId",
        match: { memberId: new mongoose.Types.ObjectId(memberId) },
      })
      .sort({ date: -1 });

    // remove null populated data
    const filtered = installments.filter(i => i.memberBookId !== null);

    res.status(200).json({
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};

// =======================
// GET BY DATE (YYYY-MM-DD)
// =======================
exports.getInstallmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const installments = await Installment.find({
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.status(200).json({
      count: installments.length,
      data: installments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};

// =======================
// GET BY MONTH (YYYY-MM)
// =======================
exports.getInstallmentsByMonth = async (req, res) => {
  try {
    const { month } = req.query; // e.g. 2025-03

    const [year, m] = month.split("-");
    const start = new Date(year, m - 1, 1);
    const end = new Date(year, m, 0, 23, 59, 59, 999);

    const installments = await Installment.find({
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.status(200).json({
      count: installments.length,
      data: installments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch failed",
      error: error.message,
    });
  }
};
