const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

/* -------------------------
   GET ALL PRODUCTS
--------------------------*/
router.get("/", async (req, res) => {
  try {
    const products =
      await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* -------------------------
   ADD PRODUCT
--------------------------*/
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      price,
      image,
    } = req.body;

    const product = new Product({
      name,
      price,
      image,
    });

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* -------------------------
   UPDATE PRODUCT
--------------------------*/
router.put(
  "/update/:id",
  async (req, res) => {
    try {
      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/* -------------------------
   DELETE PRODUCT
--------------------------*/
router.delete(
  "/delete/:id",
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted ✅",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;