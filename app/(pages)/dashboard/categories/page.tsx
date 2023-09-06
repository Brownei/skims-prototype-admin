import CategoriesList from "@/components/category/CategoriesList";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories"
}

const CategoriesPage = () => {
  return (
    <div className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-screen w-full lg:ml-[20vw]'>
      <Label className="font-ProBold md:text-[1.5rem] lg:text-[2.5rem]">
        Categories
      </Label>
      <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 items-center">
            <Input className="text-sm md:w-[400px] lg:w-[500px] font-ProMedium" placeholder="Filter categories names"/>
            <Button variant='outline' className="flex gap-1 items-center text-sm font-ProMedium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filter
            </Button>
          </div>
          <div>
            <Link 
            href="/dashboard/categories/new"
            className="flex gap-1 items-center text-sm font-ProMedium rounded-md h-9 px-4 py-2 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              New Category
            </Link>
          </div>
      </div>
      <CategoriesList />
    </div>
  )
}

export default CategoriesPage;