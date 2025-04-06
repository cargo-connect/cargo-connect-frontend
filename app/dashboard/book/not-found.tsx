import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BookingNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Invalid Vehicle Type</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The vehicle type you requested is not available. Please select from one of our available options.
      </p>

      <Link href="/dashboard" className="flex items-center text-primary hover:underline">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  )
}

