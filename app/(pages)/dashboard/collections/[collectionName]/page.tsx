import getCollectionByName from "@/app/actions/getCollectionsByName";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateCollections from "@/components/collections/CreateCollections";

export type IParams = {
  collectionName: string;
}

export default async function EditCollectionPage({params} : { params: IParams}) {
  const currentUser = await getCurrentUser()
  const initialValue = await getCollectionByName(params)

  return (
    <section className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <CreateCollections currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}