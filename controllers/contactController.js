const asyncHandler = require("express-async-handler");
//@desc to GET all contacts
//@route GET/api/contacts
// @access public

const Contacts = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contacts.find();
  res.status(200).json({
    contact,
  });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }
  try {
    const contact = await Contacts.create({
      name,
      email,
      phone,
    });
    res.status(200).json(contact);
  } catch (error) {
    console.log("[CREATE_CONTACT_CONTROLLER_ERROR] : ", error.message);
    res.statusCode(500).send({ message: "Server error." });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    await Contacts.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  });
  
module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
};
