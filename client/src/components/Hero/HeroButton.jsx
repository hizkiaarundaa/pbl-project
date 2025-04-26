import React from "react"

const HeroButton = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="btn sm:btn-lg btn-warning hover:scale-115 transition-all ease-in-out duration-300 hover:text-white">
      {title}
    </button>
  )
}

export default HeroButton
