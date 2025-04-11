import Link from "next/link"
import { BikeIcon as Motorcycle, Car, Truck, Gift, AlertCircle } from "lucide-react" // Added AlertCircle
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Added Badge

// Define interfaces for fetched data
interface UserProfile {
  name: string;
  // other fields if needed
}

interface RecentDelivery {
  id: string;
  type: "motorcycle" | "car" | "van";
  status: "In Transit" | "Completed" | "Pending" | "Cancelled";
  destination: string;
  date: string;
}

interface DashboardData {
  userProfile: UserProfile;
  recentDeliveries: RecentDelivery[];
}

// Function to fetch dashboard data (simulated)
async function getDashboardData(): Promise<DashboardData> {
    // --- Placeholder for actual API calls ---
    console.log("Fetching dashboard data...");
    // const profilePromise = fetch('/api/user/profile', { cache: 'no-store' });
    // const deliveriesPromise = fetch('/api/deliveries?limit=2&sort=recent', { cache: 'no-store' }); // Example query
    //
    // const [profileRes, deliveriesRes] = await Promise.all([profilePromise, deliveriesPromise]);
    //
    // if (!profileRes.ok) throw new Error('Failed to load user profile');
    // if (!deliveriesRes.ok) throw new Error('Failed to load recent deliveries');
    //
    // const profileData = await profileRes.json();
    // const deliveriesData = await deliveriesRes.json();
    //
    // return {
    //   userProfile: profileData.profile, // Assuming API structure
    //   recentDeliveries: deliveriesData.deliveries, // Assuming API structure
    // };
    // --- End Placeholder ---

    // Simulate API delay and data
    await new Promise(resolve => setTimeout(resolve, 500));
    const simulatedData: DashboardData = {
        userProfile: { name: "Joy" },
        recentDeliveries: [
            { id: "1", type: "motorcycle", status: "In Transit", destination: "Lekki Phase 1, Lagos", date: "15th Mar, 2025" },
            { id: "2", type: "car", status: "Completed", destination: "No45, ABC road, Port Harcourt", date: "14th Mar, 2025" },
        ]
    };
    // Simulate fetch error:
    // throw new Error("Simulated dashboard data fetch error.");

    return simulatedData;
}

// Helper to determine badge variant based on status
const getBadgeVariant = (status: RecentDelivery['status']) => {
    switch (status) {
      case "Completed": return "success";
      case "In Transit": return "primary";
      case "Pending": return "default";
      case "Cancelled": return "danger";
      default: return "default";
    }
};

// Make the component async
export default async function Dashboard() {

  let dashboardData: DashboardData | null = null;
  let fetchError: string | null = null;

  try {
    dashboardData = await getDashboardData();
  } catch (error: any) {
    console.error("Dashboard page fetch error:", error);
    fetchError = error.message || "Could not load dashboard data.";
  }

  const userName = dashboardData?.userProfile?.name || "User"; // Fallback name
  const recentDeliveries = dashboardData?.recentDeliveries || [];

  return (
    <div className="space-y-8 p-6">
      {/* Greeting */}
      <h2 className="text-2xl font-semibold">Hi {userName}, Ready to make a delivery?</h2>

      {/* Delivery Type Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select delivery type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Motorcycle */}
          <Link href="/dashboard/book/motorcycle" className="block">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <h4 className="font-medium mb-1">Motorcycle</h4>
                <p className="text-sm text-gray-500 mb-4">Small packages</p>
                <Motorcycle className="w-10 h-10" />
              </CardContent>
            </Card>
          </Link>
          {/* Car */}
          <Link href="/dashboard/book/car" className="block">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <h4 className="font-medium mb-1">Car</h4>
                <p className="text-sm text-gray-500 mb-4">Medium packages</p>
                <Car className="w-10 h-10" />
              </CardContent>
            </Card>
          </Link>
          {/* Van */}
          <Link href="/dashboard/book/van" className="block">
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
          {/* Consider making promo dynamic if fetched */}
          <p className="text-xl font-bold">Get N500 off your first ride! Use code: WELCOME500</p>
        </div>
      </div>

      {/* Delivery History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Delivery History</h3>
          <Link href="/dashboard/history" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>

        {/* Error Display */}
        {fetchError && (
           <div className="flex items-center justify-center p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
             <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
             <span>{fetchError}</span>
          </div>
        )}

        {/* Recent Deliveries List or Empty State */}
        {!fetchError && recentDeliveries.length === 0 && (
           <div className="text-center p-6 bg-gray-50 border rounded-lg text-gray-500">
             No recent deliveries found.
           </div>
        )}

        {!fetchError && recentDeliveries.length > 0 && (
          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <Link key={delivery.id} href={`/dashboard/shipments/${delivery.id}`} className="block">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="flex items-start p-4 gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {delivery.type === "motorcycle" && <Motorcycle className="w-6 h-6 text-primary" />}
                      {delivery.type === "car" && <Car className="w-6 h-6 text-primary" />}
                      {delivery.type === "van" && <Truck className="w-6 h-6 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                             {delivery.status}
                             <Badge variant={getBadgeVariant(delivery.status)} className="text-xs">
                                {delivery.status}
                             </Badge>
                          </h4>
                          <p className="text-sm text-gray-500 truncate" title={`Delivery to ${delivery.destination}`}>
                             Delivery to {delivery.destination}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 whitespace-nowrap pl-2">{delivery.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
