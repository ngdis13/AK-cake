import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import cake from './slices/cakeSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    cake
  }
}) 