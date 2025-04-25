// layouts/MainLayout.jsx
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <Header />
      <main className="flex-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
