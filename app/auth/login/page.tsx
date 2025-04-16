"use client"

import type React from "react"

import { useState } from "react" // No need for useEffect here yet
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FormField, Input } from "@/components/ui/form" // Assuming FormField and Input are correctly defined/imported
import { Card, CardContent } from "@/components/ui/card"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const [error, setError] = useState<string | null>(null) // Added error state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: { email: string; password: string }) => ({ ...prev, [name]: value }))
  }

  // Updated handleSubmit for API integration structure
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    setIsLoading(true) // Start loading

    try {
      // --- Actual API call ---
      console.log("Attempting login with email:", formData.email) // Log email, not password

      // Use URLSearchParams for x-www-form-urlencoded
      const body = new URLSearchParams({
        username: formData.email, // Backend expects 'username'
         password: formData.password,
      })

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Fallback to empty string if not set
      const response = await fetch(`${apiBaseUrl}/api/v1/users/login`, { // Construct URL with env var
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Correct Content-Type
        },
        body: body, // Send URLSearchParams object
      });

      const result = await response.json(); // Always try to parse JSON response for potential errors

      if (!response.ok) {
        // Use error message from backend if available, otherwise provide a generic message
        throw new Error(result.detail || 'Login failed. Please check your email and password.');
      }

      console.log('Login successful, received token:', result.access_token ? '***' : 'No token'); // Don't log the actual token

      // Store the token in localStorage
      if (result.access_token) {
        // Prepending "Bearer " is common practice for Authorization header format
        localStorage.setItem('authToken', `Bearer ${result.access_token}`);
        // Redirect ONLY after successful login and token storage
        router.push("/dashboard")
      } else {
        // Handle case where login is successful (200 OK) but no token is returned
        throw new Error('Login succeeded but no token was received.');
      }

    } catch (err: any) {
      // Handle errors (from fetch or logic)
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred during login.')
    } finally {
      setIsLoading(false) // Stop loading in all cases (success or error)
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen p-6 md:p-12">
      <div className="md:hidden mb-8">
        <Image src="/images/logo.svg" alt="Cargo Connect Logo" width={180} height={45} />
      </div>

      <Card> {/* Removed className */}
        <CardContent> {/* Removed className again based on error */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Email" htmlFor="email">
              {/* Input is now a child of FormField */}
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                disabled={isLoading} // Disable input when loading
              />
            </FormField>

            <FormField label="Password" htmlFor="password">
              {/* Input and button wrapper are now children of FormField */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading} // Disable input when loading
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading} // Disable toggle when loading
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </FormField>

            {/* Display error message if it exists */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button> {/* Removed type="submit" */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
