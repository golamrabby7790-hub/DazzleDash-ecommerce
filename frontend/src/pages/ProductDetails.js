import {
  useParams,
  Link,
} from "react-router-dom";

function ProductDetails({
  products,
  addToCart,
  darkMode,
}) {
  const { id } = useParams();

  const product = products.find(
    (p) => p._id === id
  );

  if (!product) {
    return (
      <h2>
        Product Not Found 😢
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <div
        style={{
          background: darkMode
            ? "#1f2937"
            : "white",

          color: darkMode
            ? "white"
            : "black",

          display: "flex",

          gap: "30px",

          flexWrap: "wrap",

          padding: "25px",

          borderRadius: "12px",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "350px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        {/* DETAILS */}
        <div>
          <h1>
            {product.name}
          </h1>

          <h2>
            ৳ {product.price}
          </h2>

          <p>
            Category:{" "}
            <b>
              {product.category}
            </b>
          </p>

          <p>
            {product.description}
          </p>

          <button
            onClick={() =>
              addToCart(product)
            }
            style={{
              background:
                "#111827",

              color: "white",

              border: "none",

              padding:
                "12px 20px",

              borderRadius:
                "6px",

              cursor: "pointer",

              fontWeight:
                "bold",

              marginTop: "15px",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* BACK */}
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "25px",
          textDecoration: "none",
          color: darkMode
            ? "white"
            : "black",
          fontWeight: "bold",
        }}
      >
        ⬅ Back To Home
      </Link>
    </div>
  );
}

export default ProductDetails;