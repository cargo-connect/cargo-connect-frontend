"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, BikeIcon as Motorcycle, Car, Truck, Package } from "lucide-react"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

// Define success type data
const successTypeData = {
  booking: {
    title: "Booking Successful!",
    description: "Your delivery has been booked successfully. You can track your delivery in the Track section.",
    primaryButtonText: "Track Delivery",
    primaryButtonLink: "/dashboard/track",
    secondaryButtonText: "Back to Home",
    secondaryButtonLink: "/dashboard",
    detailsTitle: "Booking Details",
  },
  shipment: {
    title: "Booking Successful!",
    description: "Your shipment has been booked successfully. You can track your shipment in the shipments tab.",
    primaryButtonText: "View Shipments",
    primaryButtonLink: "/dashboard/shipments",
    secondaryButtonText: "Back to Home",
    secondaryButtonLink: "/dashboard",
    detailsTitle: "Shipment Details",
  },
}

export default function SuccessPage({ params }: { params: { type: string } }) {
  const [vehicleType, setVehicleType] = useState<string>("motorcycle")
  const successType = params.type

  // Validate success type
  useEffect(() => {
    if (!["booking", "shipment"].includes(successType)) {
      notFound()
    }

    // Get the selected vehicle type from session storage for booking success
    if (successType === "booking") {
      const storedVehicleType = sessionStorage.getItem("selectedVehicleType")
      if (storedVehicleType && ["motorcycle", "car", "van"].includes(storedVehicleType)) {
        setVehicleType(storedVehicleType)
      }
    }
  }, [successType])

  // If invalid success type, this will be caught by the useEffect
  if (!successTypeData[successType as keyof typeof successTypeData]) {
    return null
  }

  const {
    title,
    description,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    detailsTitle,
  } = successTypeData[successType as keyof typeof successTypeData]

  // Pre-filled sender and receiver details
  const senderDetails = {
    name: "Favour",
    phone: "08123456789",
  }

  const receiverDetails = {
    name: "Joy",
    phone: "08198765432",
  }

  // Get the vehicle icon component for booking success
  const VehicleIcon =
    successType === "booking" ? vehicleData[vehicleType as keyof typeof vehicleData]?.icon || Motorcycle : Package

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <CheckCircle className="w-16 h-16 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">{description}</p>

      <Card className="mb-8 w-full max-w-md">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">{detailsTitle}</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-500">Tracking ID</p>
              <p className="font-medium">CC-98765</p>
            </div>

            {successType === "booking" && (
              <div className="flex justify-between">
                <p className="text-gray-500">Delivery Mode</p>
                <div className="flex items-center">
                  <VehicleIcon className="w-4 h-4 mr-1 text-primary" />
                  <p className="font-medium">
                    {successType === "booking"
                      ? vehicleData[vehicleType as keyof typeof vehicleData]?.title || "Motorcycle"
                      : "Standard"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <p className="text-gray-500">Estimated Delivery</p>
              <p className="font-medium">Today, 4:30 PM</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Sender</p>
              <p className="font-medium">{senderDetails.name}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Receiver</p>
              <p className="font-medium">{receiverDetails.name}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Payment Method</p>
              <p className="font-medium">Payment on delivery</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Amount</p>
              <p className="font-medium">₦4,500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button asChild>
          <Link href={primaryButtonLink}>{primaryButtonText}</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
        </Button>
      </div>
    </div>
  )
}

