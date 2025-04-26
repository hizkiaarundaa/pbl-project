import { useNavigate } from "react-router-dom"
import { useState } from "react"
// pastikan path-nya sesuai

const Logo = ({ title }) => {
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)

  return (
    <img
      src="/logo.png"
      alt="logo dauraksi"
      title={title ?? null}
      onClick={() => navigate("/")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`w-16 md:w-24 cursor-pointer transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_1rem_lime] spin-on-hover ${
        isHovering ? "spin-animate" : ""
      }`}
    />
  )
}

export default Logo
