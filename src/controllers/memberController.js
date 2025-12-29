const member = require("../models/member");

// =======================
// CREATE or UPDATE MEMBER
// =======================
exports.saveMember = async (req, res) => {
  try {
    const {
      id, // if id exists → update, else create
      name,
      fatherName,
      motherName,
      gender,
      phone,
      nidNumber,
      address,
      status,
      bookNumber,
      photo,
    } = req.body;

    // If ID exists → Update Member
    if (id) {
      const updatedMember = await member.findByIdAndUpdate(
        id,
        {
          name,
          fatherName,
          motherName,
          gender,
          phone,
          nidNumber,
          address,
          status,
          bookNumber,
          photo,
        },
        { new: true }
      );

      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found" });
      }

      return res.status(200).json({
        message: "Member updated successfully",
        data: updatedMember,
      });
    }

    // If no ID → Create new member
    const newMember = new member({
      name,
      fatherName,
      motherName,
      gender,
      phone,
      nidNumber,
      address,
      status,
      photo,
    });

    await newMember.save();

    res.status(201).json({
      message: "Member created successfully",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =======================
// DELETE MEMBER
// =======================
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Member deleted successfully",
      data: deletedMember,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
