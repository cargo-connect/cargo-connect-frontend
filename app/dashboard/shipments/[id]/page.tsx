"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapboxMap } from "@/components/ui/map"

export default function ShipmentDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details")

  // In a real app, you would fetch the shipment details based on the ID
  const shipment = {
    id: params.id,
    trackingNumber: `CC-${params.id}5678`,
    origin: "New York, NY",
    destination: "Boston, MA",
    status: "In Transit",
    date: "2023-04-15",
    time: "14:30",
    carrier: "Express Logistics",
    weight: "5.2 kg",
    dimensions: "30 x 20 x 15 cm",
    service: "Standard Delivery",
    estimatedDelivery: "2023-04-18",
    // Sample location data for the map
    locations: {
      origin: {
        longitude: -74.006,
        latitude: 40.7128,
      },
      destination: {
        longitude: -71.0589,
        latitude: 42.3601,
      },
      // Sample route coordinates (longitude, latitude pairs)
      route: [
        [-74.006, 40.7128], // New York
        [-73.5, 41.0],
        [-72.5, 41.5],
        [-71.0589, 42.3601], // Boston
      ],
    },
    trackingEvents: [
      {
        status: "Order Placed",
        location: "New York, NY",
        date: "2023-04-14",
        time: "09:30",
        completed: true,
      },
      {
        status: "Picked Up",
        location: "New York, NY",
        date: "2023-04-14",
        time: "14:45",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Hartford, CT",
        date: "2023-04-15",
        time: "10:15",
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Boston, MA",
        date: "2023-04-18",
        time: "08:30",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Boston, MA",
        date: "2023-04-18",
        time: "14:00",
        completed: false,
      },
    ],
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard/shipments" className="mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Shipment Details</h1>
        </div>

        <Card className="bg-white/10 border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">{shipment.trackingNumber}</h2>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {shipment.status}
              </Badge>
            </div>

            <div className="flex items-center text-sm mb-2">
              <MapPin size={16} className="mr-1" />
              <p>
                {shipment.origin} to {shipment.destination}
              </p>
            </div>

            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-1" />
              <p className="mr-3">{shipment.date}</p>
              <Clock size={16} className="mr-1" />
              <p>{shipment.time}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <Button
          variant={activeTab === "details" ? "primary" : "ghost"}
          className={`flex-1 py-3 font-medium rounded-none ${
            activeTab === "details" ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </Button>
        <Button
          variant={activeTab === "tracking" ? "primary" : "ghost"}
          className={`flex-1 py-3 font-medium rounded-none ${
            activeTab === "tracking" ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => setActiveTab("tracking")}
        >
          Tracking
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "details" ? (
          <div className="space-y-6">
            {/* Map */}
            <div className="h-48 rounded-lg overflow-hidden">
              <MapboxMap
                markers={[
                  // Origin marker
                  {
                    longitude: shipment.locations.origin.longitude,
                    latitude: shipment.locations.origin.latitude,
                    color: "#10B981", // Green
                    title: "Origin",
                  },
                  // Destination marker
                  {
                    longitude: shipment.locations.destination.longitude,
                    latitude: shipment.locations.destination.latitude,
                    color: "#EF4444", // Red
                    title: "Destination",
                  },
                ]}
                routeCoordinates={shipment.locations.route}
                height="100%"
                width="100%"
              />
            </div>

            {/* Shipment info */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Shipment Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Carrier</p>
                    <p className="font-medium">{shipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium">{shipment.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{shipment.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">{shipment.dimensions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Addresses</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">123 Main St</p>
                    <p className="text-sm">{shipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">456 Park Ave</p>
                    <p className="text-sm">{shipment.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Estimated delivery */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">{shipment.estimatedDelivery}</p>
              </CardContent>
            </Card>

            {/* Tracking timeline */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Tracking History</h3>

                <div className="space-y-6">
                  {shipment.trackingEvents.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${event.completed ? "bg-primary" : "bg-gray-300"}`} />
                        {index < shipment.trackingEvents.length - 1 && (
                          <div className={`w-0.5 h-full ${event.completed ? "bg-primary" : "bg-gray-300"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className={`font-medium ${event.completed ? "text-primary" : "text-gray-500"}`}>
                            {event.status}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {event.date}, {event.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

