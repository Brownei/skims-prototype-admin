"use client"

import Link from 'next/link';
import { useParams, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios from "axios"
import { Admin, Color } from '@prisma/client';
import ColorForm from '../forms/colorForm';

const CreateColor = ({ currentUser, initialValue } : {
    currentUser: Admin | null
    initialValue?: Color | null
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [color, setColor] = useState(initialValue ? initialValue.name : '')
    const [valueColor, setValueColor] = useState(initialValue ? initialValue.value : '')
    const params = useParams()
    const router = useRouter()
    const errorMessage = initialValue ? 'Error updating this color' : 'Error creating a color'
    const toastMessage = initialValue ? 'Updated Color' : 'Created Color'
    const titleLabel = initialValue ? 'Update this Color' : 'Create a new Color'
    const ButtonTitle = initialValue ? 'Update Color' : 'Create Color'
    const LoadingTitle = initialValue ? 'Updating...' : 'Creating...'

    const OnSubmit = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
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

  
        } catch (error) {
            console.log(errorMessage, error)
            toast({
                title: errorMessage,
                type: "foreground"
            })
        } finally {
            setIsLoading(false)
        }
      }, [color, valueColor, initialValue, params, errorMessage, toastMessage, currentUser]
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
                isLoading={isLoading}
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