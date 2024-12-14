// Represents a book object with its basic properties
export interface Book {
  id: string; // Unique identifier for each book
  title: string; // The title of the book
  author: string; // The author of the book
  publishedDate: string; // The publication date of the book
  availableCopies: number; // The number of available copies of the book
}

// Data format for adding a new book (used when creating a book)
export interface AddBookData {
  title: string; // Title of the new book
  author: string; // Author of the new book
  publishedDate: string; // Publication date of the new book
  availableCopies: number; // Number of available copies of the new book
}

// Data format for updating an existing book (fields are optional)
export interface UpdateBookData {
  title?: string; // New title for the book (optional)
  author?: string; // New author for the book (optional)
  publishedDate?: string; // New publication date (optional)
  availableCopies?: number; // New number of available copies (optional)
}

// Response format when a book is returned from an API (includes the book)
export interface ResBookData {
  book: Book; // The book data returned from the API
}

// Response format for deleting a book from the database
export interface DeleteBookResponse {
  status: string; // Status of the delete operation (e.g., 'success')
  message: string; // A message providing more information about the result
}

// Context type for managing books in the application
export interface BooksContextType {
  books: Book[]; // List of all books
  setBooks: (books: Book[]) => void; // Function to update the list of books
  filteredBooks: Book[]; // A filtered list of books based on search or other criteria
  searchStr: string; // The current search string for filtering books
  setSearchStr: (str: string) => void; // Function to update the search string
  addBook: (newBook: Book) => void; // Function to add a new book
  updateBook: (updatedBook: Book) => void; // Function to update an existing book
  deleteBook: (id: string) => void; // Function to delete a book by its ID
  successToast: (text: string) => void; // Function to show a success toast notification
  errorToast: (text: string) => void; // Function to show an error toast notification
}
