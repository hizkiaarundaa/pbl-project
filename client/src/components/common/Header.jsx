// Header.jsx

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Logo from "../ui/Logo.jsx"
import Button from "../ui/Button.jsx"
import Avatar from "../ui/Avatar.jsx"
import Navbar from "./Navbar.jsx"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faGripLines, faUserPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

axios.defaults.withCredentials = true

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }

    checkAuth()

    // Tangkap pesan dari window popup
    const handleMessage = (event) => {
      if (event.data?.type === "GOOGLE_LOGIN_SUCCESS") {
        localStorage.setItem("user", JSON.stringify(event.data.user))
        const user = event.data.user
        setUser(user)
        alert(`Selamat datang kembali, ${user.displayName}`)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleLogin = () => {
    const width = 600
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    const popup = window.open(
      "http://localhost:3000/auth/google",
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`,
    )
    if (popup) {
      popup.focus()
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout")
      localStorage.removeItem("user")
      setUser(null)
      navigate("/")
    } catch (err) {
      console.error("Logout gagal:", err)
    }
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <header className="w-full h-25 bg-green-700 flex items-center justify-evenly px-2 sm:px-4 md:px-8 xl:px-16 gap-2 relative text-white">
      <div className="sm:w-40 h-full flex items-center">
        <Logo />
      </div>
      <h1 className="flex-auto flex items-center text-2xl justify-start h-full font-bold text-white sm:hidden">
        DaurAksi
      </h1>
      <Navbar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <div className="wrapper sm:w-40 flex h-full items-center justify-end sm:justify-evenly gap-4">
        {!user ? (
          <>
            <Button icon={faPaperPlane} title="Login" onClick={handleLogin} />
            <Button icon={faUserPlus} title="Login Google" onClick={handleLogin} />
          </>
        ) : (
          <div className="wrapper sm:w-40 flex h-full items-center justify-end sm:justify-evenly gap-4">
            <Avatar
              src={user.photo}
              onClick={handleProfile}
              className="cursor-pointer hover:scale-115 transition-all ease-in-out duration-300 hover:transition-all w-12"
            />
            <Button icon={faRightFromBracket} title="Logout" onClick={handleLogout} />
          </div>
        )}
      </div>
      <div
        id="toggle-navbar"
        className="sm:hidden h-full flex justify-center items-center cursor-pointer"
        onClick={() => setIsNavOpen(!isNavOpen)}>
        <FontAwesomeIcon
          icon={faGripLines}
          size="2xl"
          className={`transition-transform duration-300 ${isNavOpen ? "rotate-[90deg]" : "rotate-0"}`}
        />
      </div>
    </header>
  )
}

export default Header
