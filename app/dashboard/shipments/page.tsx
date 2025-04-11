"use client"

import { useState, useEffect } from "react" // Added useEffect
import { Package, ChevronRight, AlertCircle } from "lucide-react" // Added AlertCircle
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Define an interface for the shipment data structure
interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Pending" | "Cancelled"; // Example statuses
  date: string; // Consider Date objects
  time: string;
}

export default function Shipments() {
  const [activeTab, setActiveTab] = useState("active")
  const [shipments, setShipments] = useState<Shipment[]>([]) // State for fetched shipments
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state

  // Fetch shipments on component mount
  useEffect(() => {
    const fetchShipments = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // --- Placeholder for actual API call ---
        console.log("Fetching shipments...")
        // const response = await fetch('/api/shipments'); // Adjust endpoint if needed
        // if (!response.ok) {
        //   throw new Error('Failed to fetch shipments');
        // }
        // const data = await response.json();
        // setShipments(data.shipments); // Assuming API returns { shipments: [...] }
        // --- End Placeholder ---

        // Simulate API delay and data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const simulatedShipments: Shipment[] = [
          { id: "1", trackingNumber: "CC-12345", origin: "New York, NY", destination: "Boston, MA", status: "In Transit", date: "2023-04-15", time: "14:30" },
          { id: "2", trackingNumber: "CC-67890", origin: "Los Angeles, CA", destination: "San Francisco, CA", status: "Delivered", date: "2023-04-10", time: "09:15" },
          { id: "3", trackingNumber: "CC-24680", origin: "Chicago, IL", destination: "Detroit, MI", status: "Pending", date: "2023-04-20", time: "11:45" },
          { id: "4", trackingNumber: "CC-98765", origin: "Miami, FL", destination: "Atlanta, GA", status: "Delivered", date: "2023-04-18", time: "16:00" },
        ];
        // Simulate fetch error:
        // throw new Error("Simulated fetch error for shipments.");
        setShipments(simulatedShipments);

      } catch (err: any) {
        console.error("Failed to fetch shipments:", err);
        setError(err.message || "Could not load shipments.");
      } finally {
        setIsLoading(false)
      }
    };

    fetchShipments();
  }, []); // Empty dependency array ensures fetch runs once on mount

  // Filter shipments based on active tab and fetched data
  const filteredShipments = shipments.filter((shipment) => {
    if (activeTab === "active") {
      // Adjust active statuses as needed
      return shipment.status === "In Transit" || shipment.status === "Pending"
    } else { // activeTab === "completed"
      // Adjust completed statuses as needed
      return shipment.status === "Delivered"
    }
  })

  // Helper to determine badge variant based on status
   const getBadgeVariant = (status: Shipment['status']) => {
    switch (status) {
      case "Delivered": return "success";
      case "In Transit": return "primary";
      case "Pending": return "default"; // Use default for pending
      case "Cancelled": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Shipments</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <Button
          variant={activeTab === "active" ? "primary" : "ghost"}
          // Removed className to avoid potential conflicts, rely on variant styles
          onClick={() => setActiveTab("active")}
          disabled={isLoading} // Disable tabs while loading
        >
          Active
        </Button>
        <Button
          variant={activeTab === "completed" ? "primary" : "ghost"}
          // Removed className
          onClick={() => setActiveTab("completed")}
          disabled={isLoading} // Disable tabs while loading
        >
          Completed
        </Button>
        {/* Add underline manually if needed */}
         <div className="flex-1 border-b border-gray-200 relative -bottom-px">
            <div className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ${activeTab === 'active' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'}`} // Adjust width/position based on button count/size
                 style={{ width: 'calc(50% - 0.5rem)', transform: activeTab === 'active' ? 'translateX(0.25rem)' : 'translateX(calc(100% + 0.25rem))' }} // Example positioning
            ></div>
         </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 text-gray-500">Loading shipments...</div>
      )}

      {/* Error State */}
      {error && !isLoading && (
         <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
           <AlertCircle className="w-5 h-5 mr-2" />
           <span>{error}</span>
        </div>
      )}

      {/* Shipment list or Empty State */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {filteredShipments.length > 0 ? (
            filteredShipments.map((shipment) => (
              <Link key={shipment.id} href={`/dashboard/shipments/${shipment.id}`} className="block">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Package size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                       <div className="col-span-2">
                          <h3 className="font-medium truncate" title={shipment.trackingNumber}>{shipment.trackingNumber}</h3>
                          <p className="text-sm text-gray-500 truncate" title={`${shipment.origin} to ${shipment.destination}`}>
                            {shipment.origin} to {shipment.destination}
                          </p>
                       </div>
                       <div className="flex items-center justify-end gap-2">
                          <div className="text-right">
                             <Badge variant={getBadgeVariant(shipment.status)}>
                               {shipment.status}
                             </Badge>
                             <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                               {shipment.date} • {shipment.time}
                             </p>
                          </div>
                          <ChevronRight size={16} className="text-gray-400 shrink-0" />
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
      )}


      {/* Add new shipment button - Consider disabling if loading/error */}
      <div className="fixed bottom-20 right-4 z-10">
        {/* Removed Button wrapper and applied styles directly to Link */}
        <Link
          href="/dashboard/book/motorcycle" // TODO: Decide where this link should go
          aria-label="Book new shipment"
          className="bg-primary text-white hover:bg-primary/90 font-medium rounded-full w-14 h-14 flex items-center justify-center shadow-lg p-0 transition-colors" // Added button styles
        >
          <span className="text-3xl font-light">+</span>
        </Link>
      </div>
    </div>
  )
}
