const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the name of the contact"],
    },
    email: {
        type: String,
        required: [true, "Please add the email of the contact"],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number of the contact"],
    },
},
    {
        timestamps: true,
    },
);
//module exports for mongoose model with a name and variable
module.exports = mongoose.model("Contacts", contactSchema);