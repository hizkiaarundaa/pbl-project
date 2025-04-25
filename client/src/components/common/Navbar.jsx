import { Link } from "react-router-dom"

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex flex-auto justify-evenly items-center sm:pt-4 h-full font-semibold text-xl md:text-2xl">
        <Link
          to="/edukasi"
          className="transition-all ease-in-out hover:scale-x-110 hover:text-warning active:translate-y-1.5">
          Edukasi
        </Link>
        <Link
          to="/layanan"
          className="transition-all ease-in-out hover:scale-x-110 hover:text-warning active:translate-y-1.5">
          Layanan
        </Link>
        <Link
          to="/hadiah"
          className="transition-all ease-in-out hover:scale-x-110 hover:text-warning active:translate-y-1.5">
          Hadiah
        </Link>
      </nav>
      {/* Mobile Sidebar */}
      {isOpen && (
        <nav className="absolute top-full right-0 w-48  bg-white shadow-lg flex flex-col items-start p-4 sm:hidden z-50">
          <Link to="/edukasi" className="py-2 text-green-700 w-full" onClick={() => setIsOpen(false)}>
            Edukasi
          </Link>
          <Link to="/layanan" className="py-2 text-green-700 w-full" onClick={() => setIsOpen(false)}>
            Layanan
          </Link>
          <Link to="/hadiah" className="py-2 text-green-700 w-full" onClick={() => setIsOpen(false)}>
            Hadiah
          </Link>
        </nav>
      )}
    </>
  )
}

export default Navbar
