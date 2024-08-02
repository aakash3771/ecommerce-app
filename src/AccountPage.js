import React, { useState } from "react";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [accountDetails, setAccountDetails] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, City, Country",
  });
  const [orders, setOrders] = useState([
    { id: 1, date: "2023-05-01", total: 99.99 },
    { id: 2, date: "2023-06-15", total: 149.99 },
  ]);

  return (
    <div className="container mt-5">
      <h2>My Account</h2>
      <ul className="nav nav-tabs">
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
      <div className="tab-content mt-3">
        {activeTab === "details" && (
          <div>
            <h3>Account Details</h3>
            <p>
              <strong>Name:</strong> {accountDetails.name}
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
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
