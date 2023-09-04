import getColoryByName from "@/app/actions/getColorByName";
import getColors from "@/app/actions/getColors";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Loader } from "@/components/Loader";
import CreateColor from "@/components/colors/CreateColor";
import { prismaClient } from "@/lib/prismaClient";
import { Color } from "@prisma/client";
import axios from "axios";
import { Suspense } from "react";

interface IParams {
    colorName: string;
}

const EditColorPage = async ({params} : { params: IParams}) => {
    const currentUser = await getCurrentUser()
    const initialValue = await getColoryByName(params)
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
        <Suspense fallback={<Loader />}>
          <CreateColor currentUser={currentUser} initialValue={initialValue}/>
        </Suspense>
    </section>
  )
}

export default EditColorPage;


export async function generateStaticParams() {
  const currentUser = await getCurrentUser()
  const colors = await prismaClient.color.findMany({
    where: {
      adminId: currentUser?.id as string
    }
  })

  return colors.map((color) => ({
    colorName: color.name
  }))
}