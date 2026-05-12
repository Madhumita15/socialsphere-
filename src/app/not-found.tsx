"use client"

import Lottie from "lottie-react"
import notfound from '@/services/json/lottie/Not Found.json'


const NotFound = () => {
  return (
    <>
    <div className="flex justify-center items-center flex-col bg=white ">
             <Lottie loop animationData={notfound} width={10} height={10}/>
            
        </div>
    </>
  )
}

export default NotFound