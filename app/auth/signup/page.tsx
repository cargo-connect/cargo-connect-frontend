"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FormField, Input } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const [error, setError] = useState<string | null>(null) // Added error state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    // Explicitly type 'prev' to avoid implicit any
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Updated handleSubmit for API integration structure
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit triggered!"); // Add console log for debugging
    e.preventDefault()
    setError(null) // Clear previous errors
    setIsLoading(true) // Start loading

    // Basic validation example (can be expanded)
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms and Conditions.");
      setIsLoading(false);
      return;
    }

    try {
      // --- Actual API call ---
      console.log("Attempting signup for email:", formData.email)

      // Prepare JSON body, mapping frontend camelCase to backend snake_case if necessary
      const body = JSON.stringify({
         full_name: formData.fullName, // Match backend schema
         email: formData.email,
         phone_number: formData.phone, // Include phone number and match backend schema key
         password: formData.password
      })

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Fallback to empty string if not set
      const response = await fetch(`${apiBaseUrl}/api/v1/users/register`, { // Construct URL with env var
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const result = await response.json(); // Try to parse JSON response even on error

      if (!response.ok) {
        // Handle validation errors (422) or other errors
        let errorMessage = 'Signup failed. Please check your details and try again.';
        if (response.status === 422 && result.detail) {
          // Try to format FastAPI validation errors
          if (Array.isArray(result.detail)) {
            errorMessage = result.detail.map((e: any) => `${e.loc?.join('.')} - ${e.msg}`).join('; ');
          } else if (typeof result.detail === 'string') {
            errorMessage = result.detail;
          }
        } else if (result.detail) {
           // Handle other errors with a detail message
           errorMessage = result.detail;
        }
        throw new Error(errorMessage);
      }

      console.log('Signup successful:', result);

      // Redirect ONLY after successful signup
      router.push("/auth/verification") // Redirect to the updated verification page

    } catch (err: any) {
      // Handle errors (from fetch or logic)
      console.error('Signup error:', err);
      // Ensure we always set a string message to the error state
      let displayError = 'An unexpected error occurred during signup.';
      if (err instanceof Error) {
        displayError = err.message;
      } else if (typeof err === 'string') { // Handle cases where a string might be thrown
        displayError = err;
      }
      setError(displayError);
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen p-6 md:p-12">
      <div className="md:hidden mb-8">
        <Image src="/images/logo.svg" alt="Cargo Connect Logo" width={180} height={45} />
      </div>

      <Card> {/* Assuming className is not a valid prop based on previous errors */}
        <CardContent> {/* Assuming className is not a valid prop */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField label="Full Name" htmlFor="fullName">
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Email Address" htmlFor="email">
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Phone Number" htmlFor="phone">
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Password" htmlFor="password">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </FormField>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className={`text-gray-700 ${isLoading ? 'opacity-50' : ''}`}>
                  I agree to the{" "}
                  <Link href="/terms" className={`text-primary hover:underline ${isLoading ? 'pointer-events-none' : ''}`}>
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            {/* Display error message if it exists */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
