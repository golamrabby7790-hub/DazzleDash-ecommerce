import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  // FETCH ORDERS
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/orders/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  // 📦 UPDATE STATUS
  const updateStatus =
    async (id, status) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/orders/${id}/status`,
          {
            orderStatus:
              status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchOrders();

        alert(
          "Order Updated 😎"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Update Failed ❌"
        );
      }
    };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Admin Orders 📦
      </h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border:
                "1px solid #ddd",

              padding: "20px",

              borderRadius:
                "10px",

              marginBottom:
                "20px",

              background:
                "#f9fafb",
            }}
          >
            {/* USER */}
            <h3>
              👤{" "}
              {
                order
                  .customerName
              }
            </h3>

            <p>
              📞 {order.phone}
            </p>

            <p>
              📍{" "}
              {order.address}
            </p>

            <p>
              💳{" "}
              {
                order.paymentMethod
              }
            </p>

            <p>
              💰 ৳{" "}
              {
                order.totalPrice
              }
            </p>

            {/* STATUS */}
            <h3>
              📦 Status:{" "}
              {
                order.orderStatus
              }
            </h3>

            {/* ITEMS */}
            <div
              style={{
                marginTop:
                  "15px",
              }}
            >
              <h4>
                Products:
              </h4>

              {order.items.map(
                (item, index) => (
                  <div
                    key={
                      index
                    }
                    style={{
                      marginBottom:
                        "10px",
                    }}
                  >
                    {item.name} ×{" "}
                    {
                      item.quantity
                    }
                  </div>
                )
              )}
            </div>

            {/* STATUS BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap:
                  "wrap",
                marginTop:
                  "20px",
              }}
            >
              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Processing"
                  )
                }
                style={
                  btnStyle
                }
              >
                Processing
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                style={
                  btnStyle
                }
              >
                Shipped
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                style={
                  btnStyle
                }
              >
                Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const btnStyle = {
  background: "#111827",

  color: "white",

  border: "none",

  padding: "10px 15px",

  borderRadius: "6px",

  cursor: "pointer",

  fontWeight: "bold",
};

export default AdminOrders;