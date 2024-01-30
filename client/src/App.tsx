import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import PatientHomePage from "./pages/Patient/PatientHomePage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin" Component={AdminLoginPage} />
          <Route path="/doctor" Component={DoctorHomePage} />
          <Route path="/" Component={PatientHomePage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
