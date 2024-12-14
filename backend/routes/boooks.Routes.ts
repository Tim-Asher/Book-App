// Import controller functions for handling book-related operations
import {
  addBook,
  deleteBook,
  editBook,
  getBook,
  getBooks,
} from "../controllers/book.Controller";

// Import Express to create a router
const express = require("express");
const router = express.Router(); // Create an instance of the Express router

// Route to handle adding a new book
// POST request to the base route ("/") will trigger the `addBook` controller
router.route("/").post(addBook);

// Route to handle editing an existing book
// PUT request with an ID parameter ("/:id") will trigger the `editBook` controller
router.route("/:id").put(editBook);

// Route to handle deleting a book
// DELETE request with an ID parameter ("/:id") will trigger the `deleteBook` controller
router.route("/:id").delete(deleteBook);

// Route to fetch a specific book by ID
// GET request with an ID parameter ("/:id") will trigger the `getBook` controller
router.route("/:id").get(getBook);

// Route to fetch all books
// GET request to the base route ("/") will trigger the `getBooks` controller
router.route("/").get(getBooks);

// Export the router to be used in other parts of the application
export default router;
