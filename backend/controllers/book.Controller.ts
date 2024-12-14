import { Request, Response, NextFunction } from "express";
import { Book } from "../models/bookModel";
import { validateBook } from "../validation/bookValidate";
import { generateRandomId } from "../utils/idGenerator";

// In-memory array to store books
const books: Book[] = [
  {
    id: "1",
    title: "How to Survive Software Engineering: The Coffee Chronicles",
    author: "Tim the Code Explorer",
    publishedDate: "2024-05-21",
    availableCopies: 5,
  },
  {
    id: "2",
    title: "The MERN Stack Journey: From Noob to Ninja",
    author: "Tim the Tech Adventurer",
    publishedDate: "2023-08-16",
    availableCopies: 3,
  },
  {
    id: "3",
    title: "Debugging: The Art of Solving Problems That You Created",
    author: "Tim the Bug Buster",
    publishedDate: "2022-10-01",
    availableCopies: 4,
  },
  {
    id: "4",
    title:
      "The Secret Life of a GitHub Repository: Tales of Branches and Merges",
    author: "Tim the Code Chaser",
    publishedDate: "2021-11-23",
    availableCopies: 2,
  },
];

/**
 * Adds a new book to the collection.
 */
export async function addBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("addBook");

    // Extract the book data from the request body
    const book: Partial<Book> = req.body;

    // Validate the book data
    const errors = validateBook(book);
    if (errors.length > 0) {
      res.status(400).json({ message: errors });
      return;
    }

    // Create a new book object with a unique ID
    const newBook: Book = {
      ...book,
      id: generateRandomId(),
    } as Book;

    // Add the new book to the array
    books.push(newBook);
    res.status(201).json({ book: newBook });
  } catch (err) {
    res.status(400).json({ message: "There was an error creating a new book" });
  }
}

/**
 * Retrieves all books from the collection.
 */
export async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json({ books });
  } catch (err) {
    res.status(400).json({ message: "There was an error fetching the data" });
  }
}

/**
 * Retrieves a single book by its ID.
 */
export async function getBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("getBook");

    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "ID must be provided." });
      return;
    }

    // Find the book by its ID
    const book = books.find((book) => book.id === id);
    if (!book) {
      res.status(404).json({ message: "The book was not found." });
      return;
    }

    res.status(200).json({ book });
  } catch (err) {
    res.status(400).json({ message: "There was an error fetching the data" });
  }
}

/**
 * Updates an existing book by its ID.
 */
export async function editBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "ID must be provided." });
      return;
    }

    // Extract the updated data from the request body
    const updatedData = req.body;

    // Find the index of the book to update
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      res.status(400).json({ message: "The book was not found." });
      return;
    }

    // Update the book with the new data
    books[index] = { ...books[index], ...updatedData };

    res.status(200).json({ book: books[index] });
  } catch (err) {
    res.status(400).json({ message: "There was an error updating the book" });
  }
}

/**
 * Deletes a book by its ID.
 */
export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "ID must be provided." });
      return;
    }

    // Find the index of the book to delete
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      res.status(400).json({ message: "The book was not found." });
      return;
    }

    // Remove the book from the array
    books.splice(index, 1);

    res.status(204).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ message: "There was an error deleting the book" });
  }
}
