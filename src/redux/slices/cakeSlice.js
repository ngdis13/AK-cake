import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const fetchCakes = createAsyncThunk(
  'cakes/fetchCakesStatus',
  async () => {
    const response = await 
    return response.data
  }
)

const initialState = {
  items: [],
};

const cakesSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }

  },
});

export const { setItems } = cakesSlice.actions;

export default cakesSlice.reducer;
