import Menu from "@/components/Menu"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/authOptions"
import { redirect } from "next/navigation"

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // const session = await getServerSession(authOptions)
  
  // if(!session) {
  //   redirect('/')
  // } 
  return (
    <div className="lg:bg-[#eceaf2] lg:flex lg:min-h-screen">
      <Menu />
      {children}
    </div>
  )
}
