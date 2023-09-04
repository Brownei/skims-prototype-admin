"use client"

import Link from 'next/link';
import { useParams, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios from "axios"
import { Admin, Size } from '@prisma/client';
import ColorForm from '../forms/colorForm';
import SizeForm from '../forms/sizeForm';
import { Button } from '../ui/button';

const CreateSize = ({ currentUser, initialValue } : {
    currentUser: Admin | null
    initialValue?: Size | null
}) => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [size, setSize] = useState(initialValue ? initialValue.name : '')
    const [valueSize, setValueSize] = useState(initialValue ? initialValue.value : "")
    const router = useRouter() 
  
    const createSize = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
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
                title: "Success creating a size"
            })
            window.location.assign('/dashboard/sizes')

        } catch (error) {
            console.log('Error creating size ', error)
            toast({
                title: "Error creating a size",
                type: "foreground"
            })
        } finally {
            setIsLoading(false)
        }
      }, [size, valueSize, initialValue, params, currentUser]
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
                isLoading={isLoading}
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