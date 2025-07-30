import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Articles from "./pages/Articles";
import Videos from "./pages/Videos";
import Profile from "./pages/Profile";
import UploadArticle from "./pages/UploadArticle";
import UploadVideo from "./pages/UploadVideo";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Dashboard - always accessible */}
        <Route path="/" element={<Dashboard />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/articles"
          element={
            <PrivateRoute>
              <Layout><Articles /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <PrivateRoute>
              <Layout><Videos /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout><Profile /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-article"
          element={
            <PrivateRoute>
              <Layout><UploadArticle /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-video"
          element={
            <PrivateRoute>
              <Layout><UploadVideo /></Layout>
            </PrivateRoute>
          }
        />
        {/* Optional duplicate route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
