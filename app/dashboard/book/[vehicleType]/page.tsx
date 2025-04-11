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
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100"><p>Loading map...</p></div>, // Optional loading indicator
})

// Define vehicle-specific data
const vehicleData = {
  motorcycle: {
    title: "Motorcycle Delivery",
    description: "Small packages",
    price: "4,500", // Note: Price might need to be fetched/calculated via API
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

  // State for form data and UI
  const [packageType, setPackageType] = useState<string | null>(null)
  const [isFragile, setIsFragile] = useState(false)
  const [formData, setFormData] = useState({
    pickupAddress: "Satelite town, Amuwo Odofin", // Placeholder - might come from user profile or input
    deliveryAddress: "Festac town, Amuwo Odofin", // Placeholder
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    otherSpecify: "",
  })

  // State for API interaction
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if vehicle type is valid
  useEffect(() => {
    if (!validVehicleTypes.includes(vehicleType)) {
      notFound()
    }
  }, [vehicleType])

  // Sample location data - in a real app, this would be geocoded from addresses
  const locationData = {
    pickup: { longitude: 3.36, latitude: 6.515 },
    delivery: { longitude: 3.2847, latitude: 6.4698 },
    route: [
      [3.36, 6.515], [3.35, 6.51], [3.34, 6.5], [3.33, 6.49], [3.32, 6.48], [3.2847, 6.4698],
    ] as Array<[number, number]>,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Updated handleSubmit for API integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Basic validation
    if (!packageType && !formData.otherSpecify) {
        setError("Please select a package type or specify 'Other'.");
        setIsLoading(false);
        return;
    }
     if (!formData.senderName || !formData.senderPhone || !formData.receiverName || !formData.receiverPhone) {
        setError("Please fill in all sender and receiver details.");
        setIsLoading(false);
        return;
    }

    const bookingDetails = {
        vehicleType: vehicleType,
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
        packageType: packageType === 'other' ? formData.otherSpecify : packageType,
        isFragile: isFragile,
        senderDetails: {
            name: formData.senderName,
            phone: formData.senderPhone,
        },
        receiverDetails: {
            name: formData.receiverName,
            phone: formData.receiverPhone,
        },
        // paymentMethod: "delivery" // Assuming this is fixed for now
    };

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to create booking with:", bookingDetails)
      // const response = await fetch('/api/deliveries', { // Or /api/booking/confirm
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingDetails),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Booking failed');
      // }
      // console.log('Booking successful:', result);
      // // Store actual booking ID or details if needed for confirmation page
      // sessionStorage.setItem("bookingId", result.deliveryId);
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      const simulatedSuccess = true; // Simulate success

      if (!simulatedSuccess) {
        throw new Error("Failed to create booking. Please try again."); // Simulate failure
      }

      // Store the vehicle type in session storage for the confirmation page (keep this)
      sessionStorage.setItem("selectedVehicleType", vehicleType);
      // Optionally store other simulated data if confirmation page needs it
      sessionStorage.setItem("simulatedBookingPrice", currentVehicleData?.price || "N/A");


      // Redirect on success
      router.push("/dashboard/book/confirmation")

    } catch (err: any) {
      console.error('Booking submission error:', err)
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const packageTypes = [
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "clothings", label: "Clothings", icon: "👕" },
    { id: "electronics", label: "Electronics", icon: "📱" },
    { id: "gifts", label: "Gifts", icon: "🎁" },
    { id: "beauty", label: "Beauty", icon: "💄" },
    { id: "accessories", label: "Accessories", icon: "👜" },
    { id: "other", label: "Other", icon: "❓" }, // Added 'Other' option
  ]

  // Get current vehicle data safely
  const currentVehicleData = vehicleData[vehicleType as keyof typeof vehicleData];

  // If vehicle type is invalid (redundant due to useEffect but safe)
  if (!currentVehicleData) {
    // useEffect should have already triggered notFound()
    return null;
  }

  const { title, price } = currentVehicleData;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center text-gray-600 mb-6 hover:text-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back To Dashboard</span>
        </Link>

        <h2 className="text-2xl font-semibold mb-2">Book a {title}</h2>
        <h3 className="text-gray-500 mb-6">Address Details</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Details */}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-4">
              {/* Pickup Address */}
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 shrink-0"></div>
                <span className="text-sm text-gray-500 w-24 shrink-0">Pick up from</span>
                <div className="flex-1 flex justify-between items-center min-w-0">
                  <span className="truncate" title={formData.pickupAddress}>{formData.pickupAddress}</span>
                  {/* TODO: Add button/link to change address */}
                  {/* <Button variant="ghost" size="sm" className="ml-2" disabled={isLoading}>Change</Button> */}
                </div>
              </div>

              <div className="border-l-2 border-dashed border-gray-300 h-4 ml-1"></div>

              {/* Delivery Address */}
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 shrink-0"></div>
                <span className="text-sm text-gray-500 w-24 shrink-0">Deliver to</span>
                 <div className="flex-1 flex justify-between items-center min-w-0">
                  <span className="truncate" title={formData.deliveryAddress}>{formData.deliveryAddress}</span>
                   {/* TODO: Add button/link to change address */}
                  {/* <Button variant="ghost" size="sm" className="ml-2" disabled={isLoading}>Change</Button> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estimated Price */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Estimated price:</span>
            <span className="font-bold text-lg">₦ {price}</span>
          </div>

          {/* Package Type */}
          <div>
            <h3 className="font-medium mb-4">What are you sending?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {packageTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={packageType === type.id ? "primary" : "outline"}
                  className="flex items-center justify-center gap-2"
                  onClick={() => setPackageType(type.id)}
                  disabled={isLoading}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Other Specify */}
          {(packageType === 'other') && (
            <FormField label="Specify Package Type" htmlFor="otherSpecify">
                <Textarea
                    id="otherSpecify"
                    name="otherSpecify"
                    value={formData.otherSpecify}
                    onChange={handleChange}
                    placeholder="Please specify the package type"
                    rows={2}
                    required={packageType === 'other'}
                    disabled={isLoading}
                />
            </FormField>
          )}


          {/* Fragile Item */}
          <div className="flex items-center">
            <button
              type="button"
              role="checkbox"
              aria-checked={isFragile}
              onClick={() => setIsFragile(!isFragile)}
              disabled={isLoading}
              className={`w-5 h-5 border rounded flex items-center justify-center mr-2 cursor-pointer transition-colors ${
                isFragile ? "bg-primary border-primary" : "border-gray-300 hover:border-gray-400"
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isFragile && <Check className="w-4 h-4 text-white" />}
            </button>
            <label
              className={`cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && setIsFragile(!isFragile)}
            >
              Fragile item
            </label>
          </div>

          {/* Sender and Receiver Details */}
          <div>
            <h3 className="font-medium mb-4">Enter Sender and Receiver's Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Sender's Name" htmlFor="senderName">
                <Input type="text" id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} placeholder="Favour" required disabled={isLoading} />
              </FormField>
              <FormField label="Receiver's Name" htmlFor="receiverName">
                <Input type="text" id="receiverName" name="receiverName" value={formData.receiverName} onChange={handleChange} placeholder="Joy" required disabled={isLoading} />
              </FormField>
              <FormField label="Sender's phone number" htmlFor="senderPhone">
                <Input type="tel" id="senderPhone" name="senderPhone" value={formData.senderPhone} onChange={handleChange} placeholder="08123456789" required disabled={isLoading} />
              </FormField>
              <FormField label="Receiver's phone number" htmlFor="receiverPhone">
                <Input type="tel" id="receiverPhone" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} placeholder="08198765432" required disabled={isLoading} />
              </FormField>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className={`flex items-center p-3 border rounded-lg ${isLoading ? 'opacity-50' : ''}`}>
              <div className="w-4 h-4 border-2 border-primary rounded-full flex items-center justify-center mr-3 shrink-0">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-xl">💵</span>
                <span>Payment on delivery</span>
              </div>
            </div>
            <p className={`text-sm text-gray-500 mt-2 ml-7 ${isLoading ? 'opacity-50' : ''}`}>Pay rider when your item is picked up or delivered</p>
          </div>

          {/* Display Error */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing Booking...' : 'Continue'}
          </Button>
        </form>
      </div>

      {/* Right side - Map */}
      <div className="hidden md:block md:w-1/2 h-full">
        <MapboxMap
          markers={[
            { longitude: locationData.pickup.longitude, latitude: locationData.pickup.latitude, color: "#10B981", title: "Pickup" },
            { longitude: locationData.delivery.longitude, latitude: locationData.delivery.latitude, color: "#EF4444", title: "Delivery" },
          ]}
          routeCoordinates={locationData.route}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  )
}
