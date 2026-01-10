import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="customFooter mt-4">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h6 className="footer-brand">InstantVote</h6>
            <p className="footer-text">
              Real-time polling made simple & fast.
            </p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://gmail.com/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaEnvelope className="ms-1" />
            </a>
          </div>

          <div className="col-md-4 text-center text-md-end">
            <ul className="footer-links">
              <li>
                <a href="mailto:support@instantvote.com">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="footer-divider" />

        <p className="text-center footer-copy">
          © {new Date().getFullYear()} InstantVote. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
