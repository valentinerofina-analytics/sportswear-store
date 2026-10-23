
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Sportswear Store API is running!");
});

// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

// Category routes
console.log("Category routes loaded");
app.use("/api/categories", categoryRoutes);

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();
