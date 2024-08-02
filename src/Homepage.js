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
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary"
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
