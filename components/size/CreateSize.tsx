"use client"

import { useParams, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios, { AxiosError } from "axios"
import { Admin, Size } from '@prisma/client';
import SizeForm from '../forms/sizeForm';
import { Button } from '../ui/button';
import { useLoadingStore } from "@/hooks/useStore";

const CreateSize = ({ currentUser, initialValue } : {
    currentUser: Admin | null
    initialValue?: Size | null
}) => {
    const params = useParams()
    const {Loading, notLoading, onLoading} = useLoadingStore()
    const [size, setSize] = useState(initialValue ? initialValue.name : '')
    const [valueSize, setValueSize] = useState(initialValue ? initialValue.value : "")
    const successMessage = initialValue ? "Size updated!" : "Size created!"
    const router = useRouter() 
  
    const createSize = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        onLoading()

        //CHECK IF THERE IS ANY INPUT
        if(size === '' || valueSize === '') {
            toast({
                variant: 'destructive',
                title: 'Missing Details!',
                description: `Oops! It seems like you are trying to create a new size but some essential details are missing.`
            })
            notLoading()
        } else {

            //RUN POST REQUEST IF IT PASSES THE CHECK PHASE
            try {
                if(initialValue) {
                    await axios.patch(`/api/sizes/${params.sizeName}`, {
                        name: size,
                        value: valueSize,
                        adminId: currentUser?.id
                    })
                } else {
                    await axios.post('/api/sizes', {
                        name: size,
                        value: valueSize,
                        adminId: currentUser?.id
                    })
                }
                toast({
                    title: successMessage,
                })
                window.location.assign('/dashboard/sizes')
    
            } catch (error) {
                if(error instanceof AxiosError) {
                    const errMsg = error.response?.data
                    toast({
                        variant: 'destructive',
                        title: errMsg,
                    })
                }
            } finally {
                notLoading()
            }
        }
      }, [size, valueSize, initialValue, router, notLoading, onLoading, successMessage, params, currentUser]
    )


  return (
    <section>
        <div className='grid gap-5'>
            <Button
            variant='outline' 
            onClick={() => router.back()}
            className='flex gap-1 items-center w-fit text-sm font-ProMedium rounded-md h-9 px-4 py-2 border bg-background shadow-sm hover:bg-accent'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Back
            </Button>   
            <SizeForm 
                title='Create a new Size'
                Buttonlabel='Create Size'
                LoadingLabel='Creating...'
                isLoading={Loading}
                size={size}
                setValueSize={setValueSize}
                valueSize={valueSize}
                setSize={setSize}
                onSubmit={createSize}
            />
        </div>
    </section>
  )
}

export default CreateSize;