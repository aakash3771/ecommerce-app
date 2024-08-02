import React, { useState, useEffect } from "react";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [accountDetails, setAccountDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch account details from localStorage or API
    const savedDetails = JSON.parse(
      localStorage.getItem("accountDetails") || "{}",
    );
    setAccountDetails(savedDetails);

    // Fetch orders from localStorage or API
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Account</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Account Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <div>
          <h3>Account Details</h3>
          <p>
            <strong>Name:</strong> {accountDetails.firstName}{" "}
            {accountDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {accountDetails.email}
          </p>
          <p>
            <strong>Address:</strong> {accountDetails.address}
          </p>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h3>My Orders</h3>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
