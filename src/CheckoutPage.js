import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "Mexico",
  "Other",
];

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Other",
];

const CheckoutPage = ({ cart, placeOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "India",
    city: "",
    zipCode: "",
    addressType: "home",
  });

  useEffect(() => {
    const existingOrders = localStorage.getItem("orders");
    if (existingOrders) {
      const lastOrder = JSON.parse(existingOrders).pop();
      setFormData((prevData) => ({
        ...prevData,
        ...lastOrder,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", { cart, customerInfo: formData });

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending",
      ...formData,
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem(
      "accountDetails",
      JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: `${formData.addressLine1}, ${formData.city}, ${formData.country}`,
      }),
    );

    placeOrder();
    navigate("/");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Order Summary</h3>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Shipping Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addressLine1" className="form-label">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addressLine2" className="form-label">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <select
                    className="form-select"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address Type</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressType"
                        id="home"
                        value="home"
                        checked={formData.addressType === "home"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="home">
                        Home
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressType"
                        id="office"
                        value="office"
                        checked={formData.addressType === "office"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="office">
                        Office
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="addressType"
                        id="other"
                        value="other"
                        checked={formData.addressType === "other"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
