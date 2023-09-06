import getCurrentUser from "@/app/actions/getCurrentUser"
import getCategoryByName from "@/app/actions/getCategoryByName"
import getSubCategoriesByName from "@/app/actions/getSubCategoriesByName";
import CreateCategory from "@/components/category/CreateCategory";

interface IParams {
  categoryName: string;
}

const CategoryEditPage = async ({params} : {params: IParams}) => {
  const currentUser = await getCurrentUser()
  const existingCategory = await getCategoryByName(params)
  const existingSubCategory = await getSubCategoriesByName(params)

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <CreateCategory 
        currentUser={currentUser}
        initialCategory={existingCategory}
        initialSubCategory={existingSubCategory}
      />
    </section>
  )
}

export default CategoryEditPage;