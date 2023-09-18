"use client"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { signIn } from 'next-auth/react'
import Link from "next/link"
import { SyncLoader } from "react-spinners"
import React, { useState } from "react"
import { useLoadingStore } from "@/hooks/useStore"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"


const RegisterForm = () => {
  const { Loading, onLoading, notLoading } = useLoadingStore()
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()

  async function registerAdmin (formData: FormData) {
    onLoading()
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName") 
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if(password !== confirmPassword) {
      setSubmitError('Passwords do not match!')
      notLoading()
    } else if(firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
      setSubmitError('Missing Details!')
      notLoading()
    } else {
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
          window.location.assign('/dashboard/overview')
        }
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

export default RegisterForm;
