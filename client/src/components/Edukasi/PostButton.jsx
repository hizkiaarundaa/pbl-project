import React from "react"

const PostButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex-grow btn-sm sm:btn-md cursor-pointer btn btn-soft btn-warning border-warning bg-green-800 hover:bg-warning hover:border-green-200 hover:text-white hover:scale-105 transition-all ease-in-out ">
      Lihat Postingan
    </button>
  )
}

export default PostButton
