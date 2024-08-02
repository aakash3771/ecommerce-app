# MyEcommerce React Application

## About the Project

MyEcommerce is a modern, responsive e-commerce web application built with React. It provides a seamless shopping experience for users, allowing them to browse products, add items to their cart, and complete the checkout process.

## Features

- Browse a catalog of products
- Filter products by category
- Search for specific products
- View detailed product information
- Add products to the shopping cart
- Adjust quantities in the cart
- Complete the checkout process
- View order history
- Responsive design for mobile and desktop

## Technologies Used

- React
- React Router for navigation
- Axios for API requests
- Bootstrap for styling
- React-Toastify for notifications
- Playwright for UI testing
- Jest for API testing

## What We've Achieved

1. Implemented a fully functional e-commerce frontend
2. Created a responsive and intuitive user interface
3. Integrated with a mock API (FakeStore API) for product data
4. Implemented state management for the shopping cart
5. Created a multi-step checkout process
6. Added search and filtering functionality
7. Implemented UI tests using Playwright
8. Created API tests using Axios and Jest

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/myecommerce-react.git
   ```

2. Navigate to the project directory:
   ```
   cd myecommerce-react
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Running Tests

To run UI tests:

```
npm run test:ui
```

To run API tests:

```
npm run test:api
```

To run all tests:

```
npm test
```

## Project Structure

```
myecommerce-react/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api.js
│   ├── App.js
│   └── index.js
├── tests/
│   ├── ui/
│   └── api/
├── package.json
├── playwright.config.js
├── jest.config.js
└── README.md
```

## Contributing

We welcome contributions to the MyEcommerce project. Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing mock e-commerce data
- [Create React App](https://create-react-app.dev/) for the initial project setup

| Test Title | Type | Automation Status |
|------------|------|-------------------|
| Homepage loads correctly | UI | Automated |
| Can filter products by category | UI | Automated |
| Can search for a specific product | UI | Automated |
| Can view product details | UI | Automated |
| Can add product to cart | UI | Automated |
| Can adjust quantity in cart | UI | Automated |
| Can remove product from cart | UI | Automated |
| Can complete checkout process | UI | Automated |
| Can view order history | UI | Automated |
| GET /products returns all products | API | Automated |
| GET /products/{id} returns a single product | API | Automated |
| GET /products/categories returns all categories | API | Automated |
| GET /products/category/{categoryName} returns products in a specific category | API | Automated |
| POST /products adds a new product | API | Automated |
| PUT /products/{id} updates a product | API | Automated |
| DELETE /products/{id} deletes a product | API | Automated |
| POST /auth/login authenticates a user | API | Automated |
