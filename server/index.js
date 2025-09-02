require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose_connection = require("./config/mongoose");
const expressSession = require("express-session");
const errorMiddleware = require("./middleware/error-middleware"); 
const router = require("./router/auth-router");
const contactsRouter = require("./router/contacts-router");

// models
// const hishaabModel = require("./models/hishaab"); // format 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({
  secret: "random stuff",
  resave: false,
  saveUninitialized: false
}));
app.use(errorMiddleware);


app.use("/api/auth/AbrarMojahidRafi_PortfolioWebsite", router);
app.use("/api/auth/AbrarMojahidRafi_PortfolioWebsite", contactsRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
