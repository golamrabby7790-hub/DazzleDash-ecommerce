import { useEffect, useState } from "react";

import axios from "axios";

function MyOrders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId =
      localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:5000/api/orders/user/${userId}`
    );

    setOrders(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders 📦</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "white",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>
            Total: ৳ {order.totalPrice}
          </h3>

          <p>
            Payment:{" "}
            {order.paymentMethod}
          </p>

          <p>
            Date:{" "}
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;