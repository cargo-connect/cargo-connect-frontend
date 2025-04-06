import Link from "next/link"
import { BikeIcon as Motorcycle, Car, Truck, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Greeting */}
      <h2 className="text-2xl font-semibold">Hi Joy, Ready to make a delivery?</h2>

      {/* Delivery Type Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select delivery type</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Motorcycle */}
          <Link href="/dashboard/book/motorcycle">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <h4 className="font-medium mb-1">Motorcycle</h4>
                <p className="text-sm text-gray-500 mb-4">Small packages</p>
                <Motorcycle className="w-10 h-10" />
              </CardContent>
            </Card>
          </Link>

          {/* Car */}
          <Link href="/dashboard/book/car">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <h4 className="font-medium mb-1">Car</h4>
                <p className="text-sm text-gray-500 mb-4">Medium packages</p>
                <Car className="w-10 h-10" />
              </CardContent>
            </Card>
          </Link>

          {/* Van */}
          <Link href="/dashboard/book/van">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <h4 className="font-medium mb-1">Van</h4>
                <p className="text-sm text-gray-500 mb-4">Large packages</p>
                <Truck className="w-10 h-10" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-pink-500 text-white p-6 rounded-lg flex items-center">
        <div className="mr-4">
          <Gift className="w-12 h-12" />
        </div>
        <div>
          <p className="text-xl font-bold">Get N500 off your first ride! Use code: WELCOME500</p>
        </div>
      </div>

      {/* Delivery History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Delivery History</h3>
          <Link href="/dashboard/history" className="text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {/* In Transit Delivery */}
          <Card className="border-b">
            <CardContent className="flex items-start p-4">
              <div className="bg-primary/10 p-2 rounded-lg mr-4">
                <Motorcycle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">In Transit</h4>
                    <p className="text-sm text-gray-500">Delivery to Lekki Phase 1, Lagos</p>
                  </div>
                  <p className="text-sm text-gray-500">15th Mar, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Delivery */}
          <Card>
            <CardContent className="flex items-start p-4">
              <div className="bg-primary/10 p-2 rounded-lg mr-4">
                <Motorcycle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Completed</h4>
                    <p className="text-sm text-gray-500">Delivery to No45, ABC road, Port Harcourt</p>
                  </div>
                  <p className="text-sm text-gray-500">15th Mar, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

