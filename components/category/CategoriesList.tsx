"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Accordion,AccordionContent, AccordionItem,AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useCategories } from "@/hooks/use-categories"
import { useSubCategories } from "@/hooks/use-subCategories"
import Error from "../Error"
import { Loader } from "../Loader"
import Modal from "../Modal"
import { toast } from "../ui/use-toast"
import axios from "axios"


const CategoriesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const params = useParams()
  const {data: categories, isLoading: loadingCategories, isError: errorCategories} = useCategories()
  const {data: subCategories, isLoading: loadingSubCategories, isError: errorSubCategories} = useSubCategories()

  if(loadingCategories && loadingSubCategories) {
    return <Loader />
  }

  if(errorCategories || errorSubCategories) {
    return <Error title="Check your connection please!" subtitle="Something must have happened" showReset={true}/>
  }

  if(params) {
    search
  }

  async function onDelete(category: string) {
    console.log(category)
    try {
      await axios.delete(`/api/categories/${category}`)
      window.location.assign('/dashboard/categories')
      toast({
        title: `Succesfully deleted ${category}`
      })
    } catch (error) {
      console.log('[DELETING COLOR]', error)
      toast({
        title: `Could not delete ${category}`
      })
    }
  }

  return (
    <div>
      {/* List of Categories  */}
      <div className="mt-5 flex flex-col gap-2">
        <Label>List of Categories</Label>
        {categories?.map((category) => (
          <div className="flex justify-between items-center" key={category.id}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{category.name}</AccordionTrigger>
                {subCategories?.filter((subCategory) => subCategory.categoryId === category.id).map((filteredSubCategory) => (
                  <div key={filteredSubCategory.id}>
                    <AccordionContent>
                      <div className="flex justify-between items-center p-2">
                        {filteredSubCategory.name}
                      </div>
                    </AccordionContent>
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="sticky top-0 right-3 h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/categories/${category.name}`)} className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-1">
                  <Link href={`?category=${category.name}`} scroll={false}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Delete
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!!search && (
              <Modal>
                <div>
                  <h1 className="text-lg font-ProExtraBold">Are you sure?</h1>
                  <p className="text-sm text-muted-foreground font-ProRegular">This will delete the category named <span className="text-md font-ProBold">{search}</span> form the servers</p>
                  <div className="flex justify-end items-center gap-4">
                    <Button onClick={() => router.back()} className="mt-2 sm:mt-0" variant='outline'>
                      No, I do not think so
                    </Button>
                    <Button onClick={() => onDelete(search)} variant='destructive'>
                      Yes, I am
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesList;

export const revalidate = 3600