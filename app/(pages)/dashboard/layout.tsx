import Menu from "@/components/Menu"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"
import getCurrentUser from "@/app/actions/getCurrentUser"

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  if(!currentUser) {
    redirect('/')
  }  
  return (
    <div className="lg:bg-[#eceaf2] lg:flex lg:min-h-screen">
      <Menu currentUser={currentUser}/>
      {children}
    </div>
  )
}
