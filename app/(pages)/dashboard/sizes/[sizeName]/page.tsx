import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateSize from "@/components/size/CreateSize";
import getSizeyByName from "@/app/actions/getSizesByName";

interface IParams {
    sizeName: string;
  }

  export default async function EditSizePage({params} : { params: IParams}) {
    const currentUser = await getCurrentUser()
    const initialValue = await getSizeyByName(params)

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <CreateSize currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}