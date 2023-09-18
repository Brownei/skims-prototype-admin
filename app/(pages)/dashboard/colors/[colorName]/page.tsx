import getColoryByName from "@/app/actions/getColorByName";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateColor from "@/components/colors/CreateColor";

interface IParams {
    colorName: string;
}

const EditColorPage = async ({params} : { params: IParams}) => {
    const currentUser = await getCurrentUser()
    const initialValue = await getColoryByName(params)
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-fulllg:ml-[20vw]'>
      <CreateColor currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}

export default EditColorPage;