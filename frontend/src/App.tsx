import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import FormPage from "./pages/FormPage";
import SubmissionsPage from "./components/form/fields/SubmissionPage";
import Header from "./components/layout/Header";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-[#fef3ea]">
      <Header />
      <main className="transition-all duration-300">
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
        </Routes>
      </main>
    </div>

    <style>{`
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      header { animation: slideDown 0.4s ease-out; }
      main > * { animation: fadeIn 0.5s ease-out; }
      body {
        background-color: #fef3ea;
      }
    `}</style>
  </BrowserRouter>
);

export default App;
