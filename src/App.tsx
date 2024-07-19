import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CommentsTable } from "./components/CommentsTable";
import { CurrentComment } from "./components/CurrentComment";
import { CommentsProvider } from "./components/Provider";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    async function handleFetchComments() {
      try {
        const response = await axios.get("http://localhost:5000/comments");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    handleFetchComments();
  }, []);

  return (
    <Router>
      <CommentsProvider>
      <section className="flex flex-col w-full min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-5">
          <Routes>
            <Route path="/" element={<CommentsTable />} />
            <Route path="/comment/:id" element={<CurrentComment />} />
          </Routes>
        </section>
      </CommentsProvider>
    </Router>
  );
};

export default App;
