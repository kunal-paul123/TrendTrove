import "./Footer.css";
import visa from "../../../images/visa.png";
import razorpay from "../../../images/razorpay.png";
import mastercard from "../../../images/masterCard.png";
import american from "../../../images/american.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2>
            <span className="highlight">Shopease</span>
          </h2>
          <p>
            The customer is at the heart of our unique business model, which
            includes design.
          </p>

          <div className="payment-methods">
            <img src={american} alt="American Express" />
            <img src={mastercard} alt="mastercard" />
            <img src={razorpay} alt="razorpay" />
            <img src={visa} alt="Visa" />
          </div>
        </div>

        <div className="footer-section">
          <h3>SHOPPING</h3>
          <ul>
            <li>
              <a href="">Clothing Store</a>
            </li>
            <li>
              <a href="">Trending Shoes</a>
            </li>
            <li>
              <a href="">Accessories</a>
            </li>
            <li>
              <a href="">Sale</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>SHOPPING</h3>
          <ul>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Payment Methods</a>
            </li>
            <li>
              <a href="">Delivery</a>
            </li>
            <li>
              <a href="">Return & Exchanges</a>
            </li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>NEWSLETTER</h3>
          <p>
            Be the first to know about new arrivals, look books, sales & promos!
          </p>
          <div className="email-box">
            <input type="email" placeholder="Your email" />
            <button>📩</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
