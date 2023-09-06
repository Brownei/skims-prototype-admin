import getCurrentUser from "@/app/actions/getCurrentUser";
import CreateProducts from "@/components/products/CreateProduct";
import { prismaClient } from "@/lib/prismaClient";

const NewProductsPage = async () => {
    const currentUser = await getCurrentUser()

    const colors = await prismaClient.color.findMany({
        where: {
            adminId: currentUser?.id as string
        }
    })

    const collections = await prismaClient.collection.findMany({
        where: {
            adminId: currentUser?.id as string
        }
    })

    const styles = await prismaClient.style.findMany({
        where: {
            adminId: currentUser?.id as string
        }
    })

    const subCategories = await prismaClient.subCategory.findMany({
        where: {
            adminId: currentUser?.id as string
        }
    })

    const categories = await prismaClient.category.findMany({
        where: {
            adminId: currentUser?.id as string
        },
        include: {
            subCategories: true
        }
    })

    const sizes = await prismaClient.size.findMany({
        where: {
            adminId: currentUser?.id as string
        }
    })
    
  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-full lg:ml-[23vw]'>
        <CreateProducts 
            currentUser={currentUser}
            colors={colors}
            collections={collections}
            styles={styles}
            sizes={sizes}
            categories={categories}
            subCategories={subCategories}
        />
    </section>
  )
}

export default NewProductsPage;