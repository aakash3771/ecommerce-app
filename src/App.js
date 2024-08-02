import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./CartPage";
import ProductDetailsPage from "./ProductDetailsPage";
import CheckoutPage from "./CheckoutPage";
import TermsOfServicePage from "./TermsOfServicePage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import FAQPage from "./FAQPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import AccountPage from "./AccountPage";
import QuantityDropdown from "./QuantityDropdown";

const API_BASE_URL = "https://fakestoreapi.com";

const Header = ({ cartCount }) => (
  <header className="bg-dark text-white p-3 sticky-top">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h4 m-0">MyEcommerce</h1>
        </Link>
        <nav>
          <Link to="/" className="text-white me-3">
            Home
          </Link>
          <Link to="/about" className="text-white me-3">
            About
          </Link>
          <Link to="/contact" className="text-white me-3">
            Contact
          </Link>
          <Link to="/account" className="text-white me-3">
            Account
          </Link>
          <Link to="/cart" className="text-white">
            Cart ({cartCount})
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-light text-center p-3 mt-5">
    <div className="container">
      <p>&copy; 2024 MyEcommerce. All rights reserved.</p>
      <nav>
        <Link to="/terms" className="text-dark me-3">
          Terms of Service
        </Link>
        <Link to="/privacy" className="text-dark me-3">
          Privacy Policy
        </Link>
        <Link to="/faq" className="text-dark">
          FAQ
        </Link>
      </nav>
    </div>
  </footer>
);

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <form onSubmit={handleSearch} className="d-flex my-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-outline-success me-2">
        Search
      </button>
      {searchTerm && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </form>
  );
};

const HomePage = ({ products, addToCart }) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Featured Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
              </Link>
              <div className="card-body">
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
                <QuantityDropdown
                  quantity={1}
                  onQuantityChange={(quantity) => addToCart(product, quantity)}
                />
                <button
                  onClick={() => addToCart(product, 1)}
                  className="btn btn-primary mt-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success(`${product.title} removed from cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const placeOrder = () => {
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
    setCart([]);
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setFilteredProducts(products);
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <div className="container">
        <SearchBar onSearch={handleSearch} onClear={clearSearch} />
      </div>
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage products={filteredProducts} addToCart={addToCart} />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetailsPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} placeOrder={placeOrder} />}
          />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
