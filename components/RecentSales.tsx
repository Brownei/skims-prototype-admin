import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FC from 'react'
import { Order } from "@prisma/client"

type RecentSalesProps = {
    salesOrder: Order[] 
}
  
export function RecentSales({salesOrder}: RecentSalesProps) {
    const USDformat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
      <div className="space-y-8">
        {salesOrder.length === 0 ? (
            <div className="grid justify-center">
                <p className="text-sm font-ProMedium leading-none">No sales this month</p>
            </div>
        ) : (
            <div>
                {salesOrder.slice(0, 4).map((order) => (
                    <div key={order.id}>
                        <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src='/avatars/01.png' alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-ProMedium leading-none">{order.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {order.email}
                                </p>
                            </div>
                            <div className="ml-auto font-ProMedium">{USDformat.format(order.pricePaid)}</div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    )
}