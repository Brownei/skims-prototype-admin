import getCurrentUser from "@/app/actions/getCurrentUser";
import CollectionList from "@/components/collections/CollectionList";
import { Label } from "@/components/ui/label"
import { prismaClient } from "@/lib/prismaClient";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collections",
  description: "Discover the latest Skims collections, where comfort meets style in the world of modern fashion. Explore a range of meticulously designed loungewear, shapewear, intimates, and essentials that celebrate inclusivity and empower you to feel confident, every day.",
}


const CollectionsPage = async () => {
  const currentUser = await getCurrentUser()
  const collections = await prismaClient.collection.findMany({
    where: {
      adminId: currentUser?.id
    }
  })

  return (
    <section className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div className="grid gap-3">
        <Label className="font-ProBold text-[3vw]">
          Collections({collections.length})
        </Label>

        {/* Colors List */}
        <CollectionList />
      </div>
    </section>
  )
}
  
export default CollectionsPage;

export const revalidate = 3600;