import getCurrentUser from "@/app/actions/getCurrentUser";
import StyleForm from "@/components/forms/styleForm";
import StyleList from "@/components/style/StyleList";
import { prismaClient } from "@/lib/prismaClient";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Styles",
  description: "Discover the latest in fashion innovation with Skims Styles. Our collection is designed to redefine comfort and style, offering a wide range of apparel and accessories that blend seamlessly with your everyday life. From lounge essentials to statement pieces, Skims Styles combines quality craftsmanship with trendsetting designs, ensuring you not only look great but feel confident in every outfit.",
}

const StylesPage = async () => {
  const currentUser = await getCurrentUser()
  const styles = await prismaClient.style.findMany({
    where: {
      adminId: currentUser?.id
    }
  })

  revalidatePath('/dashboard/styles')

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[22vw]'>
      <h1 className="font-ProBold text-[3vw]">
        Styles({styles.length})
      </h1>
      <StyleForm currentUser={currentUser}/>
      {/* Colors List */}
      <StyleList />
    </section>
  )
}
  
export default StylesPage;