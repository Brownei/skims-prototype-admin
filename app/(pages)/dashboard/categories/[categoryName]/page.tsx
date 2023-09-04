import getCurrentUser from "@/app/actions/getCurrentUser"
import getCategoryByName from "@/app/actions/getCategoryByName"
import getSubCategoriesByName from "@/app/actions/getSubCategoriesByName";
import CreateCategory from "@/components/category/CreateCategory";
import { Admin, Category, SubCategory } from "@prisma/client";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import axios from "axios";
import getCategories from "@/app/actions/getCategories";

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


export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    categoryName: category.name
  }))
}