"use client"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import React, { SyntheticEvent, useCallback, useRef, useState } from "react"
import { toast } from '@/components/ui/use-toast';
import axios, { AxiosError } from "axios"
import { Admin, Style } from '@prisma/client';
import { useInitialStyleStore, useLoadingStore } from '@/hooks/useStore';
import {nanoid} from 'nanoid'
import moment from "moment"
import { useQueryClient } from "@tanstack/react-query"

const StyleForm = ({currentUser} : {
  currentUser: Admin | null
}) => {
  const {Loading, notLoading, onLoading} = useLoadingStore()
  const { initialStyle, onRemove} = useInitialStyleStore()
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
  const queryClient = useQueryClient()
  const [styles, setStyles] = useState(initialStyle ? initialStyle?.name : "")
  const successMessage = initialStyle ? 'Updated Style' : 'Created Style'
  const titleLabel = initialStyle ? `Update this Style: ${initialStyle?.name}` : 'Create a new Style'
  const ButtonTitle = initialStyle ? 'Update Style' : 'Create Style'
  const LoadingTitle = initialStyle ? 'Updating...' : 'Creating...'

  const handleSubmit = useCallback(
      async (e: SyntheticEvent) => {
        e.preventDefault()
        onLoading()

        //CHECK IF THERE IS ANY INPUT 
        if(styles === '') {
          toast({
            variant: 'destructive',
            title: 'Missing Details!',
            description: `Oops! It seems like you are trying to create a new style but some essential details are missing.`
          })
          notLoading()
        } else {

          //RUN POST REQUEST IF IT PASSES THE CHECK PHASE
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
                title: successMessage
              })
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
      }, [styles, initialStyle, queryClient, onRemove, successMessage, notLoading, onLoading, currentUser]
  )

  return (
    <div className="mt-10">
      <Label className="text-lg font-ProExtraBold mt-3">{titleLabel}</Label>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="flex gap-3 items-center">
            <Input className="w-[60%]" value={styles} onChange={(e) => setStyles(e.target.value)} placeholder="I will find examples later..." autoComplete="false"/>
            <Button disabled={Loading} className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="submit">
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
          </div>
        </form>
    </div>
  )
}

export default StyleForm;