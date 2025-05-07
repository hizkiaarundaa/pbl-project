import { faTruckFast } from "@fortawesome/free-solid-svg-icons"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import LayananInput from "./LayananInput"
import { useEffect, useState } from "react"
import axios from "axios"

const validationSchema = Yup.object({
  alamat: Yup.string().required("Alamat wajib diisi"),
  jumlah: Yup.number()
    .typeError("Jumlah harus berupa angka")
    .positive("Jumlah harus lebih dari 0")
    .required("Jumlah wajib diisi"),
})

const LayananForm = () => {
  const [username, setUsername] = useState("")

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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/layanan`, {
        username: username,
        alamat: values.alamat,
        sampahTotal: values.jumlah,
      })

      if (response.status === 201) {
        alert(`Berhasil dikirim! \n Terima kasih ${username} point anda bertambah 25`)
        resetForm()
      } else {
        alert("Terjadi kesalahan saat mengirim data.")
      }
    } catch (error) {
      console.error("Gagal mengirim layanan:", error)
      alert("Gagal mengirim layanan.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ alamat: "", jumlah: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col py-4 gap-4 h-full justify-between w-full">
          <div className="flex flex-col gap-12  w-full">
            <h1 className="font-semibold text-xl sm:text-2xl lg:text-4xl text-white">Layanan Penjemputan Sampah</h1>
            <div className="flex-grow gap-4 flex flex-col w-full">
              <LayananInput
                label="Alamat"
                name="alamat"
                type="text"
                placeholder="Alamat"
              />
              <LayananInput
                label="Jumlah (Kg)"
                name="jumlah"
                type="number"
                placeholder="Jumlah Sampah"
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <p className="text-gray-300 w-full bg-[#24242499] p-1">{username}</p>
            </div>
          </div>

          <div className="flex-grow grid place-content-center">
            <Logo title="Back To Home Page" />
          </div>

          <div className="flex justify-end hover:text-white">
            <Button
              icon={faTruckFast}
              title="Kirim"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LayananForm