"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function Verification() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would verify the OTP here
    router.push("/dashboard")
  }

  const handleResend = () => {
    // In a real app, you would resend the OTP here
    alert("OTP resent!")
  }

  // Focus the first input on component mount
  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="mb-8">
        <Image src="/images/logo.svg" alt="Cargo Connect Logo" width={180} height={45} />
      </div>

      <Card className="text-center max-w-md w-full">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-2">Verification</h1>
          <p className="text-gray-600">We've sent a code to your email. Please enter it below.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button onClick={handleResend} className="text-primary hover:underline">
              Resend
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

