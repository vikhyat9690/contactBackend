const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactController");

router.route("/").get(getContacts).post(createContact);
router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);
  

module.exports = router;
