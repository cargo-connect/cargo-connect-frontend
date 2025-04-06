"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet, BikeIcon as Motorcycle, Car, Truck, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconLabel } from "@/components/ui/icon-label"

// Define vehicle-specific data
const vehicleData = {
  motorcycle: {
    title: "Motorcycle",
    icon: Motorcycle,
  },
  car: {
    title: "Car",
    icon: Car,
  },
  van: {
    title: "Van",
    icon: Truck,
  },
}

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("delivery")
  const [vehicleType, setVehicleType] = useState<string>("motorcycle")

  // Get the selected vehicle type from session storage
  useEffect(() => {
    const storedVehicleType = sessionStorage.getItem("selectedVehicleType")
    if (storedVehicleType && ["motorcycle", "car", "van"].includes(storedVehicleType)) {
      setVehicleType(storedVehicleType)
    }
  }, [])

  // Pre-filled sender and receiver details
  const senderDetails = {
    name: "Favour",
    phone: "08123456789",
  }

  const receiverDetails = {
    name: "Joy",
    phone: "08198765432",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the payment here
    router.push("/dashboard/success/booking")
  }

  // Get the vehicle icon component
  const VehicleIcon = vehicleData[vehicleType as keyof typeof vehicleData]?.icon || Motorcycle

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href={`/dashboard/book/${vehicleType}`} className="flex items-center text-gray-600 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back</span>
      </Link>

      <h2 className="text-2xl font-semibold mb-6">Confirm Your Booking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Delivery Details</h3>

              <div className="space-y-4">
                <IconLabel
                  icon={<div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  label="Satelite town, Amuwo Odofin"
                  description="Pickup Address"
                  iconBackground={false}
                />

                <IconLabel
                  icon={<div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  label="Festac town, Amuwo Odofin"
                  description="Delivery Address"
                  iconBackground={false}
                />

                <IconLabel
                  icon={<VehicleIcon className="w-5 h-5 text-primary" />}
                  label={vehicleData[vehicleType as keyof typeof vehicleData]?.title || "Motorcycle"}
                  description="Delivery Mode"
                />

                <IconLabel
                  icon={<Clock className="w-5 h-5 text-primary" />}
                  label="Today, 4:30 PM (25 mins)"
                  description="Estimated Time of Arrival"
                />

                <IconLabel
                  icon={<span className="text-primary">📦</span>}
                  label="Electronics (Fragile)"
                  description="Package Type"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sender and Receiver Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Sender and Receiver Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sender's Name</p>
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">{senderDetails.name}</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Receiver's Name</p>
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">{receiverDetails.name}</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Sender's phone number</p>
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">{senderDetails.phone}</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Receiver's phone number</p>
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">{receiverDetails.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>

              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    paymentMethod === "delivery" ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setPaymentMethod("delivery")}
                >
                  <input
                    type="radio"
                    id="delivery"
                    name="paymentMethod"
                    checked={paymentMethod === "delivery"}
                    onChange={() => setPaymentMethod("delivery")}
                    className="mr-3"
                  />
                  <Wallet className="w-5 h-5 mr-3 text-primary" />
                  <label htmlFor="delivery" className="cursor-pointer">
                    Payment on delivery
                  </label>
                </div>

                <div
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mr-3"
                  />
                  <CreditCard className="w-5 h-5 mr-3 text-primary" />
                  <label htmlFor="card" className="cursor-pointer">
                    Credit/Debit Card
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <p className="text-gray-500">Delivery Fee</p>
                <p className="font-medium">₦4,000</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Distance (7.5 km)</p>
                <p className="font-medium">₦750</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Promo Code</p>
                <p className="font-medium text-green-600">-₦250</p>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <p className="font-medium">Total</p>
                <p className="font-bold text-lg">₦4,500</p>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Confirm & Pay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

