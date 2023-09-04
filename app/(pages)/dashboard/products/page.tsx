import getCurrentUser from "@/app/actions/getCurrentUser";
import ProductList from "@/components/products/ProductList";
import { Label } from "@/components/ui/label"
import { prismaClient } from "@/lib/prismaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Skims products are meticulously crafted to empower individuals of all body types, providing the perfect balance of style and support",
}


const ProductssPage = async () => {
  const currentUser = await getCurrentUser()
  const products = await prismaClient.product.findMany({
    where: {
      adminId: currentUser?.id
    }, include: {
        size: true,
        order: true,
        images: true,
        category: true,
        subCategory: true,
        collection: true,
        color: true,
        style: true
    }
  })

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-full lg:ml-[20vw]'>
      <div className="grid gap-3">
        <Label className="font-ProBold text-[3vw]">
          Products({products.length})
        </Label>

        {/* Colors List */}
        <ProductList />
      </div>
    </section>
  )
}
  
export default ProductssPage;