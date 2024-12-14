// Import the Book model interface
import { Book } from "../models/bookModel";

// Function to validate a Partial<Book> object and return a list of error messages
export function validateBook(book: Partial<Book>): string[] {
  // Initialize an array to store validation error messages
  const errors: string[] = [];

  // Validate the `title` field: it must be a non-empty string
  if (typeof book.title !== "string" || !book.title)
    errors.push("Title must be provided, and a valid string.");

  // Validate the `author` field: it must be a non-empty string
  if (typeof book.author !== "string" || !book.author)
    errors.push("Author must be provided, and a valid string.");

  // Validate the `publishedDate` field: it must be a non-empty string
  if (typeof book.publishedDate !== "string" || !book.publishedDate)
    errors.push("publishedDate must be provided, and a valid string.");

  // Validate the `availableCopies` field: it must be a number greater than or equal to 0
  if (typeof book.availableCopies !== "number" || book.availableCopies < 0)
    errors.push("availableCopies must be provided, and be a positive number.");

  // Return the array of errors (empty if no errors)
  return errors;
}
