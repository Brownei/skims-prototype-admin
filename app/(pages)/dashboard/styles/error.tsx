"use client"
import Error from "@/components/Error"

const ErrorPage = () => {
  return (
    <div className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:h-full lg:ml-[20vw]'>
      <Error 
        title="Error occured getting the styles"
        subtitle="Try refreshing the page"
        showReset
      />
    </div>
  )
}

export default ErrorPage