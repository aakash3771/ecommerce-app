import React from "react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your Cart</h2>
        <p>
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                        marginRight: "10px",
                      }}
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity > 0) {
                        updateQuantity(item.id, newQuantity);
                      }
                    }}
                    className="form-control"
                    style={{ width: "70px" }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <Link to="/checkout" className="btn btn-primary btn-lg mt-3">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
