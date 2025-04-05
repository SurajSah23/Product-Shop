import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  loading: false,
  error: null,
  success: false,
};

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      // Get product details
      const { data } = await axios.get(`/api/products/${productId}`);
      
      return {
        product: data.id,
        name: data.title,
        image: data.thumbnail,
        price: data.price,
        countInStock: data.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { getState }) => {
    return productId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === productId
      );
      
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        
        if (existingItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        );
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      });
  },
});

export const { clearCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
