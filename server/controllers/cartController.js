const asyncHandler = require('../middleware/asyncHandler');
const Cart = require('../models/cartModel');
const axios = require('axios');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Fetch product details for each item in cart
    const cartItems = await Promise.all(
      cart.items.map(async (item) => {
        try {
          const { data } = await axios.get(`https://dummyjson.com/products/${item.product}`);
          return {
            ...item.toObject(),
            productDetails: data
          };
        } catch (error) {
          return {
            ...item.toObject(),
            productDetails: null
          };
        }
      })
    );

    res.json({
      _id: cart._id,
      user: cart.user,
      items: cartItems,
      totalPrice: cart.totalPrice
    });
  } else {
    // If cart doesn't exist, create an empty one
    const newCart = await Cart.create({
      user: req.user._id,
      items: [],
      totalPrice: 0
    });

    res.json(newCart);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Fetch product details from DummyJSON API
  const { data: product } = await axios.get(`https://dummyjson.com/products/${productId}`);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create new cart if it doesn't exist
    cart = await Cart.create({
      user: req.user._id,
      items: [],
      totalPrice: 0
    });
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if product already in cart
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.items.push({
      product: productId,
      name: product.title,
      image: product.thumbnail,
      price: product.price,
      quantity
    });
  }

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(201).json(cart);
});

// @desc    Update cart item
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Update quantity or remove if quantity is 0
  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Remove item from cart
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.json({ message: 'Cart cleared' });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
