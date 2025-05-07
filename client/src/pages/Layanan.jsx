import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import LayananWrapper from "../components/Layanan/LayananWrapper.jsx"
import Loaders from "../components/ui/Loaders.jsx"

const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/google` // URL for Google login

const Layanan = () => {
  const popupRef = useRef(null)
  const intervalRef = useRef(null)
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) return

    // Open Google login popup
    const width = 600
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    const popup = window.open(
      LOGIN_URL,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`,
    )
    popupRef.current = popup

    // Listener to detect when login is complete (user saved in localStorage)
    const handleStorage = (event) => {
      if (event.key === "user" && event.newValue) {
        // Close popup if still open
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close()
        }
        // Reload page to update user state
        window.location.reload()
      }
    }

    window.addEventListener("storage", handleStorage)

    // Check if popup closed without login
    intervalRef.current = setInterval(() => {
      const userNow = localStorage.getItem("user")
      if (popupRef.current && popupRef.current.closed && !userNow) {
        window.removeEventListener("storage", handleStorage)
        clearInterval(intervalRef.current)
        setShowAlert(true)
        setTimeout(() => {
          navigate("/")
        }, 2000) // Show alert for 2 seconds before redirect
      }
    }, 500)

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorage)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close()
      }
    }
  }, [navigate])

  // If user is not logged in, show loading message or alert
  const user = localStorage.getItem("user")
  if (!user) {
    return (
      <div className="relative h-full w-full">
        {/* Alert and Loader overlay */}
        {showAlert && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
            <div className="w-full max-w-xl px-4 mb-6">
              <div className="alert alert-warning shadow-md text-white text-center">
                <span className="font-semibold">Anda harus login untuk mengakses Layanan ini</span>
              </div>
            </div>
            <Loaders />
          </div>
        )}
        {!showAlert && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg text-gray-600 mb-6">Membuka login Google...</div>
            <Loaders />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex justify-center h-full w-full bg-[url('layananBg.jpeg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Konten utama */}
      <div className="relative z-10 flex justify-center items-center w-full h-full px-4">
        <LayananWrapper />
      </div>
    </div>
  )
}

export default Layanan
