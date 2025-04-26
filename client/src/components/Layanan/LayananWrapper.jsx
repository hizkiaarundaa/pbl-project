import React from "react"
import LayananForm from "./LayananForm"
const LayananWrapper = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full lg:w-[50dvw] h-full p-4 flex flex-col border-4 border-green-400 rounded-2xl">
        <LayananForm />
      </div>
    </div>
  )
}

export default LayananWrapper
