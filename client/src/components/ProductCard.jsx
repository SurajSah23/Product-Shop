import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2 truncate">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-1">
            ({product.rating})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 ml-2">
                {product.discountPercentage}% off
              </span>
            )}
          </div>
          <button
            onClick={addToCartHandler}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-red-600 mt-2">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-sm text-red-600 mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
