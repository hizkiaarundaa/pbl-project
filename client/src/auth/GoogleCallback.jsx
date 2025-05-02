// GoogleCallback.jsx

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const GoogleCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search)
      const isLoggedInFromGoogle = params.get("logged_in") === "true"
      const reason = params.get("reason")

      if (isLoggedInFromGoogle) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`)
          if (res.data?.id) {
            localStorage.setItem("user", JSON.stringify(res.data))

            // Kirim pesan ke window utama
            if (window.opener) {
              window.opener.postMessage({ type: "GOOGLE_LOGIN_SUCCESS", user: res.data }, "*")
            }

            window.close()
          } else {
            if (window.opener) {
              window.opener.postMessage({ type: "GOOGLE_LOGIN_FAILED", reason: "no_user" }, "*")
            }
            navigate("/login")
            window.close()
          }
        } catch (err) {
          if (window.opener) {
            window.opener.postMessage({ type: "GOOGLE_LOGIN_FAILED", reason: "error" }, "*")
          }
          console.error("Login gagal:", err)
          navigate("/login")
          window.close()
        }
      } else {
        // Jika login gagal atau dibatalkan
        if (window.opener) {
          window.opener.postMessage({ type: "GOOGLE_LOGIN_FAILED", reason: reason || "auth_failed" }, "*")
        }
        window.close()
      }
    }

    checkGoogleLogin()
  }, [navigate])

  return <div>Loading...</div>
}

export default GoogleCallback
