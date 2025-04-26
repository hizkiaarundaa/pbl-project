import { Field, ErrorMessage } from "formik"

/**
 * LayananInput
 * Komponen reusable untuk input Formik dengan floating label dan error message.
 *
 * Props:
 * - label: string (teks label yang akan ditampilkan)
 * - name: string (nama field Formik)
 * - type: string (tipe input, default 'text')
 * - placeholder: string (placeholder input)
 * - className: string (opsional, tambahan kelas CSS)
 * - ...props: properti tambahan untuk Field
 */
const LayananInput = ({ label, name, type = "text", placeholder, className = "", ...props }) => (
  <label className="floating-label">
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={`input input-md lg:input-lg xl:input-lg w-full ${className}`}
      {...props}
    />
    <span>{label}</span>
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </label>
)

export default LayananInput
