import { useEffect, useState } from "react"
import axios from "axios"
import HadiahCard from "../components/Hadiah/HadiahCard"

const Hadiah = () => {
  const [hadiahList, setHadiahList] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserAndHadiah = async () => {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setUserId(user.id)
        } catch {
          setUserId(null)
        }
      }

      try {
        const res = await axios.get("http://localhost:3000/hadiah")
        setHadiahList(res.data)
      } catch (error) {
        console.error("Gagal mengambil data hadiah:", error)
      }
    }

    fetchUserAndHadiah()
  }, [])

  const handleRedeem = async (gift) => {
    if (!userId) {
      alert("User belum login.")
      return
    }

    const confirmRedeem = window.confirm(`Tukar "${gift.title}" seharga ${gift.point} poin?`)
    if (!confirmRedeem) return

    try {
      const res = await axios.post("http://localhost:3000/hadiah/redeem", {
        userId,
        hadiahId: gift.id,
      })

      alert(res.data.message)
      // bisa fetch ulang data user jika perlu
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menukar hadiah")
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0 w-full relative bg-[url('eduPostBg.jpg')] bg-contain">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 auto-rows-max">
        {hadiahList.map((item) => (
          <HadiahCard
            key={item.id}
            title={item.title}
            description={item.description}
            point={item.point}
            imageUrl={item.imageUrl}
            onClick={() => handleRedeem(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default Hadiah
