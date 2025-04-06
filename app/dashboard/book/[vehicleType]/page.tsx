"use client"

import type React from "react"

import { useState, useEffect, use } from "react" // Import use
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic" // Import dynamic
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormField, Input, Textarea } from "@/components/ui/form"
// Dynamically import MapboxMap with SSR disabled
const MapboxMap = dynamic(() => import("@/components/ui/map").then((mod) => mod.MapboxMap), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading indicator
})

// Define vehicle-specific data
const vehicleData = {
  motorcycle: {
    title: "Motorcycle Delivery",
    description: "Small packages",
    price: "4,500",
    icon: "🏍️",
  },
  car: {
    title: "Car Delivery",
    description: "Medium packages",
    price: "4,500",
    icon: "🚗",
  },
  van: {
    title: "Van Delivery",
    description: "Large packages",
    price: "6,500",
    icon: "🚚",
  },
}

// Valid vehicle types
const validVehicleTypes = ["motorcycle", "car", "van"]

// Update the type definition for paramsProp to be a Promise
export default function BookDeliveryPage({ params: paramsProp }: { params: Promise<{ vehicleType: string }> }) {
  const params = use(paramsProp) // Unwrap params using use()
  const router = useRouter()
  const vehicleType = params.vehicleType.toLowerCase()

  // Check if vehicle type is valid
  useEffect(() => {
    if (!validVehicleTypes.includes(vehicleType)) {
      notFound()
    }
  }, [vehicleType])

  const [packageType, setPackageType] = useState<string | null>(null)
  const [isFragile, setIsFragile] = useState(false)
  const [formData, setFormData] = useState({
    pickupAddress: "Satelite town, Amuwo Odofin",
    deliveryAddress: "Festac town, Amuwo Odofin",
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    otherSpecify: "",
  })

  // Sample location data - in a real app, this would be geocoded from addresses
  const locationData = {
    pickup: {
      longitude: 3.36,
      latitude: 6.515,
    },
    delivery: {
      longitude: 3.2847,
      latitude: 6.4698,
    },
    // Sample route coordinates (longitude, latitude pairs)
    route: [
      [3.36, 6.515], // Pickup
      [3.35, 6.51],
      [3.34, 6.5],
      [3.33, 6.49],
      [3.32, 6.48],
      [3.2847, 6.4698], // Destination
    ] as Array<[number, number]>, // Explicitly type as array of tuples
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the vehicle type in session storage for the confirmation page
    sessionStorage.setItem("selectedVehicleType", vehicleType)
    router.push("/dashboard/book/confirmation")
  }

  const packageTypes = [
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "clothings", label: "Clothings", icon: "👕" },
    { id: "electronics", label: "Electronics", icon: "📱" },
    { id: "gifts", label: "Gifts", icon: "🎁" },
    { id: "beauty", label: "Beauty", icon: "💄" },
    { id: "accessories", label: "Accessories", icon: "👜" },
  ]

  // If vehicle type is invalid, this will be caught by the useEffect
  if (!vehicleData[vehicleType as keyof typeof vehicleData]) {
    return null
  }

  const { title, price } = vehicleData[vehicleType as keyof typeof vehicleData]

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center text-gray-600 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back To Dashboard</span>
        </Link>

        <h2 className="text-2xl font-semibold mb-2">Book a {title}</h2>
        <h3 className="text-gray-500 mb-6">Address Details</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Details */}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-500 w-24">Pick up from</span>
                <div className="flex-1 flex justify-between items-center">
                  <span>{formData.pickupAddress}</span>
                  <ArrowLeft className="w-5 h-5 transform rotate-180" />
                </div>
              </div>

              <div className="border-l-2 border-dashed border-gray-300 h-4 ml-1"></div>

              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-500 w-24">Deliver to</span>
                <div className="flex-1 flex justify-between items-center">
                  <span>{formData.deliveryAddress}</span>
                  <ArrowLeft className="w-5 h-5 transform rotate-180" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Estimated price:</span>
            <span className="font-bold text-lg">₦ {price}</span>
          </div>

          {/* Package Type */}
          <div>
            <h3 className="font-medium mb-4">What are you sending?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {packageTypes.slice(0, 3).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={packageType === type.id ? "primary" : "outline"}
                  className="flex items-center justify-center gap-2"
                  onClick={() => setPackageType(type.id)}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {packageTypes.slice(3, 6).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={packageType === type.id ? "primary" : "outline"}
                  className="flex items-center justify-center gap-2"
                  onClick={() => setPackageType(type.id)}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {packageTypes.slice(6).map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={packageType === type.id ? "primary" : "outline"}
                  className="flex items-center justify-center gap-2"
                  onClick={() => setPackageType(type.id)}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Other Specify */}
          <Textarea
            name="otherSpecify"
            value={formData.otherSpecify}
            onChange={handleChange}
            placeholder="If others, specify"
            rows={2}
          />

          {/* Fragile Item */}
          <div className="flex items-center">
            <div
              className={`w-5 h-5 border rounded flex items-center justify-center mr-2 cursor-pointer ${
                isFragile ? "bg-primary border-primary" : "border-gray-300"
              }`}
              onClick={() => setIsFragile(!isFragile)}
            >
              {isFragile && <Check className="w-4 h-4 text-white" />}
            </div>
            <label className="cursor-pointer" onClick={() => setIsFragile(!isFragile)}>
              Fragile item
            </label>
          </div>

          {/* Sender and Receiver Details */}
          <div>
            <h3 className="font-medium mb-4">Enter Sender and Receiver's Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Sender's Name" htmlFor="senderName">
                <Input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="Favour"
                />
              </FormField>

              <FormField label="Receiver's Name" htmlFor="receiverName">
                <Input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="Joy"
                />
              </FormField>

              <FormField label="Sender's phone number" htmlFor="senderPhone">
                <Input
                  type="tel"
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  placeholder="08123456789"
                />
              </FormField>

              <FormField label="Receiver's phone number" htmlFor="receiverPhone">
                <Input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  placeholder="08198765432"
                />
              </FormField>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center mr-2 relative">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">💵</span>
                <span>Payment on delivery</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 ml-6">Pay rider when your item is picked up or delivered</p>
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>

      {/* Right side - Map */}
      <div className="hidden md:block w-1/2">
        <MapboxMap
          markers={[
            // Pickup marker
            {
              longitude: locationData.pickup.longitude,
              latitude: locationData.pickup.latitude,
              color: "#10B981", // Green
              title: "Pickup Location",
            },
            // Destination marker
            {
              longitude: locationData.delivery.longitude,
              latitude: locationData.delivery.latitude,
              color: "#EF4444", // Red
              title: "Destination",
            },
          ]}
          routeCoordinates={locationData.route}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  )
}
