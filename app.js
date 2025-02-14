const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")

require('dotenv').config();  // Load environment variables


const homeRoutes = require("./routes/home")

mongoose
  .connect("mongodb://127.0.0.1:27017/food-finder")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err))

const app = express()

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/", homeRoutes)

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.")
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke! Error: " + err.message)
})

app.listen(3000, () => {
  console.log("Serving on port 3000")
})