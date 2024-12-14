import BookCard from "./BookCard"; // Import the BookCard component to display each book
import { useBooks } from "../context/booksContext"; // Import the custom hook to access books context

export default function BookCards() {
  // Destructure filteredBooks from the books context, which contains the filtered list of books
  const { filteredBooks } = useBooks();

  return (
    <div className="flex gap-2 p-3 flex-wrap justify-center">
      {/* Map over the filteredBooks array and render a BookCard for each book */}
      {filteredBooks?.map((book) => (
        <BookCard book={book} key={book.id} /> // Pass each book as a prop to the BookCard component
      ))}
    </div>
  );
}
