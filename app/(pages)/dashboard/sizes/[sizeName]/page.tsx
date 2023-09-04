import getCurrentUser from "@/app/actions/getCurrentUser";
import { Loader } from "@/components/Loader";
import CreateSize from "@/components/size/CreateSize";
import { Size } from "@prisma/client";
import { Suspense } from "react";
import getSizeyByName from "@/app/actions/getSizesByName";
import axios from "axios";
import getSizes from "@/app/actions/getSizes";
import { prismaClient } from "@/lib/prismaClient";

interface IParams {
    sizeName: string;
  }

  export default async function EditSizePage({params} : { params: IParams}) {
    const currentUser = await getCurrentUser()
    const initialValue = await getSizeyByName(params)

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <CreateSize currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}


export async function generateStaticParams() {
  const currentUser = await getCurrentUser()
  const sizes = await prismaClient.size.findMany({
    where: {
      adminId: currentUser?.id as string
    }
  })

  return sizes.map((size) => ({
    sizeName: size.name
  }))
}