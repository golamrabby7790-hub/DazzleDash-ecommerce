import { Link } from "react-router-dom";

function Home({
  products,
  addToCart,
  addToWishlist,
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
          marginBottom: "25px",
          textAlign: "center",
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        Products 🛍️
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: darkMode
                ? "#1f2937"
                : "white",

              color: darkMode
                ? "white"
                : "black",

              borderRadius: "12px",

              padding: "15px",

              textAlign: "center",

              boxShadow:
                "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Link
              to={`/product/${product._id}`}
              style={{
                textDecoration:
                  "none",

                color: darkMode
                  ? "white"
                  : "black",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "10px",
                }}
              />

              <h2
                style={{
                  marginTop:
                    "15px",
                }}
              >
                {product.name}
              </h2>
            </Link>

            <h3>
              ৳ {product.price}
            </h3>

            <p>
              Category:{" "}
              <b>
                {
                  product.category
                }
              </b>
            </p>

            {/* ❤️ WISHLIST */}
            <button
              onClick={() =>
                addToWishlist(
                  product
                )
              }
              style={{
                background:
                  "pink",

                color: "white",

                border: "none",

                padding:
                  "10px 15px",

                borderRadius:
                  "6px",

                cursor:
                  "pointer",

                marginRight:
                  "10px",

                fontWeight:
                  "bold",
              }}
            >
              ❤️
            </button>

            {/* 🛒 CART */}
            <button
              onClick={() =>
                addToCart(
                  product
                )
              }
              style={{
                background:
                  "#111827",

                color: "white",

                border: "none",

                padding:
                  "10px 20px",

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;