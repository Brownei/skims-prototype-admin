"use client"

import { useParams, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios from "axios"
import { Admin, Category, SubCategory } from '@prisma/client';
import CategoryForm from '../forms/categoryForm';
import { Button } from '../ui/button';
import { useLoadingStore } from "@/hooks/useStore";
import { getErrorMessage } from "@/lib/error-handler";

type subCategories = {
    name: string;
    id: string;
}

const CreateCategory = ({ currentUser, initialCategory, initialSubCategory } : {
    currentUser: Admin | null
    initialCategory?: Category | null
    initialSubCategory?: SubCategory[] | null
}) => {
    let prototypeImage = ''
    const {Loading, notLoading, onLoading} = useLoadingStore()
    const [category, setCategory] = useState(initialCategory ? initialCategory?.name : '')
    const [subCategory, setSubCategory] = useState<subCategories[]>(initialSubCategory ? initialSubCategory.map((i) => ({id: i.id, name: i.name})) : [{ name: '', id: ""}])
    const params = useParams()
    const router = useRouter()
    const errorMessage = initialCategory ? 'Error updating this category' : 'Error creating a category'
    const toastMessage = initialCategory ? 'Updated category' : 'Created category'
    const titleLabel = initialCategory ? 'Update this category' : 'Create a new category'
    const ButtonTitle = initialCategory ? 'Update category' : 'Create category'
    const LoadingTitle = initialCategory ? 'Updating...' : 'Creating...'

    const OnSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        onLoading()
        try {
            if(initialCategory && initialSubCategory) {
                await axios.patch(`/api/categories/${params.categoryName}`, {
                    name: category,
                    subCategoryName: subCategory.map((i) => (i.name)),
                    adminId: currentUser?.id,
                })
            } else {
                await axios.post('/api/categories', {
                    name: category,
                    subCategoriesName: subCategory.map((i) => (i.name)),
                    adminId: currentUser?.id,
                })
            }
            toast({
                title: toastMessage
            })
            window.location.assign('/dashboard/categories')
        } catch (error) {
            console.log(errorMessage, getErrorMessage(error))
            toast({
                title: errorMessage,
                type: "foreground"
            })
        } finally {
            notLoading()
        }
    }


  return (
    <section>
        <div className='grid gap-5'>
            <Button
            onClick={() => router.back()}
            variant='outline'
            className='flex gap-1 items-center w-fit text-sm font-ProMedium rounded-md h-9 px-4 py-2 border bg-background shadow-sm hover:bg-accent'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Back
            </Button>
            <CategoryForm 
                title={titleLabel}
                Buttonlabel={ButtonTitle}
                LoadingLabel={LoadingTitle}
                isLoading={Loading}
                category={category}
                setCategory={setCategory}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                initialSubCategory={initialSubCategory}
                onSubmit={OnSubmit}
            />
        </div>
    </section>
  )
}

export default CreateCategory;