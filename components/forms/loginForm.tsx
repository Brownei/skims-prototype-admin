"use client"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { signIn } from 'next-auth/react'
import { SyncLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import React from "react"
import { useLoadingStore } from "@/hooks/useStore"
import Link from "next/link"


const LoginForm = () => {
  const { Loading, onLoading, notLoading } = useLoadingStore()
  const router = useRouter()

  async function login (formData: FormData) {
    onLoading()
    const password = formData.get("password")
    const email = formData.get("email")

    try {
      await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      router.push('/dashboard/overview')
    } catch (error) {
      console.log(error)
      router.push('/')
    } finally {
      notLoading()
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
    </div>
  )
}

export default LoginForm;
