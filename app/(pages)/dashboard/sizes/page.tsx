import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Suspense } from "react";
import Link from "next/link";
import SizeList from "@/components/size/SizeList";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismaClient } from "@/lib/prismaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sizes",
  description: "Discover the perfect fit with the Skims Sizes Guide. Explore our comprehensive sizing chart to find the ideal fit for all your Skims wardrobe essentials. From bras and shapewear to loungewear and activewear, we provide detailed measurements to ensure your comfort and confidence. Say goodbye to guesswork and embrace the perfect fit with Skims sizes.",
}

const StylePage = async () => {
  const currentUser = await getCurrentUser()
  const size = await prismaClient.size.findMany({
    where: {
      adminId: currentUser?.id
    }
  })
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div>
        <Label className="font-ProBold text-[3vw]">
          Size({size.length})
        </Label>

        {/* Sizes List */}
        <SizeList />
      </div>
    </section>
  )
}
  
  export default StylePage;