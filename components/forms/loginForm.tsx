"use client"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { signIn } from 'next-auth/react'
import { SyncLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useLoadingStore } from "@/hooks/useStore"
import Link from "next/link"
import { AxiosError } from "axios"


const LoginForm = () => {
  const { Loading, onLoading, notLoading } = useLoadingStore()
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()

  async function login (formData: FormData) {
    onLoading()
    const password = formData.get("password")
    const email = formData.get("email")

    if(password === '' || email === '') {
      setSubmitError('Missing Details!')
      notLoading()
    } else {
      try {
        setSubmitError('')
        await signIn('credentials', {
          redirect: false,
          email,
          password
        })
        window.location.assign('/dashboard/overview')
      } catch (error: unknown) {
        if(error instanceof AxiosError) {
          const errMsg = error.response?.data
          setSubmitError(errMsg)
        }
      } finally {
        notLoading()
      }
    }

  }

  return (
    <div className="grid gap-2">
      <form action={async formData => {await login(formData)}} className="space-y-4">
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Email</Label>
          <Input name="email" placeholder="admin@gmail.com" autoComplete="false"/>
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Password</Label>
          <Input name="password" placeholder="admin1234" autoComplete="false"/>
        </div>
        <Button className="w-full text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="submit" disabled={Loading}>
          {Loading ? <SyncLoader size={5}/> : "Log In"}
        </Button>
      </form>
      <p className="flex gap-1 justify-end text-sm font-ProBold">Need an account? 
        <span className="font-ProExtraBold text-[#AB8F80] hover:text-[#8b7366] cursor-pointer duration-300">
          <Link href={'/register'}>
            Register
          </Link>
        </span>
      </p>

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
          <p className="text-red text-xs font-ProExtraBold grid justify-center items-center text-center lg:text-sm">
            {submitError}
          </p>
        </div>
      )}
    </div>
  )
}

export default LoginForm;
