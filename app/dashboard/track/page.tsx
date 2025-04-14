"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation' // Import useSearchParams
import Image from "next/image"
import dynamic from "next/dynamic"
import { Phone, MessageCircle, AlertCircle } from "lucide-react"; // Added AlertCircle
import { Card, CardContent } from "@/components/ui/card"; // Keep Card for potential structure
import { Button } from "@/components/ui/button"; // Keep Button for potential structure
// Dynamically import MapboxMap with SSR disabled
const MapboxMap = dynamic(
	() => import("@/components/ui/map").then((mod) => mod.MapboxMap),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-full flex items-center justify-center bg-gray-100">
				<p>Loading map...</p>
			</div>
		),
	},
);

// Define interfaces for the data structures
interface Location {
  latitude: number;
  longitude: number;
}

interface Rider {
  name: string;
  phone: string;
  location: Location;
}

interface DeliveryPoint {
  address: string;
  location: Location;
}

interface TrackingData {
	rider: Rider;
	delivery: {
		pickup: DeliveryPoint;
		destination: DeliveryPoint;
	};
	route: Array<[number, number]>; // Array of [lon, lat] tuples
	status: "Pending" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled"; // Example statuses matching timeline
	// Add other relevant fields like tracking ID, estimated time etc. if needed
}


