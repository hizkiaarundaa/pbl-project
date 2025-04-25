import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
const EdukasiButton = () => {
  return (
    <div className="fixed right-2 bottom-8 sm:bottom-16 sm:p-2 xl:px-6 xl:pb-6 xl:pt-4">
      <button className="cursor-pointer group flex items-center bg-green-700 hover:bg-green-900  text-white rounded-full px-4 py-3 transition-all duration-300 overflow-hidden">
        <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
        <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 group-hover:ml-2 whitespace-nowrap">
          Buat Postingan
        </span>
      </button>
    </div>
  )
}

export default EdukasiButton
