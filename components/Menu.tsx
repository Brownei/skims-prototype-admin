"use client"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useScroll, useMotionValueEvent, motion} from 'framer-motion'
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Admin } from "@prisma/client"

type MenuProps = {
  currentUser: Admin | null
}

const Menu = ({currentUser}: MenuProps) => {
  const inActiveLink = "flex gap-3 p-1 items-center duration-300 transition-all ease-in-out font-ProExtraBold hover:bg-[#eceaf2] hover:text-black hover:rounded-l-lg hover:ml-5 hover:mr-0 md:text-[14px] md:w-[15vw] lg:w-[20vw] lg:text-[16px]"
  const activeLink = inActiveLink+ " bg-[#eceaf2] text-black rounded-l-lg"
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if(latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <nav className="font-ProRegular">
      {/* Bigger Devices View */}
      <aside className='fixed hidden min-h-screen text-[#ECEAF2] mr-0 bg-[#AB8F80] lg:block md:w-[15vw] lg:w-[20vw]'>
        <ul className="flex flex-col justify-center items-start gap-8 ml-7 mr-0 mt-10 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
          <li>
            <Link 
            className={pathname.includes('/dashboard/overview') ? activeLink : inActiveLink}
            href="/dashboard/overview">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Overview
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/orders') ? activeLink : inActiveLink}
            href="/dashboard/orders">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Orders
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/categories') ? activeLink : inActiveLink}
            href="/dashboard/categories">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Categories
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/colors') ? activeLink : inActiveLink}
            href="/dashboard/colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
              Colors
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/styles') ? activeLink : inActiveLink}
            href="/dashboard/styles">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              Style
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/collection') ? activeLink : inActiveLink}
            href="/dashboard/collections">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              Collections
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/sizes') ? activeLink : inActiveLink}
            href="/dashboard/sizes">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Sizes
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/products') ? activeLink : inActiveLink}
            href="/dashboard/products">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
              Products
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/transactions') ? activeLink : inActiveLink}
            href="/dashboard/transactions">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
              Transactions
            </Link>
          </li>
          <li>
            <Link 
            className={pathname.includes('/dashboard/settings') ? activeLink : inActiveLink}
            href="/dashboard/settings">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </li>
        </ul>
      </aside>


      {/* Mobile View */}
      <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: {y: "-100%"}
      }}
      animate= { hidden ? 'hidden' : 'visible' }
      transition= {{ duration: 0.4, ease: "easeInOut"}}
      className='sticky top-0 flex justify-between items-center px-3 h-[50px] w-full bg-[#AB8F80] text-white'>
        <Sheet key={"left"}>
          <div className='block lg:hidden'>
            <SheetTrigger asChild>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg> 
              </button> 
            </SheetTrigger>  
            <SheetContent className='w-[40vw] bg-[#AB8F80] text-white' side={"left"}>
              <ul className="grid grid-rows-4 items-center gap-6">
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/overview') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/overview'}>
                    Home
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/orders') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/orders'}>
                    Orders
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/categories') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/categories'}>
                    Categories
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/styles') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/styles'}>
                    Styles
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/colors') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/colors'}>
                    Colors
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/sizes') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/sizes'}>
                    Sizes
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/collections') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/collections'}>
                    Collections
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/products') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/products'}>
                    Products
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/transactions') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/transactions'}>
                    Transactions
                  </Link>
                </li>
                <li className={cn('cursor-pointer font-ProBold hover:font-ProExtraBold', pathname.includes('/dahboard/settings') ? 'text-muted-foreground font-ProExtraBold' : '')}>
                  <Link href={'/dashboard/settings'}>
                    Settings
                  </Link>
                </li>
              </ul>
              <SheetFooter className="absolute bottom-4 right-5">
                <SheetClose>
                  <button onClick={() => signOut()} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Log Out
                  </button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </div>
        </Sheet>
        <a className='text-lg font-ProExtraBold lg:hidden' href="/dashboard/overview">SKIMS</a>
        <div className="flex gap-3 items-center lg:hidden">
            <Link href="/notifications">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>{currentUser?.image}</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
        </div>
      </motion.nav>
    </nav>
  )
}

export default Menu;