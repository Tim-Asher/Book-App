import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddBookData,
  Book,
  ResBookData,
  DeleteBookResponse,
  UpdateBookData,
} from "../Interfaces/MyInterfaces";

// Define API slice for handling book-related operations (get, create, update, delete)
export const booksApiSlice = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    // Fetch all books from the server
    // Transform response to extract books array directly
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/books",
        method: "get",
      }),
      transformResponse: (response: { books: Book[] }) => response.books,
    }),

    // Fetch a single book by its ID
    getBook: builder.query<Book, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "get",
      }),
    }),

    // Create a new book entry on the server
    // The request body follows the structure defined by AddBookData
    createBook: builder.mutation<ResBookData, AddBookData>({
      query: (data) => ({
        url: "/books",
        method: "post",
        body: data,
      }),
    }),

    // Update an existing book entry in the database
    // The request body follows the structure defined by UpdateBookData
    updateBookFromDB: builder.mutation<
      ResBookData,
      { id: string; data: UpdateBookData }
    >({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "put",
        body: data,
      }),
    }),

    // Delete a book from the database by its ID
    deleteBookFromDB: builder.mutation<DeleteBookResponse, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "delete",
      }),
    }),
  }),
});

// Export hooks to interact with the API
export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookFromDBMutation,
  useDeleteBookFromDBMutation,
} = booksApiSlice;
