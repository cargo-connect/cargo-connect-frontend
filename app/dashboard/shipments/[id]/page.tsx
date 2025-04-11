"use client"

import { useState, useEffect } from "react" // Added useEffect
import { ArrowLeft, MapPin, Calendar, Clock, AlertCircle } from "lucide-react" // Added AlertCircle
import Link from "next/link"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// Dynamically import MapboxMap with SSR disabled
const MapboxMap = dynamic(() => import("@/components/ui/map").then((mod) => mod.MapboxMap), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100"><p>Loading map...</p></div>,
})

// Define interfaces for the data structures
interface TrackingEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
}

interface ShipmentLocation {
  longitude: number;
  latitude: number;
}

interface ShipmentData {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Pending" | "Cancelled"; // Example statuses
  date: string;
  time: string;
  carrier: string;
  weight: string;
  dimensions: string;
  service: string;
  estimatedDelivery: string;
  locations: {
    origin: ShipmentLocation;
    destination: ShipmentLocation;
    route: Array<[number, number]>; // Array of [lon, lat] tuples
  };
  trackingEvents: TrackingEvent[];
}


export default function ShipmentDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details")
  const [shipment, setShipment] = useState<ShipmentData | null>(null) // State for fetched data
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state

  // Fetch shipment details based on ID
  useEffect(() => {
    const fetchShipmentDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // --- Placeholder for actual API call ---
        console.log(`Fetching shipment details for ID: ${params.id}`)
        // const response = await fetch(`/api/shipments/${params.id}`); // Adjust endpoint if needed
        // if (!response.ok) {
        //   if (response.status === 404) {
        //      throw new Error('Shipment not found');
        //   }
        //   throw new Error('Failed to fetch shipment details');
        // }
        // const data = await response.json();
        // setShipment(data.shipment); // Assuming API returns { shipment: {...} }
        // --- End Placeholder ---

        // Simulate API delay and data
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate "Not Found"
        // if (params.id === 'not-found') {
        //    throw new Error("Shipment not found (Simulated 404)");
        // }
        const simulatedShipment: ShipmentData = {
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
          locations: {
            origin: { longitude: -74.006, latitude: 40.7128 },
            destination: { longitude: -71.0589, latitude: 42.3601 },
            route: [ [-74.006, 40.7128], [-73.5, 41.0], [-72.5, 41.5], [-71.0589, 42.3601] ],
          },
          trackingEvents: [
            { status: "Order Placed", location: "New York, NY", date: "2023-04-14", time: "09:30", completed: true },
            { status: "Picked Up", location: "New York, NY", date: "2023-04-14", time: "14:45", completed: true },
            { status: "In Transit", location: "Hartford, CT", date: "2023-04-15", time: "10:15", completed: true },
            { status: "Out for Delivery", location: "Boston, MA", date: "2023-04-18", time: "08:30", completed: false },
            { status: "Delivered", location: "Boston, MA", date: "2023-04-18", time: "14:00", completed: false },
          ],
        };
        setShipment(simulatedShipment);

      } catch (err: any) {
        console.error("Failed to fetch shipment details:", err);
        setError(err.message || "Could not load shipment details.");
      } finally {
        setIsLoading(false)
      }
    };

    if (params.id) {
      fetchShipmentDetails();
    } else {
        setError("Shipment ID is missing."); // Handle case where ID might be missing
        setIsLoading(false);
    }

  }, [params.id]); // Re-fetch if the ID changes

  // Helper to get badge variant
  const getBadgeVariant = (status: ShipmentData['status']) => {
    switch (status) {
      case "Delivered": return "success";
      case "In Transit": return "primary";
      case "Pending": return "default";
      case "Cancelled": return "danger";
      default: return "default";
    }
  };

  // --- Render Logic ---

  // Loading State
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading shipment details...
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-4">
         <div className="flex items-center mb-4">
           <Link href="/dashboard/shipments" className="mr-2 text-primary hover:underline">
             <ArrowLeft size={20} />
           </Link>
           <h1 className="text-xl font-bold text-red-600">Error</h1>
         </div>
         <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
           <AlertCircle className="w-5 h-5 mr-2" />
           <span>{error}</span>
        </div>
      </div>
    );
  }

  // Data not loaded yet (should be covered by isLoading, but good practice)
  if (!shipment) {
    return (
       <div className="p-4 text-center text-gray-500">
         Shipment data not available.
       </div>
    );
  }

  // --- Main Component Return ---
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard/shipments" className="mr-2 p-1 rounded-full hover:bg-white/10">
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
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
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
            <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
              {shipment.locations && ( // Ensure locations exist before rendering map
                 <MapboxMap
                   key={shipment.id} // Add key if map needs to re-render on shipment change
                   markers={[
                     { longitude: shipment.locations.origin.longitude, latitude: shipment.locations.origin.latitude, color: "#10B981", title: "Origin" },
                     { longitude: shipment.locations.destination.longitude, latitude: shipment.locations.destination.latitude, color: "#EF4444", title: "Destination" },
                   ]}
                   routeCoordinates={shipment.locations.route}
                   height="100%"
                   width="100%"
                 />
              )}
            </div>

            {/* Shipment info */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Shipment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Carrier</p><p className="font-medium">{shipment.carrier}</p></div>
                  <div><p className="text-sm text-gray-500">Service</p><p className="font-medium">{shipment.service}</p></div>
                  <div><p className="text-sm text-gray-500">Weight</p><p className="font-medium">{shipment.weight}</p></div>
                  <div><p className="text-sm text-gray-500">Dimensions</p><p className="font-medium">{shipment.dimensions}</p></div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Addresses</h3>
                <div className="space-y-4">
                  <div><p className="text-sm text-gray-500">From</p><p className="font-medium">{shipment.origin}</p></div>
                  <div><p className="text-sm text-gray-500">To</p><p className="font-medium">{shipment.destination}</p></div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : ( // Tracking Tab
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
                {shipment.trackingEvents && shipment.trackingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {shipment.trackingEvents.map((event, index) => (
                      <div key={index} className="flex">
                        {/* Timeline visual */}
                        <div className="mr-4 flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full border-2 ${event.completed ? "bg-primary border-primary" : "border-gray-300"}`} />
                          {index < shipment.trackingEvents.length - 1 && (
                            <div className={`w-0.5 h-full ${event.completed ? "bg-primary" : "bg-gray-300"}`} />
                          )}
                        </div>
                        {/* Event details */}
                        <div className="flex-1 pb-6 border-b border-dashed border-gray-200 last:border-none last:pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className={`font-medium ${event.completed ? "text-gray-800" : "text-gray-500"}`}>
                              {event.status}
                            </h4>
                            <p className="text-sm text-gray-500 whitespace-nowrap pl-2">
                              {event.date}, {event.time}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No tracking events available yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
