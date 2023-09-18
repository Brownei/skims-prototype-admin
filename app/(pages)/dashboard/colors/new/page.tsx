import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateColor from "@/components/colors/CreateColor";

const NewColorPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <CreateColor currentUser={currentUser}/>
    </section>
  )
}

export default NewColorPage;