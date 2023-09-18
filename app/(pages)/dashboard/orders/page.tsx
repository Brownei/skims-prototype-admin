import getCurrentUser from "@/app/actions/getCurrentUser";
import OrderList from "@/components/orders/OrderList";
import { OrderColumn } from "@/components/orders/columns";
import { Label } from "@/components/ui/label"
import { prismaClient } from "@/lib/prismaClient";
import moment from "moment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

const OrdersPage = async () => {
  const currentUser = await getCurrentUser()
  const orders = await prismaClient.order.findMany({
    where: {
        adminId: currentUser?.id
    }, 
    include: {
      product: true
    },
    orderBy: {
        createdAt: 'desc'
    }
  })

  const orderDataItem: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    isPaid: order.isPaid ? 'Paid' : 'Pending',
    name: order.name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    pricePaid: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(order.product.reduce((total, item) => {
      return total + item.price
    }, 0)),
    products: order.product.map((product) => product.name).join(', '),
    createdAt: moment(order.createdAt).format('MMMM DD, YYYY')
  }))

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div className="grid gap-3">
        <Label className="font-ProBold text-[3vw]">
          Orders({orders.length})
        </Label>

        {/* Colors List */}
        <OrderList orderDataItem={orderDataItem}/>
      </div>
    </section>
  )
}
  
export default OrdersPage;