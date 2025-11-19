import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Bob's Garage</h3>
          <p className="footer__text">
            Your trusted partner for all automotive services since 2004.
          </p>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Contact Information</h4>
          <div className="footer__contact">
            <div className="footer__contact-item">
              <span className="footer__label">
                <FaMapMarkerAlt className="footer__icon" />
                Address:
              </span>
              <span className="footer__value">123 Main Street, City, State 12345</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__label">
                <FaPhone className="footer__icon" />
                Phone:
              </span>
              <a href="tel:+15551234567" className="footer__value footer__link">
                (555) 123-4567
              </a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__label">
                <FaEnvelope className="footer__icon" />
                Email:
              </span>
              <a href="mailto:info@bobsgarage.com" className="footer__value footer__link">
                info@bobsgarage.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Connect With Us</h4>
          <div className="footer__social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} Bob's Garage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

