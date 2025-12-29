const express = require('express');
const router = express.Router();

const { register, login } = require("../controllers/auth");
const { getAllUsers, getAllMembers } = require('../controllers/admin');
const { isAdmin, requireSignIn } = require('../middleware/auth');
const { saveMember, deleteMember } = require('../controllers/memberController');

const {
  createMemberBook,
  updateMemberBook,
  deleteMemberBook,
  getAllMemberBooks,
  getSingleMemberBook
} = require ("../controllers/memberBookController");
const {
  createInstallment,
  updateInstallment,
  deleteInstallment,

  getInstallmentsByMemberBookId,
  getInstallmentsByMemberId,
  getInstallmentsByDate,
  getInstallmentsByMonth,
} = require("../controllers/installmentController");




router.post('/register', register);
router.post('/login', login);


// admin routes can be added here

router.get('/all-users', requireSignIn, isAdmin, getAllUsers);
router.get('/all-members', requireSignIn, isAdmin, getAllMembers);



// member routes can be added here
// Create or Update Member (same controller)
router.post("/member", requireSignIn, isAdmin, saveMember);   // Create
router.put("/member", requireSignIn, isAdmin, saveMember);    // Update with 'id'
// Delete
router.delete("/member/:id", requireSignIn, isAdmin, deleteMember);



// member book routes can be added here
// CREATE
router.post("/member-book",requireSignIn, isAdmin, createMemberBook);
// UPDATE
router.put("/update-member-book/:id", requireSignIn, isAdmin, updateMemberBook);
// DELETE
router.delete("/delete-member-book/:id", requireSignIn, isAdmin, deleteMemberBook);
// GET ALL
router.get("/member-books", requireSignIn, isAdmin, getAllMemberBooks);
// GET SINGLE
router.get("/member-book/:id", requireSignIn, getSingleMemberBook);


// installment routes can be added here
// CREATE
router.post("/installment-create",requireSignIn, isAdmin, createInstallment);
// UPDATE
router.put("/installment-update/:id", requireSignIn, isAdmin, updateInstallment);
// DELETE
router.delete("/installment-delete/:id", requireSignIn, isAdmin, deleteInstallment);

// get installments by member book id==============================================
// BY MEMBER BOOK ID
router.get(
  "/installments/book/:memberBookId",
  getInstallmentsByMemberBookId
);

// BY MEMBER ID
router.get(
  "/installments/member/:memberId",
  getInstallmentsByMemberId
);

// BY DATE
router.get(
  "/installments/date",
  getInstallmentsByDate
);

// BY MONTH
router.get(
  "/installments/month",
  getInstallmentsByMonth
);


module.exports = router