
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
    res.send("Sportswear Store API is running!");
});

// Test API
app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

// Category API
app.use("/api/categories", categoryRoutes);

// Product API
app.use("/api/products", productRoutes);



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
