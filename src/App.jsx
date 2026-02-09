import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import VelvexDownloads from "./pages/Download";
import Playground from "./pages/Playground";
import Docs from "./pages/Docs";
import Navbar from "./components/Navbar";

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
          <Route path="/docs" element={<Docs />} />
          {/* Optional: Add a 404 catch-all */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;