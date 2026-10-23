
const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// GET - Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Create a category
router.post("/", async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const category = await Category.create({
            name,
            description,
            image
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT - Update a category
router.put("/:id", async (req, res) => {
    console.log("PUT ROUTE HIT");
    console.log("Category ID:", req.params.id);

    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Delete a category
router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category deleted successfully",
            category
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
