const Avatar = ({ src, onClick, className }) => {
  const handleError = (e) => {
    e.target.onerror = null
    e.target.src = "/avatar-default.jpeg"
  }

  return (
    <div className="avatar">
      <div
        className={
          className
            ? className + "  lg:w-14 xl:w-16 rounded-full border border-warning"
            : " lg:w-14 xl:w-16 rounded-full border border-warning"
        }>
        <img src={src} alt="Avatar" onError={handleError} onClick={onClick ?? null} />
      </div>
    </div>
  )
}

export default Avatar
