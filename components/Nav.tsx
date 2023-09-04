"use client"

import Link from "next/link"

const Nav = ({session} : any) => {
  return (
    <section className='hidden rounded-t-lg lg:block'>
        <div className="flex justify-between items-center h-[50px] px-2 bg-[#eceaf2] border-b-2 shadow-md">
          <a className='text-lg font-ProExtraBold' href="/">SKIMS</a>
          <div className="flex items-center gap-1 px-3 py-1 border-black rounded-full focus:outline-2">
            <input className="bg-transparent w-full border-none px-3 py-1 outline-none focus:outline-none" placeholder="search"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/notifications">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </Link>
            <Link href="/profile">
              {session ? (
                <div>
                  {session.user.image}
                </div>
              ): (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              )}
            </Link>
          </div>
        </div>
    </section>
  )
}

export default Nav