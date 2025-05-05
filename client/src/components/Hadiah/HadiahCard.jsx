const HadiahCard = () => {
  return (
    <div
      className="w-full min-w-2xs h-full min-h-2/4"
      >
      <div className="card w-full bg-base-100 shadow-md border border-gray-200 h-full">
        <div className="card-body p-4 flex flex-col h-full">
          <h2 className="card-title text-md font-semibold text-gray-800 ">Title</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 text-justify">Deskripsi</p>
          <div className="card-actions justify-start items-center mt-auto">
            <p className="text-xs sm:text-sm font-bold border border-green-200 h-full grid place-content-center rounded-3xl text-green-500">
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HadiahCard