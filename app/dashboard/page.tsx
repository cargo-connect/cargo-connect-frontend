import Link from "next/link"
import { BikeIcon as Motorcycle, Car, Truck, Gift, AlertCircle } from "lucide-react" // Added AlertCircle
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Added Badge

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
	await new Promise((resolve) => setTimeout(resolve, 500));
	const simulatedData: DashboardData = {
		userProfile: { name: "Joy" }, // Figma shows "David Adams", using fetched data
		recentDeliveries: [
			{
				id: "1",
				type: "motorcycle",
				status: "In Transit",
				destination: "Lekki Phase 1, Lagos",
				date: "15th Mar, 2025",
			},
			{
				id: "2",
				type: "car", // Figma shows motorcycle again, using fetched data
				status: "Completed",
				destination: "No45, ABC road, Port Harcourt",
				date: "14th Mar, 2025", // Figma shows 15th Mar, using fetched data
			},
		],
	};
	// Simulate fetch error:
	// throw new Error("Simulated dashboard data fetch error.");

	return simulatedData;
}

// Helper to determine badge variant based on status
const getBadgeVariant = (status: RecentDelivery["status"]) => {
	switch (status) {
		case "Completed":
			return "success"; // Assuming success maps to a suitable style
		case "In Transit":
			return "primary"; // Assuming primary maps to a suitable style
		case "Pending":
			return "default";
		case "Cancelled":
			return "danger"; // Assuming danger maps to a suitable style
		default:
			return "default";
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

	// Assuming Poppins font is loaded globally via layout.tsx or globals.css
	// Add 'font-poppins' class if needed, e.g., to the outer div

	return (
		// Adjusted padding and spacing to match Figma layout_AYEP8R and layout_ND6AIA etc.
		<div className="space-y-[30px] p-6 font-poppins">
			{/* Greeting - Adjusted font style to match style_3BIROE */}
			<h2 className="text-[20px] font-medium text-[#262525]">
				Hi {userName}, Ready to make a delivery?
			</h2>

			{/* Delivery Type Selection - Adjusted spacing and title style */}
			<div className="space-y-[11px]">
				{/* Adjusted font style to match style_167MBH */}
				<h3 className="text-[16px] font-medium text-[#666666]">
					Select delivery type
				</h3>
				{/* Adjusted gap to match layout_85E4ZO */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
					{/* Motorcycle - Adjusted card style to match frame 161:562 */}
					<Link href="/dashboard/book/motorcycle" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							{/* Adjusted padding and content style to match layout_123XYY */}
							<CardContent className="flex flex-col items-center justify-center p-[20px] gap-[10px] min-h-[153px]">
								{/* Adjusted text styles to match style_6T56DT and style_2EFT14 */}
								<h4 className="text-[13px] font-medium text-black">
									Motorcycle
								</h4>
								<p className="text-[8px] font-[275] text-black leading-[2em]">
									Small packages
								</p>
								{/* Kept Lucide icon, adjusted color to match Figma */}
								<Motorcycle className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
					{/* Car - Adjusted card style to match frame 161:568 */}
					<Link href="/dashboard/book/car" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							{/* Adjusted padding and content style to match layout_SXG4CW */}
							<CardContent className="flex flex-col items-center justify-center p-[20px] gap-[10px] min-h-[153px]">
								{/* Adjusted text styles */}
								<h4 className="text-[13px] font-medium text-black">Car</h4>
								<p className="text-[8px] font-[275] text-black leading-[2em]">
									Medium packages
								</p>
								{/* Kept Lucide icon, adjusted color */}
								<Car className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
					{/* Van - Adjusted card style to match frame 161:574 */}
					<Link href="/dashboard/book/van" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							{/* Adjusted padding and content style to match layout_2UHR9R */}
							<CardContent className="flex flex-col items-center justify-center p-[16px] gap-[10px] min-h-[153px]">
								{/* Adjusted text styles */}
								<h4 className="text-[13px] font-medium text-black">Van</h4>
								{/* Adjusted font weight for Van description */}
								<p className="text-[8px] font-[300] text-black leading-[2em]">
									Large packages
								</p>
								{/* Kept Lucide icon, adjusted color */}
								<Truck className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
				</div>
			</div>

			{/* Promo Banner - Adjusted style to match frame 161:446 */}
			{/* Note: Figma padding was 52px top/bottom, seems large, using p-6 for now */}
			<div className="bg-[#F9168B] text-white p-6 rounded-[10px] flex items-center justify-center gap-[13px]">
				{/* Kept Lucide icon, size adjusted slightly */}
				<Gift className="w-10 h-10" />
				{/* Adjusted text style to match style_MQMPQ9 */}
				<p className="text-[24px] font-medium leading-[1em]">
					Get N500 off your first ride! Use code: WELCOME500
				</p>
			</div>

			{/* Delivery History - Adjusted spacing and title styles */}
			<div className="space-y-[30px]"> {/* Matches Figma gap in layout_M7YQI2 */}
				{/* Adjusted style to match layout_D2DQ3Y */}
				<div className="flex items-center justify-between">
					{/* Adjusted text style to match style_MQMPQ9 */}
					<h3 className="text-[24px] font-medium text-black">
						Delivery History
					</h3>
					{/* Adjusted text style to match style_J2KVFI */}
					<Link
						href="/dashboard/history"
						className="text-[#3C74ED] hover:underline text-[20px] font-medium leading-[1.2em]"
					>
						View All
					</Link>
				</div>

				{/* Error Display - Kept existing style */}
				{fetchError && (
					<div className="flex items-center justify-center p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
						<AlertCircle className="w-5 h-5 mr-2 shrink-0" />
						<span>{fetchError}</span>
					</div>
				)}

				{/* Recent Deliveries List or Empty State - Kept existing style */}
				{!fetchError && recentDeliveries.length === 0 && (
					<div className="text-center p-6 bg-gray-50 border rounded-lg text-gray-500">
						No recent deliveries found.
					</div>
				)}

				{/* Adjusted spacing for history items */}
				{!fetchError && recentDeliveries.length > 0 && (
					<div className="space-y-[30px]"> {/* Matches Figma gap in layout_M7YQI2 */}
						{recentDeliveries.map((delivery) => (
							<Link
								key={delivery.id}
								href={`/dashboard/shipments/${delivery.id}`}
								className="block"
							>
								{/* Adjusted card style to match frame 161:456 */}
								<Card className="bg-white border border-[#F8F2F2] rounded-[10px] hover:border-primary transition-colors cursor-pointer">
									{/* Adjusted padding and gap to match layout_2DONAE and layout_L2U3RJ */}
									<CardContent className="flex items-center p-[12px] gap-[15px]">
										{/* Adjusted icon container and icon style */}
										{/* Figma shows icon directly, removing bg wrapper */}
										<div className="p-0">
											{delivery.type === "motorcycle" && (
												<Motorcycle className="w-6 h-6 text-[#3C74ED]" /> // Figma color
											)}
											{delivery.type === "car" && (
												<Car className="w-6 h-6 text-[#3C74ED]" /> // Figma color
											)}
											{delivery.type === "van" && (
												<Truck className="w-6 h-6 text-[#3C74ED]" /> // Figma color
											)}
										</div>
										{/* Adjusted layout and text styles */}
										<div className="flex-1 space-y-[20px]"> {/* Matches Figma gap in layout_MEZ5M3 */}
											{/* Adjusted layout and status text style */}
											<div className="flex justify-between items-center"> {/* Matches layout_SJOAA1 */}
												{/* Adjusted status text style to match style_UREEVC */}
												{/* Keeping Badge for clarity, but adjusting main text */}
												<h4 className="text-[20px] font-normal text-black leading-[0.8em] flex items-center gap-2">
													{delivery.status}
													<Badge
														variant={getBadgeVariant(delivery.status)}
														className="text-xs" // Keep badge small
													>
														{delivery.status}
													</Badge>
												</h4>
											</div>
											{/* Adjusted layout and destination/date text styles */}
											<div className="flex justify-between items-center"> {/* Matches layout_S1P5D7 */}
												{/* Adjusted destination text style to match style_DRM31L */}
												<p
													className="text-[14px] font-medium text-[#575757] leading-[1.14em] truncate"
													title={`Delivery to ${delivery.destination}`}
												>
													Delivery to {delivery.destination}
												</p>
												{/* Adjusted date text style to match style_SHYYZI */}
												<p className="text-[10px] font-normal text-[#212121] leading-[1.6em] whitespace-nowrap pl-2">
													{delivery.date}
												</p>
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
	);
}
