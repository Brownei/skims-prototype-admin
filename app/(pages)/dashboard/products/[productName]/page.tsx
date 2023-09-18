import getCurrentUser, { getSession } from "@/app/actions/getCurrentUser";
import getProductByName from "@/app/actions/getProductsByName";
import CreateProducts from "@/components/products/CreateProduct";
import { prismaClient } from "@/lib/prismaClient";

export type IParams = {
  productName: string;
}

export default async function EditProductPage({params} : { params: IParams}) {
  const currentUser = await getCurrentUser()
  const initialValue = await prismaClient.product.findUnique({
    where: {
      name: params.productName,
      adminId: currentUser?.id
    },
    include: {
      images: true
    }
  })

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <CreateProducts currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}