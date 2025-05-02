import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EdukasiPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/eduposts/${id}`)
        setPost(res.data)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleBack = () => {
    navigate("/edukasi")
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    )
  if (!post)
    return (
      <div className="p-4 text-red-500 text-center">
        Post tidak ditemukan.
        <div className="mt-4">
          <button
            onClick={handleBack}
            className="btn btn-warning text-white font-semibold transition-transform duration-200 hover:scale-105">
            Kembali ke Edukasi
          </button>
        </div>
      </div>
    )

  return (
    <div className="relative h-full min-h-screen flex place-content-center">
      {/* Background image layer */}
      <div className="absolute inset-0 bg-[url('/Hero.jpg')] bg-cover bg-center -z-20" />
      {/* Blurred overlay layer */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl -z-10" />
      <div className="h-full w-full md:max-w-7xl flex md:py-8 z-10">
        <div className="card w-full relative bg-[url('/eduPostBg.jpg')] bg-cover bg-no-repeat bg-center shadow-xl border sm:border-4 border-warning overflow-auto">
          <div className="absolute inset-0 bg-black/30 z-0 rounded-[inherit]" />
          {/* Content wrapper with relative and z-10 to be above overlay */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Title as Card Header */}
            <div className="card-title bg-green-700 text-white px-4 py-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <p className="text-white text-justify text-lg  whitespace-pre-line leading-tight sm:leading-relaxed">
                {post.description}
              </p>
            </div>
            {/* Card Footer / Actions */}
            <div className="card-actions flex items-center justify-between bg-green-700 px-4 py-3 shadow-inner">
              <span className="text-sm text-green-600 font-medium bg-white rounded px-3 py-1 shadow">
                Ditulis oleh: {post.username}
              </span>
              <button
                onClick={handleBack}
                className="btn btn-warning text-white font-semibold transition-transform duration-200 hover:scale-105 shadow">
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EdukasiPost
