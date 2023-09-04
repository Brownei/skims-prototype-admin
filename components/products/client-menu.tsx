"use client"
import { Button } from "@/components/ui/button"
import { ProductColumn } from "./columns"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { toast } from "../ui/use-toast"
import { FC } from "react"
import Modal from "../Modal"
import Link from "next/link"
import { Separator } from "../ui/separator"

interface ProductColumnProps {
    products: ProductColumn
}

const ClientMenu: FC<ProductColumnProps> = ({products}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = useParams()
    const search = searchParams.get('product')

    if(params) {
      search
    }

    async function onDelete(product: string) {
        console.log(product)
        try {
          await axios.delete(`/api/products/${product}`)
          window.location.assign('/dashboard/products')
          toast({
            title: `Succesfully deleted ${product}`
          })
        } catch (error) {
          console.log('[DELETING PRODUCT]', error)
          toast({
            title: `Could not delete ${product}`
          })
        }
    }

  return (
    <div>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/products/${products.name}`)} className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="flex items-center gap-1">
                  <Link href={`?product=${products.name}`}>
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
  )
}

export default ClientMenu