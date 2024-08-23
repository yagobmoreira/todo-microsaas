'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from '@/components/ui/use-toast'
import { signIn } from "next-auth/react"
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string;
}

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      await signIn("nodemailer", {redirect: false, email: data.email})
      toast({
        title:"Magic link sent!",
        description:"Check your email.",
      })
    } catch (err) {
      console.error('An error occurred:', err)
      toast({
        title:"Error",
        description:"An error occurred. Please try again.",
      })

    } finally {
      setIsLoading(false)
    }

  }

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email to receive a magic link</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}