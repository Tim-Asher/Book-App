import request from "supertest";
import app from "../src/index";
import { Book } from "../models/bookModel";
import { describe } from "node:test";

const mockBook: Omit<Book, "id"> = {
  title: "Test Book",
  author: "Tim Asher",
  publishedDate: "2012-04-05",
  availableCopies: 1000,
};

describe("Book Api Test", () => {
  let bookId: string;

  it("should add a new book", async () => {
    const response = await request(app)
      .post("/books")
      .send(mockBook)
      .expect(201);

    expect(response.body).toHaveProperty("book");
    expect(response.body.book).toMatchObject(mockBook);
    bookId = response.body.book.id;
  });

  it("should get all book", async () => {
    const response = await request(app).get("/books").expect(200);

    expect(response.body).toHaveProperty("books");
    expect(Array.isArray(response.body.books)).toBe(true);
    expect(response.body.books.length).toBeGreaterThan(0);
  });

  it("sould get a specific book by ID", async () => {
    const response = await request(app).get(`/books/${bookId}`).expect(200);

    expect(response.body).toHaveProperty("book");
    expect(response.body.book.id).toBe(bookId);
  });

  it("Sould update an existing book", async () => {
    const updatedBook = { title: "Update Test Book" };
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send(updatedBook)
      .expect(200);

    expect(response.body).toHaveProperty("book");
    expect(response.body.book.title).toBe(updatedBook.title);
  });

  it("sould return an error for invalid book creating", async () => {
    const invalidBook = { author: "No Title" };
    const response = await request(app)
      .post("/books")
      .send(invalidBook)
      .expect(400);

    expect(response.body).toHaveProperty("message");
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toContainEqual(
      "Title must be provided, and a valid string."
    );
  });

  it("sould return 404 for non-eistent route", async () => {
    const response = await request(app).get("/non-existent-route").expect(404);

    expect(response.body).toHaveProperty("error", "Route not found.");
  });
});
