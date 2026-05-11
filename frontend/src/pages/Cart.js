function Cart({
  cart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  darkMode,
}) {
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

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
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        Shopping Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: darkMode
              ? "white"
              : "black",
          }}
        >
          Cart is Empty 😢
        </h2>
      ) : (
        <>
          {cart.map(
            (item, index) => (
              <div
                key={index}
                style={{
                  background:
                    darkMode
                      ? "#1f2937"
                      : "white",

                  color: darkMode
                    ? "white"
                    : "black",

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  padding: "20px",

                  marginBottom:
                    "20px",

                  borderRadius:
                    "12px",

                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "20px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height:
                        "100px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "10px",
                    }}
                  />

                  <div>
                    <h2>
                      {item.name}
                    </h2>

                    <h3>
                      ৳{" "}
                      {item.price}
                    </h3>

                    <p>
                      Qty:{" "}
                      {
                        item.quantity
                      }
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                  }}
                >
                  {/* ➖ */}
                  <button
                    onClick={() =>
                      decreaseQty(
                        item._id
                      )
                    }
                    style={
                      qtyBtnStyle
                    }
                  >
                    ➖
                  </button>

                  {/* ➕ */}
                  <button
                    onClick={() =>
                      increaseQty(
                        item._id
                      )
                    }
                    style={
                      qtyBtnStyle
                    }
                  >
                    ➕
                  </button>

                  {/* ❌ */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        index
                      )
                    }
                    style={{
                      background:
                        "red",

                      color:
                        "white",

                      border:
                        "none",

                      padding:
                        "10px 14px",

                      borderRadius:
                        "6px",

                      cursor:
                        "pointer",

                      fontWeight:
                        "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}

          {/* TOTAL */}
          <h2
            style={{
              textAlign: "right",
              color: darkMode
                ? "white"
                : "black",
            }}
          >
            Total: ৳{" "}
            {totalPrice}
          </h2>
        </>
      )}
    </div>
  );
}

const qtyBtnStyle = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Cart;