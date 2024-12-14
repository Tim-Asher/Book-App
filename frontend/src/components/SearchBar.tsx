import { useBooks } from "../context/booksContext"; // Import custom hook to access books context

export default function SearchBar() {
  // Destructure searchStr and setSearchStr from the books context
  const { searchStr, setSearchStr } = useBooks();

  return (
    <div className="flex justify-center gap-2">
      {/* Input field for search */}
      <input
        type="text"
        value={searchStr} // Bind the value of input to the search string from context
        className="rounded-lg px-3 py-2 text-black w-56 sm:w-1/2"
        placeholder="Search by Title or Author.." // Placeholder text to indicate the input purpose
        // On change of input, update the search string in the context
        onChange={(e) => {
          setSearchStr(e.currentTarget.value); // Update searchStr in context with the new input value
        }}
      />
    </div>
  );
}
