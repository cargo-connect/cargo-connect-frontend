import { BikeIcon as Motorcycle, Car, ArrowRight, AlertCircle } from "lucide-react" // Added AlertCircle
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define an interface for the delivery data structure
interface Delivery {
  id: string;
  type: "motorcycle" | "car" | "van"; // Assuming 'van' might be possible too
  status: "In Transit" | "Completed" | "Pending" | "Cancelled"; // Example statuses
  origin: string;
  destination: string;
  date: string; // Consider using Date objects if more manipulation is needed
  time: string;
  trackingId: string;
}

// Function to fetch deliveries (simulated)
async function getDeliveries(): Promise<Delivery[]> {
    // --- Placeholder for actual API call ---
    console.log("Fetching delivery history...");
    // const response = await fetch('http://localhost:3000/api/deliveries', { // Use absolute URL for server components or configure fetch
    //   cache: 'no-store', // Ensure fresh data on each request
    // });
    // if (!response.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch delivery history');
    // }
    // const data = await response.json();
    // return data.deliveries; // Assuming API returns { deliveries: [...] }
    // --- End Placeholder ---

    // Simulate API delay and data
    await new Promise(resolve => setTimeout(resolve, 1000));
    const simulatedDeliveries: Delivery[] = [
      {
        id: "1",
        type: "motorcycle",
        status: "In Transit",
        origin: "Satelite town, Amuwo Odofin",
        destination: "Festac town, Amuwo Odofin",
        date: "15th Mar, 2025",
        time: "14:30",
        trackingId: "CC-12345",
      },
      {
        id: "2",
        type: "motorcycle",
        status: "Completed",
        origin: "Lekki Phase 1",
        destination: "Victoria Island, Lagos",
        date: "12th Mar, 2025",
        time: "10:15",
        trackingId: "CC-67890",
      },
      {
        id: "3",
        type: "car",
        status: "Completed",
        origin: "Ikeja",
        destination: "Yaba, Lagos",
        date: "10th Mar, 2025",
        time: "16:45",
        trackingId: "CC-24680",
      },
       {
        id: "4",
        type: "van",
        status: "Pending",
        origin: "Surulere",
        destination: "Apapa",
        date: "16th Mar, 2025",
        time: "09:00",
        trackingId: "CC-11223",
      },
    ];
    // Simulate potential fetch error:
    // throw new Error("Simulated fetch error for delivery history.");

    return simulatedDeliveries;
}


// Make the component async to fetch data
export default async function HistoryPage() {

  let deliveries: Delivery[] = [];
  let fetchError: string | null = null;

  try {
    deliveries = await getDeliveries();
  } catch (error: any) {
    console.error("History page fetch error:", error);
    fetchError = error.message || "Could not load delivery history.";
  }

  // Helper to determine badge variant based on status
  const getBadgeVariant = (status: Delivery['status']) => {
    switch (status) {
      case "Completed": return "success";
      case "In Transit": return "primary";
      case "Pending": return "default"; // Changed from secondary
      case "Cancelled": return "danger"; // Changed from destructive
      default: return "default"; // Changed from secondary
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Delivery History</h1>

      {fetchError && (
        <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
           <AlertCircle className="w-5 h-5 mr-2" />
           <span>{fetchError}</span>
        </div>
      )}

      {!fetchError && deliveries.length === 0 && (
         <div className="text-center p-6 bg-gray-50 border rounded-lg text-gray-500">
           You have no past deliveries yet.
         </div>
      )}

      {!fetchError && deliveries.length > 0 && (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            // Link to tracking page with ID query parameter
            <Link key={delivery.id} href={`/dashboard/track?id=${delivery.trackingId}`} className="block">
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {delivery.type === "motorcycle" && <Motorcycle className="w-6 h-6 text-primary" />}
                      {delivery.type === "car" && <Car className="w-6 h-6 text-primary" />}
                      {delivery.type === "van" && <Car className="w-6 h-6 text-primary" />} {/* Assuming Van uses Car icon for now */}
                    </div>

                    {/* Details */}
                    <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                       {/* Status & Route */}
                       <div className="col-span-2">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium mr-2">{delivery.status}</h3>
                            <Badge variant={getBadgeVariant(delivery.status)}>
                              {delivery.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 flex-wrap">
                            <span className="truncate" title={delivery.origin}>{delivery.origin}</span>
                            <ArrowRight className="w-3 h-3 mx-1 shrink-0" />
                            <span className="truncate" title={delivery.destination}>{delivery.destination}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">ID: {delivery.trackingId}</p>
                       </div>

                       {/* Date & Time */}
                       <div className="text-right text-sm text-gray-500">
                          <p>{delivery.date}</p>
                          <p>{delivery.time}</p>
                          {/* Removed button, whole card is link */}
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
