import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import EdukasiButton from "../components/Edukasi/EdukasiButton.jsx"
import Button from "../components/ui/Button.jsx"
import PostButton from "../components/Edukasi/PostButton.jsx"

const SKELETON_COUNT = 8

const SkeletonCard = () => (
  <div className="w-full">
    <div className="card w-full bg-base-100 shadow-md border border-gray-200 h-full animate-pulse">
      <div className="card-body p-4 flex flex-col h-full">
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center gap-2 mt-auto">
          <div className="h-6 w-20 bg-gray-200 rounded-3xl"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

const Edukasi = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/eduposts`).then((res) => {
      setPosts(res.data)
      setTimeout(() => setLoading(false), 300) // Show skeleton for 300ms
    })
  }, [])

  const handleClick = () => {
    navigate("/edukasi/new")
  }

  const handlePost = (id) => {
    navigate(`/edukasi/${id}`)
  }

  return (
    <div className="flex flex-col h-full min-h-0 w-full relative">
      {/* Scrollable grid content */}
      <div className="flex-grow min-h-0 overflow-y-auto scrollbar-green">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 auto-rows-max">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, idx) => <SkeletonCard key={idx} />)
            : posts
                .slice()
                .reverse()
                .map((post) => (
                  <div className="w-full" key={post.id}>
                    <div className="card w-full bg-base-100 shadow-md border border-gray-200 h-full">
                      <div className="card-body p-4 flex flex-col h-full">
                        <h2 className="card-title text-md font-semibold text-gray-800 ">{post.title}</h2>
                        <p className="text-gray-600 text-sm sm:text-base mb-4 text-justify">
                          {post.description.length >= 100 ? `${post.description.slice(0, 100)}...` : post.description}
                        </p>
                        <div className="card-actions justify-start items-center mt-auto">
                          <p className="text-xs sm:text-sm font-bold border border-green-200 h-full grid place-content-center rounded-3xl text-green-500">
                            <span>{post.username}</span>
                          </p>
                          <PostButton onClick={() => handlePost(post.id)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
      {/* Floating button stays outside scrollable area */}
      <EdukasiButton onClick={handleClick} />
    </div>
  )
}

export default Edukasi
