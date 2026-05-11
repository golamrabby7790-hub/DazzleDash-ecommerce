const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      items: [
        {
          name: String,

          price: Number,

          quantity: Number,

          image: String,
        },
      ],

      totalPrice: Number,

      customerName: String,

      phone: String,

      address: String,

      paymentMethod: String,

      paymentStatus: {
        type: String,

        default: "Pending",
      },

      // 📦 ORDER STATUS
      orderStatus: {
        type: String,

        default: "Pending",
      },

      createdAt: {
        type: Date,

        default: Date.now,
      },
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );