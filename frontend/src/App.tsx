import "./App.css";
import BookCards from "./components/BookCards";
import AddNewBookModal from "./components/AddNewBookModal";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App bg-zinc-900 min-w-dvw min-h-dvh text-white pt-6">
      <ToastContainer />
      <AddNewBookModal />
      <SearchBar />
      <BookCards />
    </div>
  );
}

export default App;
