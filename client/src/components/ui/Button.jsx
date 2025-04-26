import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = ({ icon, title, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn btn-soft btn-warning btn-md sm:btn-md md:btn-md lg:btn-lg xl:btn-xl bg-green-700 border-warning hover:bg-warning hover:border-green-200 hover:text-white hover:scale-110 transition-all ease-in-out active:opacity-75">
      {icon ? <FontAwesomeIcon icon={icon} /> : title ? title : <p>button</p>}
    </button>
  )
}

export default Button
