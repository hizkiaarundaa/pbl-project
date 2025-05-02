import { useEffect, useState } from "react"
import axios from "axios"
import Logo from "../components/ui/Logo"
import Avatar from "../components/ui/Avatar"

const UserProfile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Mengambil data user dengan cek autentikasi dari backend
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
          withCredentials: true, // Agar session cookie bisa terkirim
        })
        setUser(res.data)
      } catch (err) {
        console.error("Gagal mengambil data user:", err)
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return <div className="text-center text-yellow-500 text-xl mt-10">Loading profile...</div>
  }
  return (
    <main className="w-full flex justify-center  h-full sm:grid sm:place-content-center min-h-dvh p-2 ">
      <div className="flex flex-col w-full h-full sm:h-[75dvh] sm:w-[50dvw] border-2 border-green-500 rounded-2xl items-center sm:justify-center p-2 sm:p-8 shadow-2xl shadow-green-900 overflow-hidden">
        <div className="md:w-40 grid place-content-center">
          <Logo title="Back To Home Page" />
        </div>
        <h1 className="text-center w-full text-3xl font-semibold text-green-600">Profile</h1>
        <Avatar src={user.photo} />
        <div className="w-full">
          <table className="table table-zebra">
            <colgroup>
              <col className="w-[10%] sm:w-[25%]" />
              <col className="w-[5%] sm:w-[10%]" />
              <col className="w-[85%] sm:w-[65%]" />
            </colgroup>
            <tbody className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-semibold text-green-900">
              <tr>
                <td>Username</td>
                <td>:</td>
                <td>{user.username ?? user.displayName}</td>
              </tr>
              <tr>
                <td>Bio</td>
                <td>:</td>
                <td>{user.bio ?? "kosong"}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Points</td>
                <td>:</td>
                <td>{user.points}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default UserProfile
