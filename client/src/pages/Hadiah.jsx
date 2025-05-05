import HadiahCard from "../components/Hadiah/HadiahCard"

const Hadiah = () => {
  return (
    <div className="flex flex-col h-full min-h-0 w-full relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 auto-rows-max">
        <HadiahCard />
        <HadiahCard />
        <HadiahCard />
        <HadiahCard />
      </div>
    </div>
  )
}

export default Hadiah
