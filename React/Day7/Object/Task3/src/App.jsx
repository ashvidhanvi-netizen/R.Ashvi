const App = () => {

  const product = {
    name: "Smartphone",
    price: 25000,
    category: "Electronics",
    brand: "Samsung"
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Product Details
      </h1>

      <div className="bg-orange-600 p-5 rounded-lg w-fit">
        <p className="mb-2">Name: {product.name}</p>
        <p className="mb-2">Price: ₹{product.price}</p>
        <p className="mb-2">Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
      </div>
    </div>
  );
};

export default App;