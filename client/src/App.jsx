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
import ViewRecruiterList from "./pages/admin/recruiter/ViewRecruiterList";
import AdminLogin from "./pages/admin/AdminLogin";
import PersistLogin from "./components/PersistLogin";
import RequiredAuth from "./components/RequiredAuth";
import UserLayout from "./components/user/userLayout";
import RecruiterLayout from "./components/recruiter/RecruiterLayout";
import Profile from "./pages/user/profile/Profile";
import RecruiterViewJobs from "./pages/recruiter/RecruiterViewJobs";
import Serach from "./pages/user/Serach";
import ApplicationView from "./pages/recruiter/ApplicationView";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import MyJobs from "./pages/user/MyJobs";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          {/* user protected routes */}

          <Route element={<RequiredAuth allowedRoles="user" />}>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="/jobDetails/:id" element={<JobDetailsPage />} />
              {/* <Route path="/jobSubmit" element={<JobApplicationForm />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Serach />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Serach />} />
              <Route path="/jobApply/:id" element={<JobApplicationForm />} />
              <Route path="/myjobs" element={<MyJobs />} />
            </Route>
          </Route>

          {/* recruiter protected routes */}

          <Route element={<RequiredAuth allowedRoles="recruiter" />}>
            <Route path="/recruiter" element={<RecruiterLayout />}>
              <Route index element={<RecruiterHome />} />
              <Route path="jobview" element={<RecruiterViewJobs />} />
              <Route path="viewapplication/:id" element={<ApplicationView />} />
            </Route>
          </Route>

          {/* admin protected routes */}

          <Route element={<RequiredAuth allowedRoles="admin"/>}>
            <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="viewlist" element={<ViewRecruiterList />} />
            </Route>
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
