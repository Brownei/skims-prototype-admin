import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateCollections from "@/components/collections/CreateCollections";
import { Admin } from "@prisma/client";

const NewCollectionsPage = async () => {
    const currentUser = await getCurrentUser()
    
  return (
    <section className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
        <CreateCollections currentUser={currentUser}/>
    </section>
  )
}

export default NewCollectionsPage;