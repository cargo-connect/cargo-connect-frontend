"use client"

"use client"

import type React from "react"

// Removed useState, useRef, useEffect as they are no longer needed for OTP
import { useRouter } from "next/navigation"
import Image from "next/image"
// Removed Button as it's no longer used
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function Verification() {
  const router = useRouter() // Keep router if needed for future navigation (e.g., a "Go to Login" button)

  // Removed all state related to OTP, loading, errors, and resending
  // const [otp, setOtp] = useState(["", "", "", ""])
  // const inputRefs = [...]
  // const [isLoading, setIsLoading] = useState(false)
  // const [isResending, setIsResending] = useState(false);
  // const [error, setError] = useState<string | null>(null)
  // const [resendMessage, setResendMessage] = useState<string | null>(null);

  // Removed OTP specific handlers
  // const handleChange = (...) => {}
  // const handleKeyDown = (...) => {}
  // const handleSubmit = (...) => {}
  // const handleResend = (...) => {}

  // Removed useEffect for focusing input
  // useEffect(() => { ... }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="mb-8">
        <Image src="/images/logo.svg" alt="Cargo Connect Logo" width={180} height={45} />
      </div>

      <Card className="text-center max-w-md w-full">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
          <p className="text-gray-600">
            Registration successful! We've sent a verification link to your email address.
          </p>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700">
            Please click the link in the email to activate your account. Make sure to check your spam or junk folder if you don't see it in your inbox.
          </p>
          {/* Removed the OTP form */}
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center pt-4">
          {/* Removed the resend logic and button */}
           <p className="text-sm text-gray-600">
             Once verified, you can log in.
             {/* Optionally add a link back to login */}
             {/* <Link href="/auth/login" className="text-primary hover:underline ml-1">Go to Login</Link> */}
           </p>
        </CardFooter>
      </Card>
    </div>
  )
}
