import React from "react"
import HeroButton from "./HeroButton"

const Hero = () => {
  // Cek status login user
  const isLoggedIn = !!localStorage.getItem("user")
  const handleJoin = () => {
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

  const handleCommunity = () => {
    window.open("https://discord.gg/NGbxfNxH", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="hero min-h-full bg-[url('Hero.jpg')] bg-center bg-no-repeat ">
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">DaurAksi</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi.
          </p>
          <div className="flex justify-center items-center gap-5">
            {!isLoggedIn && <HeroButton onClick={handleJoin} title="Gabung Sekarang" />}
            <HeroButton onClick={handleCommunity} title="Komunitas DaurAksi" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
