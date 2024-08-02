import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import QuantityDropdown from "./QuantityDropdown";

const API_BASE_URL = "https://fakestoreapi.com";

const ProductDetailsPage = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Error: {error}</div>;
  if (!product) return <div className="container mt-5">Product not found</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h3>${product.price.toFixed(2)}</h3>
          <div className="d-flex align-items-center mt-3">
            <QuantityDropdown
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={10}
            />
            <button
              onClick={() => addToCart(product, quantity)}
              className="btn btn-primary ms-2"
            >
              Add to Cart
            </button>
          </div>
          <Link to="/" className="btn btn-secondary mt-3">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
