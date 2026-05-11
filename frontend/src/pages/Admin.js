import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Admin() {
  const [products, setProducts] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      price: "",
      image: "",
    });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/delete/${id}`
    );

    alert("Product Deleted ✅");

    fetchProducts();
  };

  // START EDIT
  const startEdit = (product) => {
    setEditingId(product._id);

    setEditData({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // SAVE UPDATE
  const saveUpdate = async (id) => {
    await axios.put(
      `http://localhost:5000/api/products/update/${id}`,
      editData
    );

    alert("Product Updated ✅");

    setEditingId(null);

    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard 👑</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          {editingId ===
          product._id ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name:
                      e.target.value,
                  })
                }
                placeholder="Name"
              />

              <br />
              <br />

              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price:
                      e.target.value,
                  })
                }
                placeholder="Price"
              />

              <br />
              <br />

              <input
                type="text"
                value={editData.image}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    image:
                      e.target.value,
                  })
                }
                placeholder="Image URL"
              />

              <br />
              <br />

              <button
                onClick={() =>
                  saveUpdate(
                    product._id
                  )
                }
              >
                Save
              </button>
            </>
          ) : (
            <>
              <img
                src={product.image}
                alt={product.name}
                width="100"
              />

              <h3>
                {product.name}
              </h3>

              <p>
                ৳ {product.price}
              </p>

              <button
                onClick={() =>
                  startEdit(product)
                }
                style={{
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(
                    product._id
                  )
                }
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Admin;