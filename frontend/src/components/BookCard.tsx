import { useState } from "react";
import { Book } from "../Interfaces/MyInterfaces"; // Import Book interface for type checking
import {
  useDeleteBookFromDBMutation,
  useUpdateBookFromDBMutation,
} from "../slices/booksSlice"; // Import mutations for deleting and updating books in the database
import { useBooks } from "../context/booksContext"; // Import context hook for managing local book state
import { MdEdit, MdDelete, MdOutlineSaveAlt } from "react-icons/md"; // Import icons
import { IoIosArrowBack } from "react-icons/io"; // Import icon for back button

export default function BookCard({ book }: { book: Book }) {
  // Local state for book attributes (title, author, date, copies)
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [date, setDate] = useState(book.publishedDate);
  const [copies, setCopies] = useState(book.availableCopies);

  // Hooks for mutations (delete and update book in DB)
  const [deleteBookFromDB] = useDeleteBookFromDBMutation();
  const [updateBookFromDB] = useUpdateBookFromDBMutation();

  // Extract methods from context
  const { deleteBook, updateBook, successToast, errorToast } = useBooks();
  const [editFormOpen, setEditFormOpen] = useState(false); // State to toggle edit form visibility

  // Handler for delete button
  const handleDeleteButton = () => {
    // Delete book from DB and then update local state
    deleteBookFromDB(book.id).then((res) => {
      deleteBook(book.id);
      successToast(`The book "${book.title}" has been deleted`);
    });
  };

  // Toggle the state to switch between view and edit modes
  const switchEditState = () => {
    editFormOpen ? setEditFormOpen(false) : setEditFormOpen(true);
  };

  // Handler for save button after editing
  const handleSaveButton = () => {
    // Checks if there is change in the book
    if (
      title === book.title &&
      author === book.author &&
      date === book.publishedDate &&
      copies === book.availableCopies
    ) {
      switchEditState();
      return;
    }
    // Validate inputs before saving
    if (!title || typeof title !== "string") {
      errorToast("Title must be provided and valid string");
      return;
    }
    if (!author || typeof author !== "string") {
      errorToast("Author must be provided and valid string");
      return;
    }
    if (!date || typeof date !== "string") {
      errorToast("Publish Date must be provided.");
      return;
    }
    if (copies < 0 || typeof copies !== "number") {
      errorToast("Copies must be provided and valid positive number");
      return;
    }

    // Prepare updated book data
    const updatedBook = {
      title,
      author,
      publishedDate: date,
      availableCopies: copies,
    };

    // Call the update mutation and update local state
    updateBookFromDB({ id: book.id, data: updatedBook }).then((res) => {
      if (res.data) {
        updateBook(res.data.book); // Update book in context
        successToast("The book has been edited.");
      }
      switchEditState(); // Switch back to view mode
    });
  };

  return (
    <div className="border border-gray-400 bg-gray-400/20 font-semibold p-1 flex justify-between items-center rounded-md w-1/2 md:w-1/3 lg:w-1/4">
      {editFormOpen ? (
        <>
          {/* Render editable form when edit mode is active */}
          <div className="flex flex-col gap-0.5 w-4/5 justify-around h-full">
            <input
              type="text"
              className=" text-black rounded-sm px-1"
              value={title}
              placeholder={book.title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
            <input
              type="text"
              className=" text-black rounded-sm px-1"
              value={author}
              placeholder={book.author}
              onChange={(e) => {
                setAuthor(e.currentTarget.value);
              }}
            />
            <input
              type="date"
              className=" text-black rounded-sm px-1"
              value={date}
              placeholder={book.publishedDate}
              onChange={(e) => {
                setDate(e.currentTarget.value);
              }}
            />
            <input
              type="number"
              className=" text-black rounded-sm px-1"
              value={copies}
              placeholder={String(book.availableCopies)}
              onChange={(e) => {
                setCopies(Number(e.currentTarget.value));
              }}
            />
          </div>

          {/* Buttons to save or cancel edit */}
          <div className="flex flex-col gap-3">
            <button
              className="border border-green-600 bg-green-600 hover:bg-green-700 p-1 rounded-md"
              onClick={handleSaveButton}
            >
              <MdOutlineSaveAlt className="text-2xl font-bold " />
            </button>
            <button
              className="border border-red-600 bg-red-600 hover:bg-red-700 p-1 rounded-md"
              onClick={switchEditState}
            >
              <IoIosArrowBack className="text-2xl" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Render book details in view mode */}
          <div className="flex flex-col h-full justify-between">
            <p className="font-serif font-semibold">
              {book.title}
              <br></br>
              <span className="text-sm text-zinc-300 font-sans font-light">
                {book.author}
              </span>
            </p>
            <p>
              <span className="underline text-sm ">Publish Date:</span>{" "}
              {book.publishedDate}
            </p>
            <p>
              <span className="underline text-sm">Avilable Copies:</span>{" "}
              {book.availableCopies}
            </p>
          </div>

          {/* Buttons to edit or delete the book */}
          <div className="flex flex-col gap-2">
            <button
              className="border border-green-600 bg-green-600 hover:bg-green-700 p-1 rounded-md"
              onClick={switchEditState}
            >
              <MdEdit className="text-2xl" />
            </button>
            <button
              className="border border-red-600 bg-red-600 hover:bg-red-700 p-1 rounded-md"
              onClick={handleDeleteButton}
            >
              <MdDelete className="text-2xl " />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
