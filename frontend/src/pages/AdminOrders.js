import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/orders/all"
    );

    setOrders(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Orders 📦 (Admin)</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>
            Total: ৳{" "}
            {order.totalPrice}
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

          <h4>Products:</h4>

          {order.products.map(
            (p, i) => (
              <div key={i}>
                {p.name} - ৳{" "}
                {p.price}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;