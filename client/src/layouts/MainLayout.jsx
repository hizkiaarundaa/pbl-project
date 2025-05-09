import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="w-full h-screen flex flex-col min-h-0 relative">
      <Header />
      <main className="flex-auto min-h-0 flex flex-col ">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
