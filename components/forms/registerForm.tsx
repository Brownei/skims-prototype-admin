"use client"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { signIn } from 'next-auth/react'
import Link from "next/link"
import { SyncLoader } from "react-spinners"
import React from "react"
import { useLoadingStore } from "@/hooks/useStore"
import axios from "axios"
import { useRouter } from "next/navigation"


const RegisterForm = () => {
  const { Loading, onLoading, notLoading } = useLoadingStore()
  const router = useRouter()

  async function registerAdmin (formData: FormData) {
    onLoading()
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName") 
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if(password !== confirmPassword) {
        throw new Error('Password dont match')
    }

    try {
      const register = await axios.post('/api/admin', {
        email,
        firstName: firstName,
        lastName: lastName,
        hashedPassword: password,
      })
      if(register.data) {
        await signIn('credentials', {
            redirect: false,
            email,
            password
        })
        router.push('/dashboard/overview')
      }
    } catch (error) {
      console.log(error)
      router.push('/')
    } finally {
      notLoading()
    }
  }

  return (
    <div className="grid gap-2">
      <form action={async formData => {await registerAdmin(formData)}} className="space-y-4">
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Firstname</Label>
          <Input name="firstName" placeholder="John"/>
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Lastname</Label>
          <Input name="lastName" placeholder="Doe"/>
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Email</Label>
          <Input name="email" placeholder="example@gmail.com"/>
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Password</Label>
          <Input name="password" placeholder="*********"/>
        </div>
        <div className="flex flex-col space-y-3">
          <Label className="text-md font-ProBold">Confirm Password</Label>
          <Input name="confirmPassword" placeholder="*********"/>
        </div>
        <Button className="w-full text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="submit" disabled={Loading}>
          {Loading ? <SyncLoader size={5}/> : "Register"}
        </Button>
      </form>
      <p className="flex gap-1 justify-end text-sm font-ProBold">Already have an account? 
          <span className="font-ProExtraBold text-[#AB8F80] hover:text-[#8b7366] cursor-pointer duration-300">
            <Link href={'/'}>
              Login
            </Link>
          </span>
        </p>
    </div>
  )
}

export default RegisterForm;
