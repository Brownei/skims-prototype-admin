"use client"

import Link from 'next/link';
import { Admin, Collection } from '@prisma/client';
import { Button } from "@/components/ui/button"
import { Label } from '../ui/label';
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import { SyntheticEvent, useState, useTransition } from "react"
import ImageUpload from "@/components/upload"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { toast } from '../ui/use-toast';
import { useLoadingStore } from '@/hooks/useStore';
import { getErrorMessage } from '@/lib/error-handler';
import axios, { AxiosError } from 'axios';

type CreateCollectionsProps = {
    currentUser: Admin | null
    initialValue?: Collection | null;
}

const CreateCollections: React.FC<CreateCollectionsProps> = ({ initialValue, currentUser } ) => {
    const router = useRouter()
    const params = useParams()
    const { Loading, onLoading, notLoading } = useLoadingStore()
    const [collection, setCollection] = useState(initialValue ? initialValue?.name : '')
    const [image, setImage] = useState(initialValue ? initialValue.image : '')
    const [isEssentials, setIsEssentials] = useState(initialValue ? initialValue?.isEssentials : false)
    const [isLimitedEdition, setIsLimitedEdition] = useState(initialValue ? initialValue?.isLimitedEdition : false)
    const titleLabel = initialValue ? 'Update this collection' : 'Create a new collection'
    const ButtonTitle = initialValue ? 'Update collection' : 'Create collection'
    const LoadingTitle = initialValue ? 'Updating...' : 'Creating...'

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault()
        onLoading()

        //CHECK IF THERE IS ANY INPUT
        if(collection === '' || image === '') {
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
                    await axios.patch(`/api/collections/${params.collectionName}`, {
                        name: collection,
                        imageUrl: image,
                        isEssentials: isEssentials,
                        isLimitedEdition: isLimitedEdition,
                        adminId: currentUser?.id
                    })
                } else {
                    await axios.post('/api/collections', {
                        name: collection,
                        imageUrl: image,
                        isEssentials: isEssentials,
                        isLimitedEdition: isLimitedEdition,
                        adminId: currentUser?.id
                    })
                }
                toast({
                    title: initialValue ? 'Collection updated!' : 'Collection created!'
                })
                router.push('/dashboard/collections')
                
            } catch (error) {
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
    }

  return (
    <main>
        <div className='grid gap-5'>
            <Button 
            variant='outline'
            onClick={() => router.back()}
            className='text-sm font-ProMedium w-fit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Back
            </Button>
            <div className="mt-10">
                <h2 className="text-lg font-ProExtraBold mb-5">{titleLabel}</h2>
                <form onSubmit={onSubmit} className="flex flex-col space-y-7">
                    <div className="flex flex-col gap-2">
                        <Label className="text-md font-ProBold">
                             Name
                        </Label>
                        <Input className="w-[70%]" value={collection} onChange={(e) => setCollection(e.target.value)} placeholder="I will find examples later..." autoComplete="false"/>
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-md font-ProBold mb-3">
                            Image
                        </Label>
                        <ImageUpload value={image} onRemove={(e) => setImage('')} onChange={(e) => setImage(e)} disabled={Loading} />
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                        <input defaultChecked={isLimitedEdition} className="h-4 w-5 bg-transparent text-black rounded-sm" onChange={(e) => setIsLimitedEdition(prev => !prev)} id="archived" type="checkbox"/>
                            <Label htmlFor="archived" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Limited Edition
                            </Label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input defaultChecked={isEssentials} className="h-4 w-5 bg-transparent text-black rounded-sm" onChange={(e) => setIsEssentials(prev => !prev)} id="essentials" type="checkbox"/>
                            <Label htmlFor="essentials" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Essential
                            </Label>
                        </div>
                    </div>
                    <Button disabled={Loading} className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300">
                        {Loading ? (
                        <div className="flex gap-2 items-center">
                            <MoonLoader size={20} color="white" />
                            {LoadingTitle}
                        </div>
                    ) : (
                        <div>
                        {ButtonTitle}
                        </div>
                    )}
                    </Button>
                </form>
            </div>
        </div>
    </main>
  )
}

export default CreateCollections;