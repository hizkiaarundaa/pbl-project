import { faTruckFast } from "@fortawesome/free-solid-svg-icons"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import LayananInput from "./LayananInput"

const validationSchema = Yup.object({
  alamat: Yup.string().required("Alamat wajib diisi"),
  jumlah: Yup.number()
    .typeError("Jumlah harus berupa angka")
    .positive("Jumlah harus lebih dari 0")
    .required("Jumlah wajib diisi"),
})

const LayananForm = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    alert(`Alamat: ${values.alamat}\nJumlah: ${values.jumlah} Kg`)
    setSubmitting(false)
    resetForm()
  }

  return (
    <Formik initialValues={{ alamat: "", jumlah: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col py-4 gap-4 h-full justify-between">
          <div className="flex flex-col gap-12">
            <h1 className="font-semibold text-xl sm:text-2xl lg:text-4xl">Layanan Penjemputan Sampah</h1>
            <div className="flex-grow gap-4 flex flex-col w-full">
              <LayananInput label="Alamat" name="alamat" type="text" placeholder="Alamat" />
              <LayananInput label="Jumlah (Kg)" name="jumlah" type="number" placeholder="Jumlah Sampah" />
            </div>
          </div>
          <div className="flex-grow grid place-content-center">
            <Logo title="Back To Home Page" />
          </div>
          <div className="flex justify-end hover:text-white">
            <Button icon={faTruckFast} title="Kirim" type="submit" disabled={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LayananForm
