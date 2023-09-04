"use client"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import React, { SyntheticEvent, useCallback, useRef, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios from "axios"
import { Admin, Style } from '@prisma/client';
import { useInitialStyleStore } from '@/hooks/useStore';
import {nanoid} from 'nanoid'
import moment from "moment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import getQueryClient from "@/utils/getQueryClient"

// type StyleRemake = {
//   items: readonly {
//     id: string
//     name: string
//     createdAt: string
//     updatedAt: string
//   }[]
// }

const StyleForm = ({currentUser} : {
  currentUser: Admin | null
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { initialStyle, onRemove} = useInitialStyleStore()
  const queryClient = useQueryClient()
  const [styles, setStyles] = useState(initialStyle ? initialStyle?.name : "")
  const errorMessage = initialStyle ? 'Error updating this style' : 'Error creating a style'
  const toastMessage = initialStyle ? 'Updated Style' : 'Created Style'
  const titleLabel = initialStyle ? `Update this Style: ${initialStyle?.name}` : 'Create a new Style'
  const ButtonTitle = initialStyle ? 'Update Style' : 'Create Style'
  const LoadingTitle = initialStyle ? 'Updating...' : 'Creating...'

  const handleSubmit = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if(initialStyle) {
              await axios.patch(`/api/styles/${initialStyle?.name}`, {
                name: styles,
                adminId: currentUser?.id
              })
            } else {
              await axios.post('/api/styles', {
                name: styles,
                adminId: currentUser?.id
              })
            }
            setStyles("")
            onRemove()
            queryClient.invalidateQueries({queryKey: ['styles']})
            
            toast({
              title: toastMessage
            })
        } catch (error) {
            console.log(errorMessage, error)
            toast({
                title: errorMessage,
                type: "foreground"
            })
        } finally {
            setIsLoading(false)
        }
      }, [styles, initialStyle, queryClient, onRemove, errorMessage, toastMessage, currentUser]
  )

  return (
    <div className="mt-10">
      <Label className="text-lg font-ProExtraBold mt-3">{titleLabel}</Label>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="flex gap-3 items-center">
            <Input className="w-[60%]" value={styles} onChange={(e) => setStyles(e.target.value)} placeholder="I will find examples later..." autoComplete="false"/>
            <Button disabled={isLoading} className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="submit">
              {isLoading ? (
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
          </div>
        </form>
    </div>
  )
}

export default StyleForm;