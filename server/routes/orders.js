const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getUserOrders, 
  updateOrderToPaid,
  updateOrderToDelivered 
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, createOrder);

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, getUserOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', protect, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
