import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useLocation, Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";
import CartPage from "./CartPage";
import ProductDetailsPage from "./ProductDetailsPage";
import CheckoutPage from "./CheckoutPage";
import TermsOfServicePage from "./TermsOfServicePage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import FAQPage from "./FAQPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import AccountPage from "./AccountPage";
import HomePage from "./Homepage";

// Header Component
const Header = React.memo(({ cartCount }) => (
  <header className="bg-dark text-white p-3 sticky-top">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <NavLink to="/" className="text-white text-decoration-none">
          <h1 className="h4 m-0">MyEcommerce</h1>
        </NavLink>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white me-3 ${isActive ? "fw-bold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white me-3 ${isActive ? "fw-bold" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white me-3 ${isActive ? "fw-bold" : ""}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `text-white me-3 ${isActive ? "fw-bold" : ""}`
            }
          >
            Account
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-white ${isActive ? "fw-bold" : ""}`
            }
          >
            Cart ({cartCount})
          </NavLink>
        </nav>
      </div>
    </div>
  </header>
));

// Footer Component
const Footer = React.memo(() => (
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
));

// SearchBar Component
const SearchBar = React.memo(({ onSearch, onClear }) => {
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
});

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get("/products/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity) => {
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
      position: "bottom-right",
      autoClose: 3000,
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      const removedProduct = prevCart.find((item) => item.id === productId);
      if (removedProduct) {
        toast.success(`${removedProduct.title} removed from cart!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      return updatedCart;
    });
  }, []);

  const placeOrder = useCallback(() => {
    toast.success("Order placed successfully!", {
      position: "bottom-right",
      autoClose: 5000,
    });
    setCart([]);
  }, []);

  const handleSearch = useCallback(
    (searchTerm) => {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    },
    [products],
  );

  const clearSearch = useCallback(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategorySelect = useCallback(
    (category) => {
      setFilteredProducts(
        products.filter((product) => product.category === category),
      );
    },
    [products],
  );

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      {location.pathname !== "/cart" && (
        <div className="container">
          <SearchBar onSearch={handleSearch} onClear={clearSearch} />
        </div>
      )}
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={filteredProducts}
                addToCart={addToCart}
                categories={categories}
                onCategorySelect={handleCategorySelect}
              />
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
