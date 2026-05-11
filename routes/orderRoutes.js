const express =
  require("express");

const router =
  express.Router();

const Order = require(
  "../models/Order"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

// 🛒 CREATE ORDER
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const newOrder =
        new Order({
          ...req.body,

          user: req.user.id,
        });

      await newOrder.save();

      res.status(201).json({
        message:
          "Order placed successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Order failed",
      });
    }
  }
);

// 👤 MY ORDERS
router.get(
  "/my-orders",
  authMiddleware,
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
  }
);

// 👑 ADMIN ALL ORDERS
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
  }
);

// 📦 UPDATE ORDER STATUS
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      order.orderStatus =
        req.body.orderStatus;

      await order.save();

      res.json({
        message:
          "Order status updated",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Update failed",
      });
    }
  }
);

module.exports = router;