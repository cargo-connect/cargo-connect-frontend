"use client"; // Make this a Client Component

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting if not authenticated
import { BikeIcon as Motorcycle, Car, Truck, Gift, AlertCircle, Loader2 } from "lucide-react"; // Added Loader2
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Added Button import
import { getCurrentUser, LoggedInUser } from "../../lib/services/userService"; // Corrected path

// Interface for RecentDelivery (can be moved to a types file)
interface RecentDelivery {
	id: string;
	type: "motorcycle" | "car" | "van";
	status: "In Transit" | "Completed" | "Pending" | "Cancelled";
	destination: string;
	date: string;
}

// Simulated recent deliveries data (until its API is integrated)
const simulatedRecentDeliveries: RecentDelivery[] = [
	{
		id: "1",
		type: "motorcycle",
		status: "In Transit",
		destination: "Lekki Phase 1, Lagos",
		date: "15th Mar, 2025",
	},
	{
		id: "2",
		type: "car",
		status: "Completed",
		destination: "No45, ABC road, Port Harcourt",
		date: "14th Mar, 2025",
	},
];

// Helper to determine badge variant based on status (remains the same)
const getBadgeVariant = (status: RecentDelivery["status"]) => {
	switch (status) {
		case "Completed":
			return "success";
		case "In Transit":
			return "primary";
		case "Pending":
			return "default";
		case "Cancelled":
			return "danger";
		default:
			return "default";
	}
};

export default function Dashboard() {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [fetchError, setFetchError] = useState<string | null>(null);

	// Keep simulated deliveries for now
	const recentDeliveries = simulatedRecentDeliveries; 

	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true);
			setFetchError(null);
			try {
				const user = await getCurrentUser();
				setCurrentUser(user);
			} catch (error: any) {
				console.error("Failed to fetch current user:", error);
				setFetchError(error.message || "Failed to load user data.");
				// If token is not found or invalid, redirect to login
				if (error.message === 'No authentication token found. User is not logged in.' || error.message === 'User not authenticated. Please log in again.') {
					router.push("/auth/login");
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [router]);

	const userName = currentUser?.full_name || "User";

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
				<p className="ml-4 text-lg">Loading dashboard...</p>
			</div>
		);
	}

	// Error display for user data fetching, distinct from delivery fetch error
	if (fetchError && !currentUser) { // Only show full page error if user data failed critically
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
				<AlertCircle className="w-12 h-12 text-red-500 mb-4" />
				<h2 className="text-xl font-semibold mb-2">Could not load user data</h2>
				<p className="text-red-600 mb-4">{fetchError}</p>
				<Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
			</div>
		);
	}
	
	return (
		<div className="space-y-[30px] p-6 font-poppins">
			<h2 className="text-[20px] font-medium text-[#262525]">
				Hi {userName}, Ready to make a delivery?
			</h2>
			
			{/* Display user fetch error inline if deliveries can still be shown or are unrelated */}
			{fetchError && currentUser && ( // Show error but still render rest of dashboard if user data is partially available or deliveries are independent
				 <div className="flex items-center p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
						<AlertCircle className="w-5 h-5 mr-2 shrink-0" />
						<span>Error loading complete user details: {fetchError} (Displaying cached/fallback name)</span>
				 </div>
			)}

			{/* Delivery Type Selection */}
			<div className="space-y-[11px]">
				<h3 className="text-[16px] font-medium text-[#666666]">
					Select delivery type
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
					<Link href="/dashboard/book/motorcycle" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							<CardContent className="flex flex-col items-center justify-center p-[20px] gap-[10px] min-h-[153px]">
								<h4 className="text-[13px] font-medium text-black">
									Motorcycle
								</h4>
								<p className="text-[8px] font-[275] text-black leading-[2em]">
									Small packages
								</p>
								<Motorcycle className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
					<Link href="/dashboard/book/car" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							<CardContent className="flex flex-col items-center justify-center p-[20px] gap-[10px] min-h-[153px]">
								<h4 className="text-[13px] font-medium text-black">Car</h4>
								<p className="text-[8px] font-[275] text-black leading-[2em]">
									Medium packages
								</p>
								<Car className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
					<Link href="/dashboard/book/van" className="block">
						<Card className="bg-[#FBFBFB] border border-[#D4D5D7] rounded-[10px] hover:border-primary transition-colors">
							<CardContent className="flex flex-col items-center justify-center p-[16px] gap-[10px] min-h-[153px]">
								<h4 className="text-[13px] font-medium text-black">Van</h4>
								<p className="text-[8px] font-[300] text-black leading-[2em]">
									Large packages
								</p>
								<Truck className="w-10 h-10 text-black" />
							</CardContent>
						</Card>
					</Link>
				</div>
			</div>

			<div className="bg-[#F9168B] text-white p-6 rounded-[10px] flex items-center justify-center gap-[13px]">
				<Gift className="w-10 h-10" />
				<p className="text-[24px] font-medium leading-[1em]">
					Get N500 off your first ride! Use code: WELCOME500
				</p>
			</div>

			<div className="space-y-[30px]"> 
				<div className="flex items-center justify-between">
					<h3 className="text-[24px] font-medium text-black">
						Delivery History
					</h3>
					<Link
						href="/dashboard/history"
						className="text-[#3C74ED] hover:underline text-[20px] font-medium leading-[1.2em]"
					>
						View All
					</Link>
				</div>

				{/* Error display for delivery data fetching (if it were separate) */}
				{/* For now, this section uses simulated data, so no specific fetchError for deliveries */}

				{recentDeliveries.length === 0 && (
					<div className="text-center p-6 bg-gray-50 border rounded-lg text-gray-500">
						No recent deliveries found.
					</div>
				)}

				{recentDeliveries.length > 0 && (
					<div className="space-y-[30px]"> 
						{recentDeliveries.map((delivery) => (
							<Link
								key={delivery.id}
								href={`/dashboard/shipments/${delivery.id}`}
								className="block"
							>
								<Card className="bg-white border border-[#F8F2F2] rounded-[10px] hover:border-primary transition-colors cursor-pointer">
									<CardContent className="flex items-center p-[12px] gap-[15px]">
										<div className="p-0">
											{delivery.type === "motorcycle" && (
												<Motorcycle className="w-6 h-6 text-[#3C74ED]" />
											)}
											{delivery.type === "car" && (
												<Car className="w-6 h-6 text-[#3C74ED]" />
											)}
											{delivery.type === "van" && (
												<Truck className="w-6 h-6 text-[#3C74ED]" />
											)}
										</div>
										<div className="flex-1 space-y-[20px]"> 
											<div className="flex justify-between items-center"> 
												<h4 className="text-[20px] font-normal text-black leading-[0.8em] flex items-center gap-2">
													{delivery.status}
													<Badge
														variant={getBadgeVariant(delivery.status)}
														className="text-xs"
													>
														{delivery.status}
													</Badge>
												</h4>
											</div>
											<div className="flex justify-between items-center"> 
												<p
													className="text-[14px] font-medium text-[#575757] leading-[1.14em] truncate"
													title={`Delivery to ${delivery.destination}`}
												>
													Delivery to {delivery.destination}
												</p>
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
