import getCurrentUser from '@/app/actions/getCurrentUser';
import { Loader } from '@/components/Loader';
import CreateCategory from '@/components/category/CreateCategory';
import { Admin } from '@prisma/client';

const NewCategoriesPage = async () => {
  const currentUserPromise: Promise<Admin | null> = getCurrentUser()
  const currentUser = await currentUserPromise

  return (
    <section className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <CreateCategory currentUser={currentUser}/>
    </section>
  )
}

export default NewCategoriesPage;