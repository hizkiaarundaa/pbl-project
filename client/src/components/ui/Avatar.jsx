const Avatar = ({ src, onClick, className }) => {
  return (
    <div className="avatar">
      <div
        className={
          className
            ? className + "  lg:w-14 xl:w-16 rounded-full border border-warning"
            : " lg:w-14 xl:w-16 rounded-full border border-warning"
        }>
        <img src={src} onClick={onClick ?? null} />
      </div>
    </div>
  )
}

export default Avatar
