import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

import { isAdmin } from "./utils/adminCheck";

// 🔔 TOAST
import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const [products, setProducts] =
    useState([]);

  // 🛒 CART
  const [cart, setCart] =
    useState(() => {
      const savedCart =
        localStorage.getItem(
          "cart"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  // ❤️ WISHLIST
  const [wishlist, setWishlist] =
    useState(() => {
      const savedWishlist =
        localStorage.getItem(
          "wishlist"
        );

      return savedWishlist
        ? JSON.parse(
            savedWishlist
          )
        : [];
    });

  // 🌙 DARK MODE
  const [darkMode, setDarkMode] =
    useState(() => {
      const savedDark =
        localStorage.getItem(
          "darkMode"
        );

      return savedDark
        ? JSON.parse(savedDark)
        : false;
    });

  // 🔍 SEARCH
  const [search, setSearch] =
    useState("");

  // 🛍️ CATEGORY
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // 💰 PRICE FILTER
  const [maxPrice, setMaxPrice] =
    useState("All");

  const navigate = useNavigate();

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);
  };

  // 💾 SAVE CART
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // 💾 SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // 💾 SAVE DARK MODE
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory ===
          "All" ||
        product.category ===
          selectedCategory;

      const matchesPrice =
        maxPrice === "All" ||
        product.price <=
          Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      toast.error(
        "Please login first 🔐"
      );

      navigate("/login");

      return;
    }

    const exists = cart.find(
      (item) =>
        item._id === product._id
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id ===
          product._id
            ? {
                ...item,
                quantity:
                  item.quantity +
                  1,
              }
            : item
        )
      );

      toast.success(
        "Quantity Updated 🛒"
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

      toast.success(
        "Added To Cart 🛒"
      );
    }
  };

  // ❌ REMOVE CART
  const removeFromCart = (
    indexToRemove
  ) => {
    const updated = cart.filter(
      (_, index) =>
        index !== indexToRemove
    );

    setCart(updated);

    toast.error(
      "Removed From Cart ❌"
    );
  };

  // ➕ INCREASE QTY
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  // ❤️ ADD TO WISHLIST
  const addToWishlist = (
    product
  ) => {
    const exists =
      wishlist.find(
        (item) =>
          item._id ===
          product._id
      );

    if (exists) {
      toast.error(
        "Already In Wishlist ❤️"
      );

      return;
    }

    setWishlist([
      ...wishlist,
      product,
    ]);

    toast.success(
      "Added To Wishlist ❤️"
    );
  };

  // ❌ REMOVE WISHLIST
  const removeFromWishlist = (
    id
  ) => {
    setWishlist(
      wishlist.filter(
        (item) =>
          item._id !== id
      )
    );

    toast.error(
      "Removed From Wishlist ❌"
    );
  };

  return (
    <div
      style={{
        background: darkMode
          ? "#111827"
          : "#f5f5f5",

        minHeight: "100vh",

        color: darkMode
          ? "white"
          : "black",
      }}
    >
      <Navbar
        cartCount={cart.length}
        search={search}
        setSearch={setSearch}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        style={{
          padding: "20px",
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                products={
                  filteredProducts
                }
                addToCart={
                  addToCart
                }
                addToWishlist={
                  addToWishlist
                }
                darkMode={
                  darkMode
                }
              />
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={
                  products
                }
                addToCart={
                  addToCart
                }
                darkMode={
                  darkMode
                }
              />
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={
                  removeFromCart
                }
                increaseQty={
                  increaseQty
                }
                decreaseQty={
                  decreaseQty
                }
                darkMode={
                  darkMode
                }
              />
            }
          />

          {/* WISHLIST */}
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={
                  wishlist
                }
                removeFromWishlist={
                  removeFromWishlist
                }
                addToCart={
                  addToCart
                }
                darkMode={
                  darkMode
                }
              />
            }
          />

          {/* ADD PRODUCT */}
          <Route
            path="/add-product"
            element={
              <AddProduct />
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <Register />
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
              />
            }
          />

          {/* MY ORDERS */}
          <Route
            path="/my-orders"
            element={
              <MyOrders />
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              isAdmin() ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* ADMIN ORDERS */}
          <Route
            path="/admin-orders"
            element={
              isAdmin() ? (
                <AdminOrders />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>

      {/* 🔔 TOAST */}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;