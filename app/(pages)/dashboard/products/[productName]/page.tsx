import getCurrentUser, { getSession } from "@/app/actions/getCurrentUser";
import getProductByName from "@/app/actions/getProductsByName";
import CreateCollections from "@/components/collections/CreateCollections";
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
    },
    include: {
      images: true
    }
  })

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <CreateProducts currentUser={currentUser} initialValue={initialValue}/>
    </section>
  )
}


export async function generateStaticParams() {
  const currentUser = await getCurrentUser()
  const products = await prismaClient.product.findMany({
    where: {
      adminId: currentUser?.id as string
    }
  })

  return products.map((product) => ({
    productName: product.name
  }))
}