const axios = require('axios');
const asyncHandler = require('../middleware/asyncHandler');

// Base URL for DummyJSON API
const API_BASE_URL = 'https://dummyjson.com';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { limit = 30, skip = 0, select } = req.query;
  
  let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
  
  if (select) {
    url += `&select=${select}`;
  }
  
  const { data } = await axios.get(url);
  res.json(data);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { data } = await axios.get(`${API_BASE_URL}/products/${req.params.id}`);
  
  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/products/category/${req.params.category}`
  );
  
  res.json(data);
});

// @desc    Fetch all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const { data } = await axios.get(`${API_BASE_URL}/products/categories`);
  res.json(data);
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    res.status(400);
    throw new Error('Please provide a search query');
  }
  
  const { data } = await axios.get(`${API_BASE_URL}/products/search?q=${q}`);
  res.json(data);
});

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  searchProducts
};
