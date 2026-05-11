function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
  darkMode,
}) {
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
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: darkMode
              ? "white"
              : "black",
          }}
        >
          Wishlist is Empty 😢
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item._id}
              style={{
                background: darkMode
                  ? "#1f2937"
                  : "white",

                color: darkMode
                  ? "white"
                  : "black",

                padding: "15px",

                borderRadius:
                  "12px",

                textAlign:
                  "center",

                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "10px",
                }}
              />

              {/* NAME */}
              <h2
                style={{
                  marginTop:
                    "15px",
                }}
              >
                {item.name}
              </h2>

              {/* PRICE */}
              <h3>
                ৳ {item.price}
              </h3>

              {/* CATEGORY */}
              <p>
                Category:{" "}
                <b>
                  {item.category}
                </b>
              </p>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                {/* ADD TO CART */}
                <button
                  onClick={() =>
                    addToCart(item)
                  }
                  style={{
                    background:
                      "#111827",

                    color: "white",

                    border: "none",

                    padding:
                      "10px 15px",

                    borderRadius:
                      "6px",

                    cursor:
                      "pointer",

                    fontWeight:
                      "bold",
                  }}
                >
                  Add To Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeFromWishlist(
                      item._id
                    )
                  }
                  style={{
                    background:
                      "red",

                    color: "white",

                    border: "none",

                    padding:
                      "10px 15px",

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
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;