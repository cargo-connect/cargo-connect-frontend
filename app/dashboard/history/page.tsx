import {
	BikeIcon as Motorcycle,
	Car,
	Truck, // Add Truck icon
	ArrowRight,
	AlertCircle,
	ArrowLeft, // Add ArrowLeft for back button
} from "lucide-react"; // Added AlertCircle, ArrowLeft, Truck
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"; // Badge removed as per Figma

// Define an interface for the delivery data structure
interface Delivery {
	id: string;
	type: "motorcycle" | "car" | "van"; // Assuming 'van' might be possible too
	status: "In Transit" | "Completed" | "Pending" | "Cancelled"; // Example statuses
	origin: string; // Keep for potential future use, though not displayed per Figma
	destination: string;
	date: string; // Consider using Date objects if more manipulation is needed
	// time: string; // Time removed as per Figma
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
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const simulatedDeliveries: Delivery[] = [
		{
			id: "1",
			type: "motorcycle",
			status: "In Transit",
			origin: "Satelite town, Amuwo Odofin",
			destination: "Festac Town, Lagos", // Destination from Figma 222:451
			date: "15th Mar, 2025", // Date from Figma 222:449
			// time: "14:30",
			trackingId: "CC-12345",
		},
		{
			id: "2",
			type: "motorcycle", // Type from Figma 222:482
			status: "Completed", // Status from Figma 222:502
			origin: "Lekki Phase 1",
			destination: "NO. 45 ABC Road, Port Harcourt", // Destination from Figma 222:504
			date: "6th Mar, 2025", // Date from Figma 222:506
			// time: "10:15",
			trackingId: "CC-67890",
		},
		{
			id: "3",
			type: "motorcycle", // Type from Figma 222:510 (assuming consistency)
			status: "Completed", // Status from Figma 222:514
			origin: "Ikeja",
			destination: "NO. 20 Felix Estate, Ogun State", // Destination from Figma 222:520
			date: "16th Dec, 2024", // Date from Figma 222:522
			// time: "16:45",
			trackingId: "CC-24680",
		},
		// { // Removed van example as it's not in Figma history list
		//   id: "4",
		//   type: "van",
		//   status: "Pending",
		//   origin: "Surulere",
		//   destination: "Apapa",
		//   date: "16th Mar, 2025",
		//   // time: "09:00",
		//   trackingId: "CC-11223",
		// },
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

	// // Helper to determine badge variant based on status - Badge removed
	// const getBadgeVariant = (status: Delivery['status']) => {
	//   switch (status) {
	//     case "Completed": return "success";
	//     case "In Transit": return "primary";
	//     case "Pending": return "default";
	//     case "Cancelled": return "danger";
	//     default: return "default";
	//   }
	// };

	return (
		// Adjusted padding and added font
		<div className="p-6 md:p-10 lg:p-16 font-poppins space-y-[40px]">
			{/* Title - Assuming a title is needed, though not explicitly in Figma node 222:132 */}
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

			{/* Delivery List - Adjusted spacing to match Figma layout_XI8MG1 */}
			{!fetchError && deliveries.length > 0 && (
				<div className="space-y-[40px]">
					{deliveries.map((delivery) => (
						// Link to tracking page with ID query parameter
						<Link
							key={delivery.id}
							href={`/dashboard/track?id=${delivery.trackingId}`}
							className="block"
						>
							{/* Card Styling - Adjusted to match Figma 222:442 */}
							<Card className="bg-white border border-[#F8F2F2] rounded-[13.7px] hover:border-primary transition-colors cursor-pointer shadow-sm">
								{/* Card Content - Adjusted padding and layout to match Figma layout_P8H6TF */}
								<CardContent className="p-[16.5px]">
									{/* Inner Flex Container - Adjusted layout to match Figma 222:443 */}
									<div className="flex items-center gap-[11px]">
										{/* Icon - Adjusted style to match Figma 222:444 */}
										{/* Removed bg wrapper */}
										<div className="p-0">
											{delivery.type === "motorcycle" && (
												<Motorcycle className="w-6 h-6 text-[#3C74ED]" /> // Blue icon
											)}
											{delivery.type === "car" && (
												<Car className="w-6 h-6 text-[#3C74ED]" /> // Blue icon
											)}
											{delivery.type === "van" && (
												<Truck className="w-6 h-6 text-[#3C74ED]" /> // Blue icon
											)}
										</div>

										{/* Details Section - Adjusted layout to match Figma 222:446 */}
										<div className="flex-1 space-y-[13.7px]">
											{/* Top Row: Status & Date - Adjusted layout to match Figma 222:447 */}
											<div className="flex justify-between items-center">
												{/* Status - Adjusted style to match Figma style_AVKMYR */}
												<h3 className="font-poppins font-normal text-[19.2px] leading-[1.14em] text-black">
													{delivery.status}
												</h3>
												{/* Date - Adjusted style to match Figma style_AO7AT7 */}
												<p className="font-poppins font-normal text-[13.7px] leading-[1.6em] text-[#212121]">
													{delivery.date}
												</p>
											</div>
											{/* Bottom Row: Destination & View Details - Adjusted layout to match Figma 222:450 */}
											<div className="flex justify-between items-center">
												{/* Destination - Adjusted style to match Figma style_KHTXX3 */}
												<p className="font-poppins font-medium text-[11px] leading-[2em] text-[#575757] truncate pr-4">
													Delivery to {delivery.destination}
												</p>
												{/* View Details - Adjusted style to match Figma style_AO7AT7 */}
												<span className="font-poppins font-normal text-[13.7px] leading-[1.6em] text-[#3C74ED] whitespace-nowrap">
													View Details
												</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}

			{/* Back to Dashboard Link - Added based on Figma 222:476 */}
			<div className="flex justify-center mt-10">
				<Link
					href="/dashboard"
					className="flex items-center text-black hover:opacity-80 gap-[10px]" // Reduced gap from Figma's 50px
				>
					<ArrowLeft className="w-5 h-5" /> {/* Icon from Figma 222:477 */}
					{/* Text Style from Figma style_1DTAKQ */}
					<span className="font-poppins font-medium text-[20px] leading-[1.2em]">
						Back To Dashboard
					</span>
				</Link>
			</div>
		</div>
	);
}
