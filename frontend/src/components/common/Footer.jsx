import React from "react";

function Footer() {
  return (
    <footer
      className="bg-dark text-white py-4"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="container text-center">

        <h6 className="fw-semibold mb-2">
          🍽️ Restaurant Management System
        </h6>

        <small className="text-secondary d-block">
          © 2026 All Rights Reserved.
        </small>

        <small className="text-secondary">
          Version 1.0.0
        </small>

      </div>
    </footer>
  );
}

export default Footer;