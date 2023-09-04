import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarPicker } from "@/components/CalenderPicker"
import { Overview } from "@/components/Overview"
import { RecentSales } from "@/components/RecentSales"
import { Search } from "@/components/Search"
import { UserNav } from "@/components/UserNav"
import { getGraphRevenue } from "@/utils/get-graph-revenue"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { getSales,getSalesPercentage, getSalesByCurrentMonth, getSalesOrders } from "@/utils/get-sales"
import { getProductCount } from "@/utils/get-product-count"
import { getTotalRevenue, getTotalRevenuePercentage } from "@/utils/get-total-revenue"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "The Skims Dashboard offers a comprehensive and real-time view of vital data and analytics for Skims, a leading provider of premium shapewear and loungewear.",
}

export default async function DashboardPage() {
    const currentUser = await getCurrentUser()
    const graphRevenue = await getGraphRevenue(currentUser!.id)
    const salesReview = await getSales(currentUser!.id)
    const salesPercentage = await getSalesPercentage(currentUser!.id)
    const salesByCurrentMonth = await getSalesByCurrentMonth(currentUser!.id)
    const salesOrder = await getSalesOrders(currentUser!.id)
    const productCount = await getProductCount(currentUser!.id)
    const totalRevenue = await getTotalRevenue(currentUser!.id)
    const totalRevenuePercentage = await getTotalRevenuePercentage(currentUser!.id)
    const USDformat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

  return (
    <section className='p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-full font-ProRegular lg:ml-[20vw]'>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
            <div className="hidden ml-auto justify-end items-center space-x-4 lg:flex">
              <Search />
              <UserNav currentUser={currentUser}/>
            </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-ProBold">{currentUser?.firstName}&apos;s Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarPicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-ProMedium">
                      Total Revenue
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-muted-foreground">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-ProBold">{USDformat.format(totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                    {totalRevenuePercentage < 0 ? `+${totalRevenuePercentage}% from last month` : `-${totalRevenuePercentage}% from last month`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-ProMedium">
                      Products in Stock
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-ProBold">+{productCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-ProMedium">Sales</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-ProBold">+{salesReview}</div>
                    <p className="text-xs text-muted-foreground">
                      {salesPercentage < 0 ? `+${salesPercentage}% from last month` : `-${salesPercentage}% from last month`}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={graphRevenue} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made {salesByCurrentMonth} sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales salesOrder={salesOrder}/>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}