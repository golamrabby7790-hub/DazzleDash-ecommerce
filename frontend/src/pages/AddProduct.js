import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  // 🌩️ IMAGE FILE
  const [image, setImage] =
    useState(null);

  // ⏳ LOADING
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🌩️ CLOUDINARY FORM
      const formData =
        new FormData();

      formData.append(
        "file",
        image
      );

      formData.append(
        "upload_preset",
        "ecommerce"
      );

      // 🌩️ UPLOAD IMAGE
      const uploadRes =
        await axios.post(
          "https://api.cloudinary.com/v1_1/dwrxqfam/image/upload",
          formData
        );

      const imageUrl =
        uploadRes.data.secure_url;

      // 🛍️ SAVE PRODUCT
      const productData = {
        name,
        price,
        category,
        description,
        image: imageUrl,
      };

      await axios.post(
        "http://localhost:5000/api/products",
        productData
      );

      alert(
        "Product Added Successfully 😎"
      );

      // RESET
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);

      setLoading(false);
    } catch (error) {
      console.log(error);

      alert(
        "Upload Failed ❌"
      );

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Add Product 🛍️
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "15px",
        }}
      >
        {/* NAME */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
          style={inputStyle}
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          required
          style={inputStyle}
        />

        {/* CATEGORY */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          required
          style={inputStyle}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
          rows="4"
          style={inputStyle}
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          required
        />

        {/* PREVIEW */}
        {image && (
          <img
            src={URL.createObjectURL(
              image
            )}
            alt="preview"
            style={{
              width: "100%",
              borderRadius:
                "10px",
            }}
          />
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            background:
              "#111827",

            color: "white",

            border: "none",

            padding: "14px",

            borderRadius:
              "8px",

            cursor:
              "pointer",

            fontWeight:
              "bold",

            fontSize: "16px",
          }}
        >
          {loading
            ? "Uploading..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default AddProduct;