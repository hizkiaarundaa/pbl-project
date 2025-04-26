import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import LayananWrapper from "../components/Layanan/LayananWrapper.jsx"

const LOGIN_URL = "http://localhost:3000/auth/google" // URL for Google login

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
      <div className="relative h-full min-h-screen">
        {/* Alert at the top of the page */}
        {showAlert && (
          <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-md px-4">
            <div className="alert alert-warning shadow-lg">
              <span className="font-semibold">Anda harus login untuk mengakses Layanan ini</span>
            </div>
          </div>
        )}
        <div className="flex h-full items-center justify-center">
          <div className="text-lg text-gray-600">Membuka login Google...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <LayananWrapper />
    </div>
  )
}

export default Layanan
