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

      if (isLoggedInFromGoogle) {
        try {
          const res = await axios.get("http://localhost:3000/auth/user")
          if (res.data?.id) {
            localStorage.setItem("user", JSON.stringify(res.data))

            // Kirim pesan ke window utama
            if (window.opener) {
              window.opener.postMessage({ type: "GOOGLE_LOGIN_SUCCESS", user: res.data }, "*")
            }

            window.close()
          } else {
            navigate("/login")
            window.close()
          }
        } catch (err) {
          console.error("Login gagal:", err)
          navigate("/login")
          window.close()
        }
      }
    }

    checkGoogleLogin()
  }, [navigate])

  return <div>Loading...</div>
}

export default GoogleCallback
