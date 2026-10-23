
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET - Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET - Get a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// POST - Create a product
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT - Update a product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE - Delete a product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;
