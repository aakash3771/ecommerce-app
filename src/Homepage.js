import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuantityDropdown from "./QuantityDropdown";

const HomePage = ({ products, addToCart, categories, onCategorySelect }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          <h3>Categories</h3>
          <ul className="list-group">
            {categories.map((category) => (
              <li key={category} className="list-group-item">
                <button
                  className="btn btn-link"
                  onClick={() => onCategorySelect(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">Featured Products</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {product.title}
                      </Link>
                    </h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    <p className="card-text text-muted">{product.category}</p>
                    <div className="mt-auto">
                      <div className="d-flex align-items-center">
                        <QuantityDropdown
                          quantity={quantities[product.id] || 1}
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(product.id, newQuantity)
                          }
                          maxQuantity={10}
                        />
                        <button
                          onClick={() =>
                            addToCart(product, quantities[product.id] || 1)
                          }
                          className="btn btn-primary ms-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
