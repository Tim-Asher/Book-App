import express from "express"; // Import the Express framework
import cors from "cors"; // Import the CORS middleware for handling cross-origin requests
import booksRoutes from "../routes/boooks.Routes"; // Import book routes module

const app = express(); // Create an Express application instance

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Route handler for book-related requests
app.use("/books", booksRoutes);

// Default route to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" }); // Respond with a JSON message
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." }); // Respond with a 404 error and message
});

export default app;
