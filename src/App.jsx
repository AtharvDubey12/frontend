import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import VelvexDownloads from "./pages/Download";
import Playground from "./pages/Playground";
import Navbar from "./components/Navbar";
import Docs from "./pages/Docs";
import DocPage from "./components/DocPage";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Content wrapper with top margin for fixed navbar */}
      <div className="pt-15">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/download" element={<VelvexDownloads />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/docs" element={<Docs />}>
            {/* This index route redirects /docs to the introduction */}
            <Route
              index
              element={
                <Navigate to="/docs/getting-started/introduction" replace />
              }
            />

            {/* The dynamic route that catches everything else */}
            <Route path=":section/:id" element={<DocPage />} />
          </Route>
          {/* Optional: Add a 404 catch-all */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
