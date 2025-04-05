import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopMERN</h3>
            <p className="text-gray-300">
              Your one-stop shop for all your shopping needs. Quality products at
              affordable prices.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-300 hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white">
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: info@shopmern.com
              <br />
              Phone: +1 (123) 456-7890
              <br />
              Address: 123 Shopping St, E-commerce City
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            &copy; {currentYear} ShopMERN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
