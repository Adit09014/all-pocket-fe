import { useState,useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { AppBar } from "./scenes/Global/AppBar";
import NavBar from "./scenes/Global/NavBar";
import { Dashboard } from "./scenes/Dashboard";
import { AccountManage } from "./scenes/AccountManage";
import { InvestManage } from "./scenes/InvestManage/index";
import { BudgetManage } from "./scenes/BudgetManage/index";
import { ExpenseManage } from "./scenes/ExpenseManage/index";
import { Reminder } from "./scenes/ReminderManage/index";
import Debt from './scenes/DebtManage/index';
import { Signin } from './scenes/Signin/index';
import {Signup} from './scenes/Signup/index'
import { AuthContext } from "./Components/CheckAuth"; 
import {Settings} from './scenes/Settings/index';
import { ColorModeContext, useMode } from "./theme";
import {Faq} from './scenes/FAQ/index'
import ProtectedRoute from "./Components/ProtectedRoute";
import { Homepage } from "./scenes/LandingPage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: "flex", height: "100vh" }}>
          {isAuthenticated && (
            <NavBar
              isSidebar={isSidebar}
              toggleSidebar={() => setIsSidebar((prev) => !prev)}
            />
          )}
          <main style={{ flexGrow: 1, overflow: "auto" }}>
            {<AppBar />}
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Homepage />} />


              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard isSideBar={isSidebar} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute>
                    <AccountManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investment"
                element={
                  <ProtectedRoute>
                    <InvestManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <BudgetManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <ExpenseManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/debt"
                element={
                  <ProtectedRoute>
                    <Debt />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reminder"
                element={
                  <ProtectedRoute>
                    <Reminder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <ProtectedRoute>
                    <Faq/>
                  </ProtectedRoute>
                }
              />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
