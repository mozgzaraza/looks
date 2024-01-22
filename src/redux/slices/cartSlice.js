// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart(state, action) {
//       const { item, selectedSize, selectedTime, typeRent } = action.payload;

//       const existingItem = state.cart.find(
//         (cartItem) =>
//           cartItem.id === item.id &&
//           cartItem.selectedSize === selectedSize &&
//           cartItem.selectedTime === selectedTime
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cart.push({
//           ...item,
//           selectedSize,
//           selectedTime,
//           typeRent,
//           quantity: 1,
//         });
//       }
//     },
//     removeFromCart(state, action) {
//       const { itemId, selectedSize, selectedTime } = action.payload;

//       const existingItemIndex = state.cart.findIndex(
//         (cartItem) =>
//           cartItem.id === itemId &&
//           cartItem.selectedSize === selectedSize &&
//           cartItem.selectedTime === selectedTime
//       );

//       if (existingItemIndex !== -1) {
//         const existingItem = state.cart[existingItemIndex];

//         if (existingItem.quantity > 1) {
//           existingItem.quantity -= 1;
//         } else {
//           // Если количество товара в корзине меньше или равно 1, удаляем его полностью
//           state.cart.splice(existingItemIndex, 1);
//         }
//       }
//     },
//   },
// });

// export const { setCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart(state, action) {
//       const { item, selectedSize, selectedTime, typeRent } = action.payload;

//       const existingItem = state.cart.find(
//         (cartItem) =>
//           cartItem.id === item.id &&
//           cartItem.selectedSize === selectedSize &&
//           cartItem.selectedTime === selectedTime
//       );

//       if (existingItem !== -1) {
//         state.cart.push({
//           ...item,
//           selectedSize,
//           selectedTime,
//           typeRent,
//           quantity: 1,
//         });
//       } else {
//         const existingItem = state.cart[existingItem];
//         existingItem.quantity += 1;
//       }
//     },
//     removeFromCart(state, action) {
//       const { itemId, selectedSize, selectedTime } = action.payload;

//       const existingItemIndex = state.cart.findIndex(
//         (cartItem) =>
//           cartItem.id === itemId &&
//           cartItem.selectedSize === selectedSize &&
//           cartItem.selectedTime === selectedTime
//       );

//       if (existingItemIndex !== -1) {
//         const existingItem = state.cart[existingItemIndex];

//         if (existingItem.quantity > 1) {
//           existingItem.quantity -= 1;
//         } else {
//           state.cart.splice(existingItemIndex, 1);
//         }
//       }
//     },
//   },
// });

// export const { setCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  return cartFromLocalStorage;
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      const { item, selectedSize, selectedTime, typeRent } = action.payload;

      state.cart.push({
        ...item,
        selectedSize,
        selectedTime,
        typeRent,
        quantity: 1,
      });

      saveCartToLocalStorage(state.cart);
    },
    removeFromCart(state, action) {
      const { itemId, selectedSize, selectedTime } = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (cartItem) =>
          cartItem.id === itemId &&
          cartItem.selectedSize === selectedSize &&
          cartItem.selectedTime === selectedTime
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }

        saveCartToLocalStorage(state.cart);
      }
    },
  },
});

export const { setCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
