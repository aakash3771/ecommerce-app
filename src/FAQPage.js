import React from "react";

const FAQPage = () => {
  return (
    <div className="container mt-5">
      <h1>Frequently Asked Questions</h1>
      <h2>1. How do I place an order?</h2>
      <p>
        To place an order, simply browse our products, add items to your cart,
        and proceed to checkout. Follow the prompts to enter your shipping and
        payment information.
      </p>
      <h2>2. What payment methods do you accept?</h2>
      <p>
        We accept major credit cards, PayPal, and other secure payment methods.
        You can view all available options at checkout.
      </p>
      <h2>3. How long will it take to receive my order?</h2>
      <p>
        Shipping times vary depending on your location and the shipping method
        chosen. Generally, orders are processed within 1-2 business days and
        shipped within 3-7 business days.
      </p>
      {/* Add more FAQs as needed */}
    </div>
  );
};

export default FAQPage;
