import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { _id: '1', name: 'asif' },
  { _id: '2', name: 'asad' },
  { _id: '3', name: 'amir' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
