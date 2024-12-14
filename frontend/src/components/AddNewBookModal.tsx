import React, { useState } from "react";
import { useCreateBookMutation } from "../slices/booksSlice";
import { useBooks } from "../context/booksContext";
import { MdAddBox } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

// Functional component to handle adding a new book
export default function AddNewBookModal() {
  // State to control the visibility of the modal (hidden or shown)
  const [addBookModal, setAddBookModal] = useState("hidden");

  // State to store form data (title, author, date, copies)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [copies, setCopies] = useState(0);

  // Mutation hook for creating a new book using Redux
  const [createBook] = useCreateBookMutation();

  // Context hooks for managing book data and showing toast notifications
  const { addBook, errorToast, successToast } = useBooks();

  // Handle form submission, including validation and API call
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks for all form fields
    if (!title || typeof title !== "string") {
      errorToast("Title must be provided and valid string");
      return;
    }
    if (!author || typeof author !== "string") {
      errorToast("Author must be provided and valid string");
      return;
    }
    if (!date || typeof date !== "string") {
      errorToast("Publish Date must be provided and valid string");
      return;
    }
    if (copies < 0 || isNaN(copies)) {
      errorToast("Copies must be provided and valid positive number");
      return;
    }

    // Create new book by calling the mutation
    createBook({
      title,
      author,
      publishedDate: date,
      availableCopies: copies,
    }).then((res) => {
      // If the API call fails, show error message
      if (res.error) {
        console.log(res.error);
        errorToast("Failed to add a new book.");
      } else {
        // If successful, add book to state and show success message
        addBook(res.data.book);
        successToast("New book has been created.");
        closeModal(); // Close the modal after success
      }
    });
  };

  // Toggle the modal visibility (open or close)
  const handleOpenCloseModal = () => {
    if (addBookModal === "hidden") {
      openModal(); // Open modal if it's hidden
    } else {
      closeModal(); // Close modal if it's open
    }
  };

  // Open the modal (set its state to 'fixed' to make it visible)
  const openModal = () => {
    setAddBookModal("fixed");
  };

  // Close the modal and reset form values
  const closeModal = () => {
    setTitle("");
    setAuthor("");
    setCopies(0);
    setDate("");
    setAddBookModal("hidden"); // Hide modal
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div className="fixed px-3">
        <button
          className=" p-1 border border-blue-600 bg-blue-600 font-semibold hover:bg-blue-700 rounded-lg flex gap-0.5 sm:gap-2 items-center"
          onClick={handleOpenCloseModal} // Toggle modal visibility
        >
          Add Book
          <MdAddBox className="text-3xl " />
        </button>
      </div>

      {/* Modal to add new book */}
      <div
        className={`w-full h-dvh flex justify-center items-center ${addBookModal} z-40 bg-gray-500/30 fixed top-0`}
      >
        <form
          onSubmit={handleSubmitForm} // Handle form submission
          className="w-2/3 h-1/2 bg-zinc-800/95 rounded-lg flex flex-col gap-2 justify-center items-center relative border "
        >
          {/* Close button for the modal */}
          <div className="absolute top-2 left-2">
            <button
              type="button"
              className="text-3xl border hover:bg-gray-700 rounded-md"
              onClick={closeModal} // Close modal when clicked
            >
              <IoMdClose />
            </button>
          </div>

          {/* Title input field */}
          <input
            type="text"
            value={title}
            placeholder="Title"
            className="p-1 rounded-md text-black border border-black w-2/3 text-center :border-blue-300"
            onChange={(e) => {
              setTitle(e.currentTarget.value); // Update title on change
            }}
          />

          {/* Author input field */}
          <input
            type="text"
            value={author}
            placeholder="Author"
            className="p-1 rounded-md text-black border border-black w-2/3 text-center :border-blue-300"
            onChange={(e) => {
              setAuthor(e.currentTarget.value); // Update author on change
            }}
          />

          {/* Date input field */}
          <input
            type="date"
            value={date}
            placeholder="Publish Date"
            className="p-1 rounded-md text-black border border-black w-2/3 text-center :border-blue-300"
            onChange={(e) => {
              setDate(e.currentTarget.value); // Update date on change
            }}
          />

          {/* Available copies input field */}
          <input
            type="number"
            value={copies}
            placeholder="Available Copies"
            className="p-1 rounded-md text-black border border-black w-2/3 text-center :border-blue-300"
            onChange={(e) => {
              setCopies(Number(e.currentTarget.value)); // Update copies on change
            }}
          />

          {/* Submit button to add the new book */}
          <button
            type="submit"
            className="mt-3 p-2 border border-blue-400 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add New Book
          </button>
        </form>
      </div>
    </div>
  );
}
