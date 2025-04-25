const Card = ({ title, description, onClick }) => {
  return (
    <div className="flex justify-center sm:w-96 w-full sm:h-48 px-8 self-center">
      <div className="card w-full bg-base-100 card-md shadow-2xl text-black">
        <div className="card-body">
          <h2 className="card-title">{title ?? "Title"}</h2>
          <p>{description ? description : "deskripsi edukasi asdfsfahsfhalsfhk"}</p>
          <div className="justify-end card-actions">
            <button onClick={onClick} className="btn btn-warning">
              Lihat Postingan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
