import getCollectionByName from "@/app/actions/getCollectionsByName";
import getCurrentUser, { getSession } from "@/app/actions/getCurrentUser";
import CreateCollections from "@/components/collections/CreateCollections";
import { prismaClient } from "@/lib/prismaClient";

export type IParams = {
  collectionName: string;
}

export default async function EditCollectionPage({params} : { params: IParams}) {
  const currentUser = await getCurrentUser()
  const initialValue = await getCollectionByName(params)

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <CreateCollections currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}


export async function generateStaticParams() {
  const currentUser = await getCurrentUser()
  const collections = await prismaClient.collection.findMany({
    where: {
      adminId: currentUser?.id as string
    }
  })

  return collections.map((collection) => ({
    collectionName: collection.name
  }))
}