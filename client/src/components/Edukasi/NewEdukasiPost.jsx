import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"

const NewEdukasiPost = () => {
  const [username, setUsername] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showPointAlert, setShowPointAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem("user")
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser)
        setUsername(userData.username || userData.displayName || "")
      } catch {
        setUsername("")
      }
    }
  }, [])

  const EdukasiSchema = Yup.object().shape({
    title: Yup.string().required("title wajib diisi"),
    description: Yup.string().required("description wajib diisi"),
  })

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setError("")
    setSuccess(false)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/eduposts/`, {
        ...values,
        username,
      })
      setSuccess(true)
      setShowPointAlert(true)
      resetForm()
      // Setelah 2 detik, redirect ke /edukasi
      setTimeout(() => {
        setShowPointAlert(false)
        navigate("/edukasi")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat mengirim data")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate("/edukasi")
  }

  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center px-4 py-8">
      <div className="relative w-full lg:w-[50dvw] h-full p-4 flex flex-col border-4 border-green-400 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Buat Post Edukasi Baru</h2>
        {/* Alert untuk poin bertambah */}
        {showPointAlert && (
          <div className="alert bg-green-700 text-white shadow-lg mb-4 min-h-14 min-w-28 text-2xl">
            <span className="font-semibold">Selamat! Poin kamu bertambah 10 🎉</span>
          </div>
        )}
        <Formik initialValues={{ title: "", description: "" }} validationSchema={EdukasiSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Masukkan title edukasi"
                />
                <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Desciption</label>
                <Field
                  type="textarea"
                  name="description"
                  className="w-full border rounded px-3 min-h-[120px]"
                  placeholder="Tulis description edukasi di sini"
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <div className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700">
                  {username || <span className="text-red-500">Username tidak ditemukan</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-48  mx-auto">
                <Button type="submit" disabled={isSubmitting || !username} title="Kirim">
                  {isSubmitting ? "Mengirim..." : "Posting"}
                </Button>
                <Button title="Kembali" onClick={handleBack} />
              </div>
              {success && <div className="text-green-600 font-medium">Post edukasi berhasil dibuat!</div>}
              {error && <div className="text-red-600 font-medium">{error}</div>}
              {!username && <div className="text-red-500 text-sm">User Belum login</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default NewEdukasiPost
