// Define the structure of the `Book` object using a TypeScript interface
export interface Book {
  // Unique identifier for the book
  id: string;

  // Title of the book
  title: string;

  // Author of the book
  author: string;

  // Publication date of the book in string format (e.g., "YYYY-MM-DD")
  publishedDate: string;

  // Number of copies available in string format (e.g., "10")
  availableCopies: number;
}
