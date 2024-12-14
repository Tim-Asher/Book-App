import app from "./index";

const PORT = process.env.PORT || 8080; // Use the environment's PORT or default to 8080

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log the server URL
});
