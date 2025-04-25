import EdukasiButton from "../components/Edukasi/EdukasiButton.jsx"
import EdukasiPost from "../components/Edukasi/EdukasiPost.jsx"

const Edukasi = () => {
  return (
    <div className="relative flex flex-col w-full h-full sm:overflow-hidden">
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-3 sm:grid-rows-3 md:grid-rows-3 xl:grid-rows-3 2xl:grid-rows-3 place-items-center gap-1.5">
        <EdukasiPost />
        <EdukasiPost />
        <EdukasiPost />
        <EdukasiPost />
      </div>
      <EdukasiButton />
    </div>
  )
}

export default Edukasi
