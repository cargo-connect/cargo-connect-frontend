"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
	ArrowLeft,
	CreditCard,
	Wallet,
	BikeIcon as Motorcycle,
	Car,
	Truck,
	Clock,
	AlertCircle,
	FileText, // Assuming File icon maps to this
	Package, // Generic package icon
} from "lucide-react"; // Added AlertCircle, FileText, Package
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconLabel } from "@/components/ui/icon-label"; // Keep for potential use or remove if fully replaced

// Define vehicle-specific data
const vehicleData = {
	motorcycle: { title: "Motorcycle", icon: Motorcycle },
	car: { title: "Car", icon: Car },
	van: { title: "Van", icon: Truck },
};

// Define interface for booking summary data (replace with actual structure if known)
interface BookingSummary {
	pickupAddress: string;
	deliveryAddress: string;
	vehicleType: string;
	estimatedTime: string; // Figma shows "1 hour"
	packageType: string; // Figma shows "Documents"
	isFragile: boolean; // Not explicitly shown in Figma summary card
	senderName: string;
	senderPhone: string;
	receiverName: string;
	receiverPhone: string;
	paymentMethod: string; // Figma shows "Cash or Transfer"
	// deliveryFee: number; // Not shown in Figma summary card
	// distanceFee: number; // Not shown in Figma summary card
	// promoDiscount: number; // Not shown in Figma summary card
	totalAmount: number; // Figma shows 4,500
}

