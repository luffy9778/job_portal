import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import RecuriterLogin from "./pages/recruiter/RecuriterLogin";
import RecruiterSignup from "./pages/recruiter/RecruiterSignup";
import RecruiterHome from "./pages/recruiter/RecruiterHome";
import JobDetailsPage from "./pages/user/JobDetailsPage";
import JobApplicationForm from "./pages/user/JobApplicationForm";
import ViewRecruiterList from "./pages/admin/ViewRecruiterList";
import AdminLogin from "./pages/admin/AdminLogin";
import PersistLogin from "./components/PersistLogin";
import RequiredAuth from "./components/RequiredAuth";
import UserLayout from "./components/user/userLayout";
import RecruiterLayout from "./components/recruiter/RecruiterLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>

          {/* user protected routes */}

          <Route element={<RequiredAuth allowedRoles="user" />}>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="/jobDetails" element={<JobDetailsPage />} />
              <Route path="/jobSubmit" element={<JobApplicationForm />} />
            </Route>
          </Route>

          {/* recruiter protected routes */}

          <Route element={<RequiredAuth allowedRoles="recruiter" />}>
            <Route path="/recruiter" element={<RecruiterLayout />}>
              <Route index element={<RecruiterHome />} />
            </Route>
          </Route>

          {/* admin protected routes */}

          <Route element={<RequiredAuth allowedRoles="admin" />}>
            <Route path="/admin/viewlist" element={<ViewRecruiterList />} />
          </Route>
        </Route>

        <Route path="/signUp" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/recruiterLogin" element={<RecuriterLogin />} />
        <Route path="/recruiterSignup" element={<RecruiterSignup />} />

        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
