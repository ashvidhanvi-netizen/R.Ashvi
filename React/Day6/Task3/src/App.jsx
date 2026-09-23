const App = () => {

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 55000,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Mobile",
      price: 25000,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Keyboard",
      price: 1500,
      category: "Accessories"
    }
  ];

  return (
    <div
      style={{
        backgroundColor: "#9d77c5",
        minHeight: "100vh",
        padding: "30px"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        Product List
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "220px",
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
          </div>

        ))}

      </div>

    </div>
  );
};

export default App;