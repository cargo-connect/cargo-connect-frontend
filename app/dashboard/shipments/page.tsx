"use client"

import { useState } from "react"
import { Package, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample shipment data
const shipments = [
  {
    id: "1",
    trackingNumber: "CC-12345",
    origin: "New York, NY",
    destination: "Boston, MA",
    status: "In Transit",
    date: "2023-04-15",
    time: "14:30",
  },
  {
    id: "2",
    trackingNumber: "CC-67890",
    origin: "Los Angeles, CA",
    destination: "San Francisco, CA",
    status: "Delivered",
    date: "2023-04-10",
    time: "09:15",
  },
  {
    id: "3",
    trackingNumber: "CC-24680",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    status: "Pending",
    date: "2023-04-20",
    time: "11:45",
  },
]

export default function Shipments() {
  const [activeTab, setActiveTab] = useState("active")

  // Filter shipments based on active tab
  const filteredShipments = shipments.filter((shipment) => {
    if (activeTab === "active") {
      return shipment.status === "In Transit" || shipment.status === "Pending"
    } else {
      return shipment.status === "Delivered"
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Shipments</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <Button
          variant={activeTab === "active" ? "primary" : "ghost"}
          className={`py-2 px-4 font-medium rounded-none ${activeTab === "active" ? "border-b-2 border-primary" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </Button>
        <Button
          variant={activeTab === "completed" ? "primary" : "ghost"}
          className={`py-2 px-4 font-medium rounded-none ${
            activeTab === "completed" ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </div>

      {/* Shipment list */}
      <div className="space-y-4">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <Link key={shipment.id} href={`/dashboard/shipments/${shipment.id}`} className="block">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Package size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{shipment.trackingNumber}</h3>
                        <p className="text-sm text-gray-500">
                          {shipment.origin} to {shipment.destination}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-2">
                          <Badge
                            variant={
                              shipment.status === "Delivered"
                                ? "success"
                                : shipment.status === "In Transit"
                                  ? "primary"
                                  : "warning"
                            }
                          >
                            {shipment.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {shipment.date} • {shipment.time}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-700">No shipments found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "active"
                ? "You don't have any active shipments"
                : "You don't have any completed shipments"}
            </p>
          </div>
        )}
      </div>

      {/* Add new shipment button */}
      <div className="fixed bottom-20 right-4">
        <Button asChild className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg p-0">
          <Link href="/dashboard/shipments/new">
            <span className="text-2xl">+</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

