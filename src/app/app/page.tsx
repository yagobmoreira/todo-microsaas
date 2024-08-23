import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { auth } from "@/services/auth"
import { signOut } from "next-auth/react"
import { Button } from "react-day-picker"
import { UserInfo } from "./_components/user-info"

export default async function Page() {
  const session = await auth()
  
  return (
    <main className="flex items-center justify-center h-screen">
      <UserInfo user={session?.user} />
    </main>
  )
}