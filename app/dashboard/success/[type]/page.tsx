"use client"

import { useEffect, useState, use } from "react" // Import use
import Link from "next/link"
import {
	CheckCircle,
	BikeIcon as Motorcycle,
	Car,
	Truck,
	Package,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define vehicle-specific data
const vehicleData = {
	motorcycle: {
		title: "Motorcycle",
		icon: Motorcycle,
	},
	car: {
		title: "Car",
		icon: Car,
	},
	van: {
		title: "Van",
		icon: Truck,
	},
};

// Define success type data
const successTypeData = {
	booking: {
		title: "Booking Successful!",
		description:
			"Your delivery has been booked. A rider will contact you shortly.", // Text from Figma 222:124
		primaryButtonText: "Track Delivery", // Text from Figma 222:127
		primaryButtonLink: "/dashboard/track", // Assuming link remains the same
		secondaryButtonText: "Back to Home", // Text from Figma 222:129
		secondaryButtonLink: "/dashboard", // Assuming link remains the same
		// detailsTitle: "Booking Details", // Details card removed
	},
	shipment: {
		// Assuming shipment success looks similar, update if Figma differs
		title: "Shipment Successful!", // Adjusted title for clarity
		description:
			"Your shipment has been booked successfully. You can track your shipment in the shipments tab.",
		primaryButtonText: "View Shipments",
		primaryButtonLink: "/dashboard/shipments",
		secondaryButtonText: "Back to Home",
		secondaryButtonLink: "/dashboard",
		// detailsTitle: "Shipment Details", // Details card removed
	},
};

// Update the type definition for paramsProp to be a Promise
export default function SuccessPage({
	params: paramsProp,
}: { params: Promise<{ type: string }> }) {
	const params = use(paramsProp); // Unwrap params using use()
	// const [vehicleType, setVehicleType] = useState<string>("motorcycle"); // Vehicle type not needed for display based on Figma
	const successType = params.type; // Now accessing unwrapped params

	// Validate success type
	useEffect(() => {
		if (!["booking", "shipment"].includes(successType)) {
			notFound();
		}

		// // Get the selected vehicle type from session storage for booking success - Not needed for display
		// if (successType === "booking") {
		//   const storedVehicleType = sessionStorage.getItem("selectedVehicleType")
		//   if (storedVehicleType && ["motorcycle", "car", "van"].includes(storedVehicleType)) {
		//     setVehicleType(storedVehicleType)
		//   }
		// }
	}, [successType]);

	// If invalid success type, this will be caught by the useEffect
	if (!successTypeData[successType as keyof typeof successTypeData]) {
		return null;
	}

	const {
		title,
		description,
		primaryButtonText,
		primaryButtonLink,
		secondaryButtonText,
		secondaryButtonLink,
		// detailsTitle, // Removed
	} = successTypeData[successType as keyof typeof successTypeData];

	// // Pre-filled sender and receiver details - Removed as details card is removed
	// const senderDetails = {
	//   name: "Favour",
	//   phone: "08123456789",
	// }
	// const receiverDetails = {
	//   name: "Joy",
	//   phone: "08198765432",
	// }

	// // Get the vehicle icon component for booking success - Removed as details card is removed
	// const VehicleIcon =
	//   successType === "booking" ? vehicleData[vehicleType as keyof typeof vehicleData]?.icon || Motorcycle : Package

	return (
		// Adjusted container to center content and match background color from Figma fill_GNJMN5
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F5F5] p-6 font-poppins">
			{/* Card container - Adjusted style to match Figma 222:118 */}
			<div className="bg-white rounded-[15px] w-full max-w-[568px] p-10 md:p-16 lg:p-20 flex flex-col items-center gap-[80px]">
				{/* Icon and Text Section - Adjusted layout to match Figma 222:119 */}
				<div className="flex flex-col items-center gap-[47px] text-center">
					{/* Icon - Adjusted style to match Figma 222:120 */}
					{/* Using a larger size and blue color */}
					<CheckCircle className="w-20 h-20 text-[#3C74ED]" /> {/* Approx size from Figma */}

					{/* Text Group - Adjusted layout to match Figma 222:122 */}
					<div className="flex flex-col items-center gap-[29px]">
						{/* Title - Adjusted style to match Figma style_0J3242 */}
						<h2 className="font-poppins font-medium text-[23.6px] leading-[1.5em] text-black">
							{title}
						</h2>
						{/* Description - Adjusted style to match Figma style_CPGG7Q */}
						<p className="font-poppins font-medium text-[17.7px] leading-[1.33em] text-[#757575] max-w-[394px]">
							{description}
						</p>
					</div>
				</div>

				{/* Button Section - Adjusted layout to match Figma 222:125 */}
				<div className="flex flex-col sm:flex-row items-center gap-[9px] w-full max-w-[500px]">
					{/* Primary Button - Adjusted style to match Figma 222:126 */}
					<Link
						href={primaryButtonLink}
						className="inline-flex items-center justify-center w-full sm:w-auto flex-1 h-[56px] px-6 py-3 
                       bg-[#3C74ED] text-white rounded-[74px] border border-[#3C74ED] 
                       font-poppins font-normal text-[20.6px] leading-[1.71em] 
                       text-center transition-colors hover:bg-[#3C74ED]/90"
					>
						{primaryButtonText}
					</Link>

					{/* Secondary Button - Adjusted style to match Figma 222:128 */}
					<Link
						href={secondaryButtonLink}
						className="inline-flex items-center justify-center w-full sm:w-auto flex-1 h-[56px] px-6 py-3 
                       bg-white text-black rounded-[74px] border border-[#3C74ED] 
                       font-poppins font-normal text-[20.6px] leading-[1.71em] 
                       text-center transition-colors hover:bg-gray-100"
					>
						{secondaryButtonText}
					</Link>
				</div>
			</div>
		</div>
	);
}
