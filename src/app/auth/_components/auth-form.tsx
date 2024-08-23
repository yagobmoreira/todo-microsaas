'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

async function sendMagicLink(email: string) {
  const response = await fetch('/api/auth/magic-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Failed to send magic link')
  }

  return response.json()
}

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sendMagicLink(email)
      setSuccess(true)
    } catch (err) {
      console.error('An error occurred:', err)
      setError('Failed to send magic link. Please try again.')
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
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </Button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-500 mt-2">Magic link sent! Check your email.</p>}
        </CardFooter>
      </form>
    </Card>
  )
}