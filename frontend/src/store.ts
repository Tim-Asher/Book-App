import { configureStore } from "@reduxjs/toolkit";
import { booksApiSlice } from "./slices/booksSlice";

// Define the store
const store = configureStore({
  reducer: {
    // Add the reducers for the API slices
    [booksApiSlice.reducerPath]: booksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApiSlice.middleware), // Add the middleware for userApiSlice
  devTools: true, // Enable Redux DevTools in development
});

export default store;
