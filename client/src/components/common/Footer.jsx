const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className="text-white h-8 sm:h-10 md:h-12 lg:h-16 grid place-content-center w-full text-center bg-green-700">
      <p className="w-dvw text-center">&copy; DaurAksi. {date}</p>
    </footer>
  )
}

export default Footer
