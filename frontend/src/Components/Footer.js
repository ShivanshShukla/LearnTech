import React from 'react';
import '../Styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="mb-0">© 2024 LearnTech. All Rights Reserved.</p>
            <p>
              Follow us on:
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white ml-2">
                Facebook
              </a>
              |
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white ml-2">
                Twitter
              </a>
              |
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white ml-2">
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