export default function TrackPage() {
	const searchParams = useSearchParams();
	const shipmentId = searchParams.get("id"); // Get ID from URL query like /track?id=CC-12345

	// State for tracking data and UI
	const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Determine active step based on fetched status
	const getActiveStep = (status: TrackingData["status"] | undefined): number => {
		if (!status) return -1; // Not loaded yet
		switch (status) {
			case "Pending":
				return -1; // Or 0 if pickup is considered step 0
			case "Picked Up":
				return 0;
			case "In Transit":
				return 1;
			case "Delivered":
				return 2;
			case "Cancelled":
				return -1; // Or handle differently
			default:
				return -1;
		}
	};
	const activeStep = getActiveStep(trackingData?.status);

	// Fetch tracking data based on shipment ID
	useEffect(() => {
		if (!shipmentId) {
			setError(
				"No shipment ID provided in the URL, to view page, please update the URL to include a sample ID http://localhost:3000/dashboard/track?id=1.",
			);
			setIsLoading(false);
			return;
		}

		const fetchTrackingData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				// --- Placeholder for actual API call ---
				console.log(`Fetching tracking data for ID: ${shipmentId}`);
				// const response = await fetch(`/api/shipments/${shipmentId}/tracking`); // Example endpoint
				// if (!response.ok) {
				//    if (response.status === 404) throw new Error('Tracking information not found for this shipment.');
				//    throw new Error('Failed to fetch tracking data');
				// }
				// const data = await response.json();
				// setTrackingData(data.trackingInfo); // Assuming API returns { trackingInfo: {...} }
				// --- End Placeholder ---

				// Simulate API delay and data
				await new Promise((resolve) => setTimeout(resolve, 1000));
				// Simulate Not Found
				// if (shipmentId === 'not-found') {
				//    throw new Error("Tracking info not found (Simulated 404)");
				// }
				const simulatedData: TrackingData = {
					rider: {
						name: "Femi", // Name from Figma 222:376
						phone: "+234987654321", // Phone from Figma 222:377
						location: { latitude: 6.5244, longitude: 3.3792 }, // Keep simulated location
					},
					delivery: {
						pickup: {
							address: "Satelite town, Amuwo Odofin",
							location: { latitude: 6.515, longitude: 3.36 },
						},
						destination: {
							address: "Festac town, Amuwo Odofin",
							location: { latitude: 6.4698, longitude: 3.2847 },
						},
					},
					route: [
						[3.36, 6.515],
						[3.35, 6.51],
						[3.34, 6.5],
						[3.33, 6.49],
						[3.32, 6.48],
						[3.2847, 6.4698],
					],
					status: "In Transit", // This determines the activeStep, Figma shows step 1 active
				};
				setTrackingData(simulatedData);
			} catch (err: any) {
				console.error("Failed to fetch tracking data:", err);
				setError(err.message || "Could not load tracking information.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchTrackingData();
	}, [shipmentId]); // Re-fetch if shipmentId changes

	// --- Render Logic ---

	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-500 font-poppins">
				Loading tracking information...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 m-4 font-poppins">
				<AlertCircle className="w-5 h-5 mr-2" />
				<span>{error}</span>
			</div>
		);
	}

	if (!trackingData) {
		return (
			<div className="p-6 text-center text-gray-500 font-poppins">
				Tracking data not available.
			</div>
		);
	}

	// --- Main Component Return ---
	// Revert to the two-column flex layout based on user image
	return (
		<div className="flex flex-col md:flex-row h-[calc(100vh-var(--header-height,80px))] w-full font-poppins">
			{/* Left Column: Tracking Info */}
			<div className="w-full md:w-[400px] p-4 md:p-6 border-b md:border-r md:border-b-0 overflow-y-auto space-y-6">
				{/* Rider Contact Section */}
				<div> {/* Added wrapper div */}
					<h2 className="font-poppins font-medium text-xl text-black mb-4"> {/* Adjusted styles slightly */}
						Contact Rider
					</h2>
					<div className="flex items-center gap-4"> {/* Adjusted gap */}
						<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md"> {/* Adjusted size */}
							<Image
								src="/images/rider-avatar.png" // Use actual rider image if available
								alt="Rider Avatar"
								width={64} // Adjusted size
								height={64} // Adjusted size
								className="object-cover"
							/>
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-medium text-black"> {/* Adjusted styles */}
								{trackingData.rider.name}
							</h3>
							<p className="text-base text-gray-500"> {/* Adjusted styles */}
								{trackingData.rider.phone}
							</p>
						</div>
						<div className="flex gap-2">
							<a
								href={`tel:${trackingData.rider.phone}`}
								aria-label="Call rider"
								className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 transition-colors" // Adjusted styles
							>
								<Phone className="w-5 h-5" />
							</a>
							<a
								href={`sms:${trackingData.rider.phone}`}
								aria-label="Message rider"
								className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 transition-colors" // Adjusted styles
							>
								<MessageCircle className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>

				{/* Tracking Timeline Card */}
				<Card className="bg-gray-50 rounded-lg"> {/* Adjusted styles */}
					<CardContent className="p-6"> {/* Adjusted padding */}
						<div className="relative">
							{/* Pickup Confirmed */}
							<div className="flex mb-8"> {/* Adjusted margin */}
								<div className="relative">
									<div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${ activeStep >= 0 ? "bg-primary border-primary" : "bg-white border-gray-300" }`}> {/* Adjusted size */}
										{activeStep >= 0 && <div className="w-2 h-2 bg-white rounded-full"></div>} {/* Adjusted size */}
									</div>
									<div className={`absolute top-6 left-[11px] w-0.5 h-16 -z-10 ${activeStep >= 0 ? 'bg-primary' : 'bg-gray-300'}`}></div> {/* Adjusted size/pos */}
								</div>
								<div className="ml-4"> {/* Adjusted margin */}
									<h3 className={`font-medium ${activeStep >= 0 ? 'text-gray-800' : 'text-gray-400'}`}>Pickup Confirmed</h3>
									<p className="text-sm text-gray-500">Package has been picked up</p>
								</div>
							</div>

							{/* En Route */}
							<div className="flex mb-8"> {/* Adjusted margin */}
								 <div className="relative">
									 <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${ activeStep >= 1 ? "bg-primary border-primary" : "bg-white border-gray-300" }`}> {/* Adjusted size */}
										 {activeStep >= 1 && <div className="w-2 h-2 bg-white rounded-full"></div>} {/* Adjusted size */}
									 </div>
									 <div className={`absolute top-6 left-[11px] w-0.5 h-16 -z-10 ${activeStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div> {/* Adjusted size/pos */}
								 </div>
								 <div className="ml-4"> {/* Adjusted margin */}
									 <h3 className={`font-medium ${activeStep >= 1 ? 'text-gray-800' : 'text-gray-400'}`}>En Route</h3>
									 <p className="text-sm text-gray-500">Rider is on the way</p>
								 </div>
							</div>

							{/* Delivered */}
							<div className="flex">
								 <div className="relative">
									 <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${ activeStep >= 2 ? "bg-primary border-primary" : "bg-white border-gray-300" }`}> {/* Adjusted size */}
										 {activeStep >= 2 && <div className="w-2 h-2 bg-white rounded-full"></div>} {/* Adjusted size */}
									 </div>
								 </div>
								 <div className="ml-4"> {/* Adjusted margin */}
									 <h3 className={`font-medium ${activeStep >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>Delivered</h3>
									 <p className="text-sm text-gray-500">Package has been delivered</p>
								 </div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Right Column: Map */}
			<div className="flex-1 h-[300px] md:h-full"> {/* Ensure map takes full height in md+ */}
				<MapboxMap
					key={shipmentId} // Add key to force map re-render if ID changes
					initialViewState={{
						longitude: trackingData.rider.location.longitude,
						latitude: trackingData.rider.location.latitude,
						zoom: 12,
					}}
					markers={[
						// Rider marker style from Figma 222:320
						{
							longitude: trackingData.rider.location.longitude,
							latitude: trackingData.rider.location.latitude,
							// color: "#3C74ED", // Color not needed for custom element
							title: "Rider",
							element: ( // Custom element for rider marker with image
								<div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
									<Image
										src="/images/rider-avatar.png" // Rider image from Figma 222:320
										alt="Rider"
										width={40}
										height={40}
										className="object-cover"
									/>
								</div>
							),
						},
						// Destination marker style from Figma 222:321
						{
							longitude: trackingData.delivery.destination.location.longitude,
							latitude: trackingData.delivery.destination.location.latitude,
							// color: "#3C74ED", // Color not needed for custom element
							title: "Destination",
							element: ( // Custom element for destination marker
								<div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center border border-white shadow-md p-1">
									{/* Using Lucide Home icon as placeholder for HouseSimple */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 256 256"
										className="w-full h-full text-white"
										fill="currentColor"
									>
										<path d="M240,117.66l-104-83.2a16,16,0,0,0-16,0L16,117.66A16,16,0,0,0,16,144H32v64a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V144h16a16,16,0,0,0,16-26.34ZM208,208H144V160a16,16,0,0,0-32,0v48H48V128l80-64,80,64Z"></path>
									</svg>
								</div>
							),
						},
						// Pickup marker (using default marker style)
						{
							longitude: trackingData.delivery.pickup.location.longitude,
							latitude: trackingData.delivery.pickup.location.latitude,
							color: "#10B981", // Green color for pickup
							title: "Pickup",
						},
					]}
					routeCoordinates={trackingData.route}
					height="100%"
					width="100%"
					// mapStyle="mapbox://styles/mapbox/streets-v11" // Removed invalid prop
				/>
			</div>
			{/* Removed the overlay div, content moved to left column */}
		</div>
	);
}
