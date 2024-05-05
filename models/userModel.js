const mongoose = require("mongoose");

//Defining userSchema for user 
const userSchema = mongoose.Schema({
    userName :{
        type: String,
        required: [true, "Please add the user name"],
    },

    email: {
        type: String,
        required: [true, "Please add the email address"],
    },

    password: {
        type: String,
        required: [true, "Please create the password"],
    },
},
{   
    timestapms: true,
});

//Export the same modules through method mongoose.model
module.exports = mongoose.model("user", userSchema);