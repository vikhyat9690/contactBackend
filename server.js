const express = require("express");
const contactRoutes = require("./router/contactRoutes");
const dotenv = require("dotenv").config();
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./router/userRoutes");


connectDb();
const port = process.env.PORT || 5000

// app.use("/api/contact", route("./router/contactRoutes.js"));

app.use(express.json());
app.use('/api/contacts/', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});