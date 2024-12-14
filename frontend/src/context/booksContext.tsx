import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Book, BooksContextType } from "../Interfaces/MyInterfaces";
import { useGetBooksQuery } from "../slices/booksSlice";
import { toast } from "react-toastify";

// Create a context for managing books globally
const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Provider component for the BooksContext
export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetBooksQuery(); // Fetch books data from the API slice
  const [books, setBooks] = useState<Book[]>([]); // State for storing books
  const [searchStr, setSearchStr] = useState<string>(""); // State for storing search string

  // Update books when the data is fetched from the API
  useEffect(() => {
    if (data) {
      setBooks(data); // Set the fetched books data to state
    }
  }, [data]);

  // Function to add a new book to the list
  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  // Function to update an existing book in the list
  const updateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  // Function to delete a book from the list
  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Filter books dynamically based on the search string (searchStr)
  const filteredBooks = searchStr
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchStr.toLowerCase()) ||
          book.author.toLowerCase().includes(searchStr.toLowerCase())
      )
    : books; // If no searchStr, return all books

  // Function to show success toast notification
  const successToast = (text: string) =>
    toast.success(text, {
      toastId: text,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton: false,
      theme: "dark",
    });

  // Function to show error toast notification
  const errorToast = (text: string) =>
    toast.error(text, {
      toastId: text,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      closeButton: false,
      theme: "dark",
    });

  // Return the BooksContext.Provider with all values needed in the context
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        addBook,
        updateBook,
        deleteBook,
        filteredBooks,
        searchStr,
        setSearchStr,
        successToast,
        errorToast,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

// Custom hook to use the BooksContext
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
