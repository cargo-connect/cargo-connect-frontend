import { BikeIcon as Motorcycle, Car, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const deliveries = [
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
  ]

  return (
    <div className="p-6">
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <Link key={delivery.id} href={`/dashboard/track?id=${delivery.id}`}>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-lg mr-4">
                    {delivery.type === "motorcycle" ? (
                      <Motorcycle className="w-6 h-6 text-primary" />
                    ) : (
                      <Car className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{delivery.status}</h3>
                          <Badge variant={delivery.status === "Completed" ? "success" : "primary"} className="ml-2">
                            {delivery.status}
                          </Badge>
                        </div>

                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span>{delivery.origin}</span>
                          <ArrowRight className="w-3 h-3 mx-1" />
                          <span>{delivery.destination}</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">Tracking ID: {delivery.trackingId}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">{delivery.date}</p>
                        <p className="text-sm text-gray-500">{delivery.time}</p>
                        <button className="text-sm font-medium text-primary mt-1">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

