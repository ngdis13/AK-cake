import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import CartItem from '../../pages/CartItem';
import axios from 'axios';

export type CartItem = {
  id: string;
  title: string; 
  category: string;
  imageUrl: string; 
  types: string;
  price: number;
}

interface CakeSliceState {
  items: CartItem[];
  status: 'loading' | 'success' | 'error';
}

const initialState: CakeSliceState = {
  items: [],
  status: 'loading',
};

type FetchCakesArgs = {
  categoryId: number;
  sortType: string; 
  searchValue: string; 
  currentPage: number;
}

export const fetchCakes = createAsyncThunk(
  'cakes/fetchCakesStatus',
  async ({categoryId, sortType, searchValue, currentPage}: FetchCakesArgs) => {
    const category = categoryId > 0 ? `categoryID=${categoryId}&` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    const url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    const response = await axios.get(url);


    if (!Array.isArray(response.data)) {
      console.error('API returned data that is not an array:', response.data);
      return [];
    }
    return response.data as CartItem[];
  }
)

const cakesSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CartItem>) {
        state.items = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCakes.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCakes.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});


export const selectCakeData = (state: RootState) => state.cake;

export const { setItems } = cakesSlice.actions;

export default cakesSlice.reducer;
