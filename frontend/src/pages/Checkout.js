import { useState } from "react";
import axios from "axios";

function Checkout({ cart }) {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  // 🛒 PLACE ORDER
  const placeOrder = async () => {
    if (
      !name ||
      !phone ||
      !address
    ) {
      alert(
        "Please fill all fields 😢"
      );

      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const orderData = {
        items: cart,
        totalPrice,
        customerName: name,
        phone,
        address,
        paymentMethod:
          "Cash On Delivery",
        paymentStatus:
          "Pending",
        orderStatus:
          "Pending",
      };

      await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Order Placed Successfully 😎"
      );

      setName("");
      setPhone("");
      setAddress("");

      setLoading(false);
    } catch (error) {
      console.log(error);

      alert(
        "Order Failed ❌"
      );

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Checkout 💳
      </h1>

      {/* CUSTOMER INFO */}
      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "15px",
        }}
      >
        {/* NAME */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* ADDRESS */}
        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          rows="4"
          style={inputStyle}
        />

        {/* PAYMENT METHOD */}
        <div
          style={{
            background:
              "#f3f4f6",

            padding: "15px",

            borderRadius:
              "8px",
          }}
        >
          <h3>
            Payment Method 💵
          </h3>

          <p>
            Cash On Delivery
            (COD)
          </p>
        </div>

        {/* ORDER SUMMARY */}
        <div
          style={{
            background:
              "#f9fafb",

            padding: "15px",

            borderRadius:
              "8px",
          }}
        >
          <h3>
            Order Summary 🛒
          </h3>

          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                marginBottom:
                  "10px",
              }}
            >
              {item.name} ×{" "}
              {item.quantity}
            </div>
          ))}

          <hr />

          <h2>
            Total: ৳{" "}
            {totalPrice}
          </h2>
        </div>

        {/* BUTTON */}
        <button
          onClick={placeOrder}
          disabled={loading}
          style={{
            background:
              "#111827",

            color: "white",

            border: "none",

            padding: "14px",

            borderRadius:
              "8px",

            cursor:
              "pointer",

            fontWeight:
              "bold",

            fontSize: "16px",
          }}
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default Checkout;