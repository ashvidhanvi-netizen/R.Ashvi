import "./ProductCard.css";
import phoneImage from "../assets/product/phone_1.jpg";

function ProductCard() {
  return (
    <div className="products">

      <div className="product-card">
        <img
          src={phoneImage}
          alt="Smart Phone"
          className="product-image"
        />

        <h2>Smart Phone</h2>
        <p className="price">₹25,000</p>

        <button>Buy Now</button>
      </div>

      <div className="product-card">
        <img
          src="/product-public.jpg"
          alt="Smart Watch"
          className="product-image"
        />

        <h2>Smart Watch</h2>
        <p className="price">₹15,000</p>

        <button>Buy Now</button>
      </div>

    </div>
  );
}

export default ProductCard;