import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// layouts
import MainLayout from "./layouts/MainLayout.jsx"

// pages
import Home from "./pages/Home.jsx"
import Layanan from "./pages/Layanan.jsx"
import Hadiah from "./pages/Hadiah.jsx"
import Edukasi from "./pages/Edukasi.jsx"

// userProfile
import UserProfile from "./pages/UserProfile.jsx"
// cb
import GoogleCallback from "./auth/GoogleCallback.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/hadiah" element={<Hadiah />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
