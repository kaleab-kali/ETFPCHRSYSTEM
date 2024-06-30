import React from "react";
import { Routes, Route } from "react-router-dom";
import { DatePicker } from "antd";
import Dashboard from "./pages/Dashboard";
import EmployeeProfilePage from "./pages/EmployeeProfile/EmployeeProfilePage";
import EmployeeRegistrationPage from "./pages/EmployeeRegistration/EmployeeRegistrationPage";
import LoginPage from "./pages/Login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginEmployee from "./pages/LoginEmployee/LoginEmployee";
import LoginPage2 from "./components/Common/LoginPage";
import UnauthorizedPage from "./pages/UnAuthorized/UnauthorizedPage";
import FirstEmployeePassword from "./pages/FirstEmployeePassword/FirstEmployeePassword";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="reset-password" element={<LoginEmployee />} />
          <Route path="/login" element={<LoginPage2 />} />
          <Route path="/createPassword" element={<FirstEmployeePassword />} />
          <Route path="/not-authorized" element={<UnauthorizedPage />} />
          {/* <Route path="/login" element={<LoginPage />}></Route> */}
          <Route
            path="/*"
            element={
              <ProtectedRoute
                roles={[
                  "hrmanager",
                  "staff",
                  "manager",
                  "admin",
                  "employee",
                  "department head",
                  "committee",
                ]}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          {/* <Route path="/employee"  element={<EmployeeProfilePage />} />
            <Route path="/registration" element={<EmployeeRegistrationPage />} /> */}
        </Routes>

        {/* <DatePicker /> */}
      </AuthProvider>
    </>
  );
}

export default App;
