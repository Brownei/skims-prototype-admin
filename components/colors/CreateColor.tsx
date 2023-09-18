"use client"

import Link from 'next/link';
import { useParams, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useState } from "react"
import {toast} from '@/components/ui/use-toast'
import axios, { AxiosError } from "axios"
import { Admin, Color } from '@prisma/client';
import ColorForm from '../forms/colorForm';
import { useLoadingStore } from '@/hooks/useStore';

const CreateColor = ({ currentUser, initialValue } : {
    currentUser: Admin | null
    initialValue?: Color | null
}) => {
    const [color, setColor] = useState(initialValue ? initialValue.name : '')
    const [valueColor, setValueColor] = useState(initialValue ? initialValue.value : '')
    const {Loading, onLoading, notLoading} = useLoadingStore()
    const params = useParams()
    const router = useRouter()
    const toastMessage = initialValue ? 'Updated Color' : 'Created Color'
    const titleLabel = initialValue ? 'Update this Color' : 'Create a new Color'
    const ButtonTitle = initialValue ? 'Update Color' : 'Create Color'
    const LoadingTitle = initialValue ? 'Updating...' : 'Creating...'

    const OnSubmit = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        onLoading()

        //CHECK IF THERE IS ANY INPUT
        if(color === '' || valueColor === '') {
            toast({
                variant: 'destructive',
                title: 'Missing Details!',
                description: `Oops! It seems like you are trying to create a new collection but some essential details are missing.`
            })
            notLoading()
        } else {

            //RUN POST REQUEST IF IT PASSES THE CHECK PHASE
            try {
                if(initialValue) {
                    await axios.patch(`/api/colors/${params.colorName}`, {
                        name: color,
                        value: valueColor,
                        adminId: currentUser?.id
                    })
                } else {
                    await axios.post('/api/colors', {
                        name: color,
                        value: valueColor,
                        adminId: currentUser?.id
                    })
                }
                toast({
                    title: toastMessage
                })
                window.location.assign('/dashboard/colors')
    
      
            } catch (error: unknown) {
                if(error instanceof AxiosError) {
                    const errMsg = error.response?.data
                    toast({
                        variant: 'destructive',
                        title: errMsg
                    })
                }
            } finally {
                notLoading()
            }
        }
      }, [color, valueColor, initialValue, router, params, onLoading, notLoading, toastMessage, currentUser]
    )

    


  return (
    <section>
        <div className='grid gap-5'>
            <Link 
            href="/dashboard/colors"
            className='flex gap-1 items-center w-fit text-sm font-ProMedium rounded-md h-9 px-4 py-2 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Back
            </Link>
            <ColorForm 
                title={titleLabel}
                initialValue={initialValue}
                Buttonlabel={ButtonTitle}
                LoadingLabel={LoadingTitle}
                isLoading={Loading}
                colors={color}
                setColor={setColor}
                valuColor={valueColor}
                setValueColor={setValueColor}
                onSubmit={OnSubmit}
            />
        </div>
    </section>
  )
}

export default CreateColor;