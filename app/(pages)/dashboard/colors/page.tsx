import getCurrentUser from "@/app/actions/getCurrentUser";
import ColorList from "@/components/colors/ColorList";
import { Label } from "@/components/ui/label"
import { prismaClient } from "@/lib/prismaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colors",
}

const ColorsPage = async () => {
  const currentUser = await getCurrentUser()
  const colors = await prismaClient.color.findMany({
    where: {
      adminId: currentUser?.id
    }
  })
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div className="grid gap-3">
        <Label className="font-ProBold text-[3vw]">
          Colors({colors.length})
        </Label>

        {/* Colors List */}
        <ColorList />
      </div>
    </section>
  )
}
  
export default ColorsPage;