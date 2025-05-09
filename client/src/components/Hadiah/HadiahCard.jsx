const HadiahCard = ({ title, description, point, imageUrl, onClick }) => {
  return (
    <div className="w-full">
      <div className="card w-full shadow-md overflow-hidden border-green-200 h-full">
        <div
          className="relative group card-body p-4 flex flex-col h-full justify-between text-white"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/80 transition duration-300 rounded-md" />
          <div className="relative z-10">
            <h2 className="card-title text-md font-semibold">{title}</h2>
            <p className="text-sm sm:text-base mb-4 text-justify opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </p>
          </div>
          <div className="relative z-10 card-actions justify-end items-center mt-auto">
            <button
              className="btn btn-warning text-white"
              onClick={onClick}>
              {point} Poin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HadiahCard
