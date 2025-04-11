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
  const [isLoading, setIsLoading] = useState(false) // Loading state for verification
  const [isResending, setIsResending] = useState(false); // Loading state for resend
  const [error, setError] = useState<string | null>(null) // Error state for verification
  const [resendMessage, setResendMessage] = useState<string | null>(null); // Feedback for resend

  const handleChange = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  // Updated handleSubmit for API integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    const otpCode = otp.join("")

    // Basic validation
    if (otpCode.length !== 4) {
      setError("Please enter the complete 4-digit code.");
      setIsLoading(false);
      return;
    }

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting OTP verification with:", otpCode)
      // const response = await fetch('/api/auth/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ otp: otpCode /*, maybe email/userId */ }),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Verification failed');
      // }
      // console.log('Verification successful:', result);
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      const simulatedSuccess = true; // Simulate success

      if (!simulatedSuccess) {
        throw new Error("Invalid or expired code."); // Simulate failure
      }

      // Redirect on success
      router.push("/dashboard")

    } catch (err: any) {
      console.error('Verification error:', err)
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  // Updated handleResend for API integration
  const handleResend = async () => {
    setError(null); // Clear verification error
    setResendMessage(null);
    setIsResending(true);

    try {
      // --- Placeholder for actual API call ---
      console.log("Requesting OTP resend");
      // const response = await fetch('/api/auth/resend-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ /* maybe email/userId */ }),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to resend code');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setResendMessage("A new code has been sent."); // Show success feedback

    } catch (err: any) {
       console.error('Resend error:', err);
       setResendMessage(err.message || 'Could not resend code.'); // Show error feedback
    } finally {
       setIsResending(false);
       // Optionally clear the message after a few seconds
       setTimeout(() => setResendMessage(null), 5000);
    }
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
                  type="text" // Use "text" and pattern or "tel" for numeric keyboard on mobile
                  inputMode="numeric" // Hint for numeric keyboard
                  pattern="[0-9]*" // Allow only numbers
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  disabled={isLoading} // Disable inputs when verifying
                />
              ))}
            </div>

            {/* Display verification error */}
            {error && (
              <p className="text-sm text-red-600 text-center mb-4">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || otp.join("").length !== 4}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center pt-4">
           {/* Display resend feedback */}
           {resendMessage && (
             <p className={`text-sm mb-2 ${resendMessage.includes('failed') || resendMessage.includes('Could not') ? 'text-red-600' : 'text-green-600'}`}>
               {resendMessage}
             </p>
           )}
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isResending} // Disable while resending
            >
              {isResending ? 'Resending...' : 'Resend'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