export default function BookingConfirmationPage() {
	const router = useRouter();
	// const [paymentMethod, setPaymentMethod] = useState("delivery"); // Payment method is part of summary now
	const [vehicleType, setVehicleType] = useState<string>("motorcycle"); // Default
	const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null); // State for summary data
	const [isLoading, setIsLoading] = useState(false); // Loading state for confirmation/payment
	const [error, setError] = useState<string | null>(null); // Error state

	// Get the selected vehicle type and potentially other details from session storage or fetch
	useEffect(() => {
		// TODO: Ideally, fetch full booking details using an ID passed from the previous step.
		// For now, retrieve from sessionStorage as fallback/example.
		const storedVehicleType = sessionStorage.getItem("selectedVehicleType");
		const storedPrice = sessionStorage.getItem("simulatedBookingPrice") || "4500"; // Example retrieval, ensure it's a number

		if (
			storedVehicleType &&
			["motorcycle", "car", "van"].includes(storedVehicleType)
		) {
			setVehicleType(storedVehicleType);
		}

		// Simulate setting booking summary data based on Figma (replace with actual fetch/retrieval)
		const simulatedSummary: BookingSummary = {
			pickupAddress: "Satelite town, Amuwo Odofin",
			deliveryAddress: "Festac town, Amuwo Odofin",
			vehicleType: storedVehicleType || "motorcycle",
			estimatedTime: "1 hour", // From Figma 222:746
			packageType: "Documents", // From Figma 222:727
			isFragile: false, // Assuming default, not shown in summary
			senderName: "Favour", // From Figma 222:692
			senderPhone: "0812345689", // From Figma 222:695
			receiverName: "Joy", // From Figma 222:699
			receiverPhone: "0819865432", // From Figma 222:702
			paymentMethod: "Cash or Transfer", // From Figma 222:733
			totalAmount: parseFloat(storedPrice) || 4500, // From Figma 222:685
		};
		setBookingSummary(simulatedSummary);
	}, []);

	// Updated handleSubmit for API integration
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		if (!bookingSummary) {
			setError("Booking details are missing.");
			setIsLoading(false);
			return;
		}

		const payload = {
			// bookingId: sessionStorage.getItem("bookingId"), // If ID was stored
			// paymentMethod: bookingSummary.paymentMethod, // Payment method is now part of summary
			// Include other necessary details for confirmation API
		};

		try {
			// --- Placeholder for actual API call ---
			console.log("Attempting to confirm booking with:", payload);
			// const endpoint = '/api/booking/confirm';
			// const response = await fetch(endpoint, {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(payload),
			// });
			// const result = await response.json();
			// if (!response.ok) {
			//   throw new Error(result.error?.message || 'Failed to confirm booking');
			// }
			// console.log('Booking confirmation successful:', result);
			// --- End Placeholder ---

			await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
			const simulatedSuccess = true; // Simulate success

			if (!simulatedSuccess) {
				throw new Error("Failed to process confirmation. Please try again."); // Simulate failure
			}

			// Clear session storage used for booking flow?
			// sessionStorage.removeItem("selectedVehicleType");
			// sessionStorage.removeItem("simulatedBookingPrice");
			// sessionStorage.removeItem("bookingId");

			// Redirect on success
			router.push("/dashboard/success/booking");
		} catch (err: any) {
			console.error("Booking confirmation error:", err);
			setError(err.message || "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	// Get the vehicle icon component
	const VehicleIcon =
		vehicleData[vehicleType as keyof typeof vehicleData]?.icon || Motorcycle;

	// Render loading state if summary isn't ready yet
	if (!bookingSummary) {
		return (
			<div className="p-6 text-center text-gray-500 font-poppins">
				Loading booking summary...
			</div>
		);
	}

	// Helper to render detail rows consistently
	const DetailRow = ({
		label,
		value,
		icon: Icon,
	}: {
		label: string;
		value: string;
		icon?: React.ElementType;
	}) => (
		<div className="space-y-[6.7px]">
			{/* Label Style: style_S2G8C8 / style_L8GFLT */}
			<p className="font-poppins font-medium text-[16px] leading-[1.33em] text-[#757575]">
				{label}
			</p>
			<div className="flex items-center gap-[8px]">
				{/* Icon Style: e.g., 222:724 */}
				{Icon && <Icon className="w-[20px] h-[20px] text-black" />}
				{/* Value Style: style_OSDH0X / style_I5A7IJ */}
				<p className="font-poppins font-normal text-[18.7px] leading-[1.14em] text-black truncate">
					{value}
				</p>
			</div>
		</div>
	);

	return (
		// Adjusted padding and overall layout container
		<div className="p-6 md:p-10 lg:p-16 max-w-4xl mx-auto font-poppins">
			{/* Back Button & Title Row - Adjusted style to match Figma 222:760 */}
			<div className="flex items-center gap-4 mb-10">
				<Link
					href={`/dashboard/book/${vehicleType}`}
					className="flex items-center text-black hover:opacity-80"
					aria-label="Back"
				>
					{/* Icon Style: 222:757 */}
					<ArrowLeft className="w-6 h-6 text-black" />
				</Link>
				{/* Title Style: style_VPNZ5S */}
				<h2 className="font-poppins font-medium text-[24px] leading-[2.67em] text-black">
					Confirm your delivery order
				</h2>
			</div>

			{/* Display Error */}
			{error && (
				<div className="mb-4 flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
					<AlertCircle className="w-4 h-4 mr-2 shrink-0" />
					<span>{error}</span>
				</div>
			)}

			{/* Main Content Area - Adjusted spacing to match Figma 222:756 */}
			<div className="flex flex-col items-center gap-[59px]">
				{/* Total Amount - Adjusted style to match Figma 222:682 */}
				<div className="flex items-center justify-center">
					{/* Assuming CurrencyNgn is Naira symbol */}
					<span className="font-poppins font-semibold text-[32px] leading-[1em] text-[#3C74ED]">
						₦
					</span>
					<span className="font-poppins font-semibold text-[32px] leading-[1em] text-[#3C74ED]">
						{bookingSummary.totalAmount.toLocaleString()}
					</span>
				</div>

				{/* Summary Card - Adjusted style to match Figma 222:684 */}
				<Card className="w-full max-w-[559px] border border-[#A6A6A6] rounded-[27px] shadow-none">
					{/* Adjusted padding to match Figma layout_KFGSFK */}
					<CardContent className="p-[43px]">
						{/* Adjusted layout to match Figma layout_YL6DZT */}
						<div className="space-y-[57.5px]">
							{/* Sender/Receiver Section - Adjusted layout to match Figma 222:688 */}
							<div className="flex justify-between items-start gap-[134px]">
								{/* Sender Details */}
								<div className="space-y-[33.4px]">
									<DetailRow
										label="Sender’s Name"
										value={bookingSummary.senderName}
									/>
									<DetailRow
										label="Sender’s phone number"
										value={bookingSummary.senderPhone}
									/>
								</div>
								{/* Receiver Details */}
								<div className="space-y-[33.4px]">
									<DetailRow
										label="Receiver’s Name"
										value={bookingSummary.receiverName}
									/>
									<DetailRow
										label="Receiver’s phone number"
										value={bookingSummary.receiverPhone}
									/>
								</div>
							</div>

							{/* Address Section - Adjusted layout to match Figma 222:703 */}
							<div className="flex items-center">
								{/* Icons and Dashed Line - Adjusted style to match Figma 222:704 */}
								<div className="flex flex-col items-center gap-[6.7px] pr-[20px] mr-[20px]">
									{/* Pickup Icon */}
									<div className="w-[13.4px] h-[13.4px] bg-[#B1E4FC] rounded-full flex items-center justify-center border border-[#E6F6FE]">
										<div className="w-[8px] h-[8px] bg-[#039ADE] rounded-full"></div>
									</div>
									{/* Dashed Line */}
									<div className="w-[1.3px] h-[40px] border-l border-dashed border-[#35BAF6]"></div>
									{/* Delivery Icon */}
									<div className="w-[13.4px] h-[13.4px] bg-[#B1E4FC] rounded-full flex items-center justify-center border border-[#E6F6FE]">
										<div className="w-[8px] h-[8px] bg-[#039ADE] rounded-full"></div>
									</div>
								</div>
								{/* Address Text - Adjusted style to match Figma 222:710 */}
								<div className="flex-1 space-y-[46.8px]">
									<DetailRow
										label="Pick up from"
										value={bookingSummary.pickupAddress}
									/>
									<DetailRow
										label="Deliver to"
										value={bookingSummary.deliveryAddress}
									/>
								</div>
							</div>

							{/* Package/Mode/Payment/Time Section - Adjusted layout to match Figma 222:719 */}
							<div className="flex justify-between items-start gap-[100px]">
								{/* Left Column */}
								<div className="space-y-[33.4px]">
									<DetailRow
										label="Package Type"
										value={bookingSummary.packageType}
										icon={FileText} // Or Package icon
									/>
									<DetailRow
										label="Pay with"
										value={bookingSummary.paymentMethod}
										icon={Wallet} // Or CreditCard if applicable
									/>
								</div>
								{/* Right Column */}
								<div className="space-y-[33.4px]">
									<DetailRow
										label="Delivery Mode"
										value={
											vehicleData[
												bookingSummary.vehicleType as keyof typeof vehicleData
											]?.title || "N/A"
										}
										icon={VehicleIcon}
									/>
									<DetailRow
										label="Time"
										value={bookingSummary.estimatedTime}
										icon={Clock}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Confirmation Button - Adjusted style to match Figma 222:753 */}
				<Button
					onClick={handleSubmit}
					// Adjusted style to match Figma 222:753
					className={`w-full max-w-[559px] h-[44px] bg-[#3C74ED] rounded-[50px] text-white 
                   font-poppins font-semibold text-[17px] leading-[1.29em]
                   hover:bg-[#3C74ED]/90 focus-visible:ring-offset-2 focus-visible:ring-[#3C74ED]
                   ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
					disabled={isLoading}
				>
					{isLoading ? "Processing..." : "Book Rider"} {/* Text from Figma 222:754 */}
				</Button>
			</div>
		</div>
	);
}
