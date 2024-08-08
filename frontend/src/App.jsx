import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./components/AuthProvider";
import { Suspense } from "react";
import Spinner from "./ui/Spinner";

function App() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
