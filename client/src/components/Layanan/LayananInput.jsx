import { Field, ErrorMessage } from "formik"


const LayananInput = ({ label, name, type = "text", placeholder, className = "", ...props }) => (
  <label className="floating-label">
    <Field
      autocomplete="off"
      type={type}
      name={name}
      placeholder={placeholder}
      className={`input input-md lg:input-lg xl:input-lg w-full bg-[#24242499] text-white ${className}`}
      {...props}
    />
    <span className="block !bg-transparent text-gray-300">{label}</span>
    <ErrorMessage
      name={name}
      component="div"
      className="text-warning text-xs mt-1"
    />
  </label>
)

export default LayananInput
