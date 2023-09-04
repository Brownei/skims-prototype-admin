import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateSize from "@/components/size/CreateSize";
import { Admin } from "@prisma/client";

const NewSizePage = async () => {
    const currentUserPromise: Promise<Admin | null> = getCurrentUser()
    const currentUser = await currentUserPromise
    
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
        <CreateSize currentUser={currentUser}/>
    </section>
  )
}

export default NewSizePage;