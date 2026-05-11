import { Link } from "react-router-dom";

import { isAdmin } from "../utils/adminCheck";

function Navbar({
  cartCount,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  darkMode,
  setDarkMode,
}) {
  const token = localStorage.getItem(
    "token"
  );

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem(
      "userId"
    );

    localStorage.removeItem(
      "role"
    );

    alert("Logged out 👋");

    window.location.href = "/";
  };

  return (
    <nav
      style={{
        background: "#111827",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      {/* LOGO */}
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        MyShop 🛍️
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          outline: "none",
          width: "220px",
        }}
      />

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
        style={selectStyle}
      >
        <option value="All">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Shoes">
          Shoes
        </option>

        <option value="Watch">
          Watch
        </option>
      </select>

      {/* PRICE */}
      <select
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(
            e.target.value
          )
        }
        style={selectStyle}
      >
        <option value="All">
          All Prices
        </option>

        <option value="500">
          Under ৳500
        </option>

        <option value="1000">
          Under ৳1000
        </option>

        <option value="5000">
          Under ৳5000
        </option>

        <option value="10000">
          Under ৳10000
        </option>
      </select>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* 🌙 DARK MODE */}
        <button
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
          style={{
            background: "white",
            border: "none",
            padding:
              "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {darkMode
            ? "☀️"
            : "🌙"}
        </button>

        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>

        <Link
          to="/wishlist"
          style={linkStyle}
        >
          Wishlist ❤️
        </Link>

        <Link
          to="/cart"
          style={linkStyle}
        >
          Cart ({cartCount})
        </Link>

        <Link
          to="/checkout"
          style={linkStyle}
        >
          Checkout
        </Link>

        <Link
          to="/my-orders"
          style={linkStyle}
        >
          My Orders
        </Link>

        {isAdmin() && (
          <>
            <Link
              to="/admin"
              style={linkStyle}
            >
              Admin
            </Link>

            <Link
              to="/admin-orders"
              style={linkStyle}
            >
              Orders(Admin)
            </Link>

            <Link
              to="/add-product"
              style={linkStyle}
            >
              Add Product
            </Link>
          </>
        )}

        {!token ? (
          <>
            <Link
              to="/login"
              style={linkStyle}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={linkStyle}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding:
                "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
};

export default Navbar;