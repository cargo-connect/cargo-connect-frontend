"use client"

import { useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic" // Import dynamic
import { Phone, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Dynamically import MapboxMap with SSR disabled
const MapboxMap = dynamic(() => import("@/components/ui/map").then((mod) => mod.MapboxMap), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading indicator
})

export default function TrackPage() {
  const [activeStep, setActiveStep] = useState(1) // 0: Pickup, 1: En Route, 2: Delivered

  // Sample tracking data - in a real app, this would come from your backend
  const trackingData = {
    rider: {
      name: "Chidera",
      phone: "+2349876543211",
      location: {
        latitude: 6.5244,
        longitude: 3.3792,
      },
    },
    delivery: {
      pickup: {
        address: "Satelite town, Amuwo Odofin",
        location: {
          latitude: 6.515,
          longitude: 3.36,
        },
      },
      destination: {
        address: "Festac town, Amuwo Odofin",
        location: {
          latitude: 6.4698,
          longitude: 3.2847,
        },
      },
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

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Left side - Tracking info */}
      <div className="w-full md:w-[400px] p-4 md:p-6 border-b md:border-r md:border-b-0">
        {/* Contact Rider */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Rider</h2>

          <div className="flex items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-3 md:mr-4">
              <Image
                src="/images/rider-avatar.png"
                alt="Rider Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-medium">{trackingData.rider.name}</h3>
              <p className="text-sm md:text-base text-gray-500">{trackingData.rider.phone}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 p-0">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 p-0">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <Card className="bg-gray-50">
          <CardContent className="p-4 md:p-6">
            <div className="relative">
              {/* Pickup Confirmed */}
              <div className="flex mb-6 md:mb-8">
                <div className="relative">
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center z-10 ${
                      activeStep >= 0 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    {activeStep >= 0 && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>}
                  </div>
                  {/* Vertical line */}
                  <div className="absolute top-5 md:top-6 left-2.5 md:left-3 w-0.5 h-12 md:h-16 bg-gray-300 -z-10"></div>
                </div>

                <div className="ml-3 md:ml-4">
                  <h3 className="font-medium">Pickup Confirmed</h3>
                  <p className="text-sm text-gray-500">Package has been picked up by rider</p>
                </div>
              </div>

              {/* En Route */}
              <div className="flex mb-6 md:mb-8">
                <div className="relative">
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center z-10 ${
                      activeStep >= 1 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    {activeStep >= 1 && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>}
                  </div>
                  {/* Vertical line */}
                  <div className="absolute top-5 md:top-6 left-2.5 md:left-3 w-0.5 h-12 md:h-16 bg-gray-300 -z-10"></div>
                </div>

                <div className="ml-3 md:ml-4">
                  <h3 className="font-medium">En Route</h3>
                  <p className="text-sm text-gray-500">Rider is on her way</p>
                </div>
              </div>

              {/* Delivered */}
              <div className="flex">
                <div>
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
                      activeStep >= 2 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    {activeStep >= 2 && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>}
                  </div>
                </div>

                <div className="ml-3 md:ml-4">
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-sm text-gray-500">Package has been delivered</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Map */}
      <div className="flex-1 h-[300px] md:h-auto">
        <MapboxMap
          initialViewState={{
            longitude: trackingData.rider.location.longitude,
            latitude: trackingData.rider.location.latitude,
            zoom: 12,
          }}
          markers={[
            // Rider marker
            {
              longitude: trackingData.rider.location.longitude,
              latitude: trackingData.rider.location.latitude,
              color: "#3b82f6", // Primary blue
              title: "Rider Location",
            },
            // Pickup marker
            {
              longitude: trackingData.delivery.pickup.location.longitude,
              latitude: trackingData.delivery.pickup.location.latitude,
              color: "#10B981", // Green
              title: "Pickup Location",
            },
            // Destination marker
            {
              longitude: trackingData.delivery.destination.location.longitude,
              latitude: trackingData.delivery.destination.location.latitude,
              color: "#EF4444", // Red
              title: "Destination",
            },
          ]}
          routeCoordinates={trackingData.route}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  )
}
