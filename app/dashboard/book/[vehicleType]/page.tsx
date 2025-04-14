"use client"

import type React from "react"

import { useState, useEffect, use } from "react" // Import use
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation";
import dynamic from "next/dynamic"; // Import dynamic
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, Input, Textarea } from "@/components/ui/form";
// Dynamically import MapboxMap with SSR disabled
const MapboxMap = dynamic(
	() => import("@/components/ui/map").then((mod) => mod.MapboxMap),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-full flex items-center justify-center bg-gray-100">
				<p>Loading map...</p>
			</div>
		), // Optional loading indicator
	},
);

// Define vehicle-specific data
const vehicleData = {
	motorcycle: {
		title: "Motorcycle Delivery",
		description: "Small packages",
		price: "4,500", // Note: Price might need to be fetched/calculated via API
		icon: "🏍️",
	},
	car: {
		title: "Car Delivery",
		description: "Medium packages",
		price: "4,500", // Using price from motorcycle as per Figma 179:767
		icon: "🚗",
	},
	van: {
		title: "Van Delivery",
		description: "Large packages",
		price: "4,500", // Using price from motorcycle as per Figma 179:767
		icon: "🚚",
	},
};

// Valid vehicle types
const validVehicleTypes = ["motorcycle", "car", "van"];

// Update the type definition for paramsProp to be a Promise
export default function BookDeliveryPage({
	params: paramsProp,
}: { params: Promise<{ vehicleType: string }> }) {
	const params = use(paramsProp); // Unwrap params using use()
	const router = useRouter();
	const vehicleType = params.vehicleType.toLowerCase();

	// State for form data and UI
	const [packageType, setPackageType] = useState<string | null>("food"); // Default to food as per Figma
	const [isFragile, setIsFragile] = useState(false);
	const [formData, setFormData] = useState({
		pickupAddress: "Satelite town, Amuwo Odofin", // Placeholder - might come from user profile or input
		deliveryAddress: "Festac town, Amuwo Odofin", // Placeholder
		senderName: "Favour", // Default from Figma
		senderPhone: "0812345689", // Default from Figma
		receiverName: "Joy", // Default from Figma
		receiverPhone: "0819865432", // Default from Figma
		otherSpecify: "",
	});

	// State for API interaction
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Check if vehicle type is valid
	useEffect(() => {
		if (!validVehicleTypes.includes(vehicleType)) {
			notFound();
		}
	}, [vehicleType]);

	// Sample location data - in a real app, this would be geocoded from addresses
	const locationData = {
		pickup: { longitude: 3.36, latitude: 6.515 },
		delivery: { longitude: 3.2847, latitude: 6.4698 },
		route: [
			[3.36, 6.515],
			[3.35, 6.51],
			[3.34, 6.5],
			[3.33, 6.49],
			[3.32, 6.48],
			[3.2847, 6.4698],
		] as Array<[number, number]>,
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Updated handleSubmit for API integration
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		// Basic validation
		if (!packageType && !formData.otherSpecify) {
			setError("Please select a package type or specify 'Other'.");
			setIsLoading(false);
			return;
		}
		if (
			!formData.senderName ||
			!formData.senderPhone ||
			!formData.receiverName ||
			!formData.receiverPhone
		) {
			setError("Please fill in all sender and receiver details.");
			setIsLoading(false);
			return;
		}

		const bookingDetails = {
			vehicleType: vehicleType,
			pickupAddress: formData.pickupAddress,
			deliveryAddress: formData.deliveryAddress,
			packageType: packageType === "other" ? formData.otherSpecify : packageType,
			isFragile: isFragile,
			senderDetails: {
				name: formData.senderName,
				phone: formData.senderPhone,
			},
			receiverDetails: {
				name: formData.receiverName,
				phone: formData.receiverPhone,
			},
			// paymentMethod: "delivery" // Assuming this is fixed for now
		};

		try {
			// --- Placeholder for actual API call ---
			console.log("Attempting to create booking with:", bookingDetails);
			// const response = await fetch('/api/deliveries', { // Or /api/booking/confirm
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(bookingDetails),
			// });
			// const result = await response.json();
			// if (!response.ok) {
			//   throw new Error(result.error?.message || 'Booking failed');
			// }
			// console.log('Booking successful:', result);
			// // Store actual booking ID or details if needed for confirmation page
			// sessionStorage.setItem("bookingId", result.deliveryId);
			// --- End Placeholder ---

			await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
			const simulatedSuccess = true; // Simulate success

			if (!simulatedSuccess) {
				throw new Error("Failed to create booking. Please try again."); // Simulate failure
			}

			// Store the vehicle type in session storage for the confirmation page (keep this)
			sessionStorage.setItem("selectedVehicleType", vehicleType);
			// Optionally store other simulated data if confirmation page needs it
			sessionStorage.setItem(
				"simulatedBookingPrice",
				currentVehicleData?.price || "N/A",
			);

			// Redirect on success
			router.push("/dashboard/book/confirmation");
		} catch (err: any) {
			console.error("Booking submission error:", err);
			setError(err.message || "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	const packageTypes = [
		{ id: "documents", label: "Documents", icon: "📄" }, // Figma uses File icon
		{ id: "food", label: "Food", icon: "🍔" }, // Figma uses Hamburger icon
		{ id: "clothings", label: "Clothings", icon: "👕" }, // Figma uses TShirt icon
		{ id: "electronics", label: "Electronics", icon: "📱" }, // Figma uses Devices icon
		{ id: "gifts", label: "Gifts", icon: "🎁" }, // Figma uses Gift icon
		{ id: "beauty", label: "Beauty", icon: "💄" }, // Figma uses HairDryer icon
		{ id: "accessories", label: "Accessories", icon: "👜" }, // Figma uses Backpack icon
		{ id: "other", label: "Other", icon: "❓" }, // Added 'Other' option
	];

	// Get current vehicle data safely
	const currentVehicleData = vehicleData[vehicleType as keyof typeof vehicleData];

	// If vehicle type is invalid (redundant due to useEffect but safe)
	if (!currentVehicleData) {
		// useEffect should have already triggered notFound()
		return null;
	}

	// Use title from Figma, price from updated vehicleData
	const { price } = currentVehicleData;
	const pageTitle = "Book a Dispatch Rider"; // From Figma 186:1309

	return (
		// Use font-poppins, remove default height constraint to allow content flow
		<div className="flex flex-col md:flex-row font-poppins">
			{/* Left side - Form - Adjusted padding and spacing */}
			<div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 overflow-y-auto space-y-[31px]">
				{/* Back Button - Adjusted style to match Figma 179:697 */}
				<Link
					href="/dashboard"
					className="flex items-center text-black mb-6 hover:opacity-80"
				>
					<ArrowLeft className="w-5 h-5 mr-2" /> {/* Keep icon */}
					{/* Adjusted text style to match style_TNAL5D */}
					<span className="font-poppins font-medium text-[16px] leading-[1.5em]">
						Back To Dashboard
					</span>
				</Link>

				{/* Title - Adjusted style to match Figma 186:1309 */}
				<h2 className="font-poppins font-semibold text-[16px] leading-[1.5em] text-black">
					{pageTitle}
				</h2>

				{/* Form - Adjusted spacing to match Figma layout_JU8YYP, layout_SAYAQI etc. */}
				<form onSubmit={handleSubmit} className="space-y-[31px]">
					{/* Address Details Section - Adjusted spacing and title style */}
					<div className="space-y-[20px]">
						{/* Adjusted text style to match style_KP9TIP */}
						<h3 className="font-poppins font-normal text-[16px] leading-[1.5em] text-black">
							Address Details
						</h3>
						{/* Address Card - Adjusted style to match Figma 179:599 */}
						<Card className="bg-[#F6F5F5] rounded-[10px] shadow-none border-none">
							{/* Adjusted padding to match Figma layout_CAJ442 */}
							<CardContent className="py-[28px] px-0 flex items-center">
								{/* Icons and Dashed Line - Adjusted style to match Figma 179:601 */}
								<div className="flex flex-col items-center gap-[5px] px-[15.5px]">
									{/* Pickup Icon */}
									<div className="w-[10px] h-[10px] bg-[#B1E4FC] rounded-full flex items-center justify-center border border-[#E6F6FE]">
										<div className="w-[6px] h-[6px] bg-[#039ADE] rounded-full"></div>
									</div>
									{/* Dashed Line */}
									<div className="w-[1px] h-[30px] border-l border-dashed border-[#35BAF6]"></div>
									{/* Delivery Icon */}
									<div className="w-[10px] h-[10px] bg-[#B1E4FC] rounded-full flex items-center justify-center border border-[#E6F6FE]">
										<div className="w-[6px] h-[6px] bg-[#039ADE] rounded-full"></div>
									</div>
								</div>
								{/* Address Text - Adjusted style to match Figma 179:607 */}
								<div className="flex-1 space-y-[35px] pr-4">
									{/* Pickup Address */}
									<div>
										{/* Adjusted text style to match style_HF4ETO */}
										<p className="font-poppins font-medium text-[12px] leading-[1.33em] text-[#666666] mb-1">
											Pick up from
										</p>
										{/* Adjusted text style to match style_13SNIC */}
										<p
											className="font-poppins font-normal text-[13px] leading-[1.23em] text-[#1E1E1E] truncate"
											title={formData.pickupAddress}
										>
											{formData.pickupAddress}
										</p>
									</div>
									{/* Delivery Address */}
									<div>
										{/* Adjusted text style to match style_HF4ETO */}
										<p className="font-poppins font-medium text-[12px] leading-[1.33em] text-[#666666] mb-1">
											Deliver to
										</p>
										{/* Adjusted text style to match style_13SNIC */}
										<p
											className="font-poppins font-normal text-[13px] leading-[1.23em] text-[#1E1E1E] truncate"
											title={formData.deliveryAddress}
										>
											{formData.deliveryAddress}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Estimated Price - Adjusted style to match Figma 179:762 */}
					<div className="flex items-center justify-start">
						{/* Adjusted text style to match style_1MUVRJ */}
						<span className="font-poppins font-normal text-[14px] leading-[1.71em] text-black mr-2">
							Estimated price;
						</span>
						{/* Adjusted text style to match style_TNAL5D */}
						{/* Assuming CurrencyNgn is the Naira symbol */}
						<span className="font-poppins font-medium text-[16px] leading-[1.5em] text-black">
							₦{price}
						</span>
					</div>

					{/* Package Type Section - Adjusted spacing and title style */}
					<div className="space-y-[23px]">
						{/* Adjusted text style to match style_KP9TIP */}
						<h3 className="font-poppins font-normal text-[16px] leading-[1.5em] text-black">
							What are you sending?
						</h3>
						{/* Adjusted button container style to match Figma 179:773 */}
						<div className="flex flex-wrap gap-[6px]">
							{packageTypes.map((type) => (
								<Button
									key={type.id}
									type="button"
									// Adjusted style to match Figma buttons 179:774 etc.
									variant="outline" // Base variant
									className={`
                    h-[38px] rounded-[50px] border border-[#3C74ED] px-4 py-2 flex items-center justify-center gap-[6px] transition-colors
                    font-poppins font-normal text-[14px] leading-[1.71em]
                    ${
											packageType === type.id
												? "bg-[#3C74ED] text-white hover:bg-[#3C74ED]/90" // Selected style from 179:779
												: "bg-white text-black hover:bg-gray-100" // Unselected style from 179:774
										}
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
									onClick={() => setPackageType(type.id)}
									disabled={isLoading}
								>
									{/* Keep emoji icon for simplicity */}
									<span>{type.icon}</span>
									<span>{type.label}</span>
								</Button>
							))}
						</div>
					</div>

					{/* Other Specify Input - Adjusted style to match Figma 179:803 */}
					{packageType === "other" && (
						// Removed FormField wrapper for simpler styling
						<Textarea
							id="otherSpecify"
							name="otherSpecify"
							value={formData.otherSpecify}
							onChange={handleChange}
							placeholder="If others, specify" // Placeholder from Figma 179:804
							rows={2}
							required={packageType === "other"}
							disabled={isLoading}
							// Adjusted style to match Figma 179:803
							className="bg-[#F5F4F4] border-none rounded-[5px] p-[10px] font-poppins font-normal text-[14px] leading-[1.71em] text-[#605D5D] placeholder:text-[#605D5D] focus-visible:ring-1 focus-visible:ring-primary"
						/>
					)}

					{/* Fragile Item Checkbox - Adjusted style to match Figma 179:805 */}
					<div className="flex items-center gap-[18px]">
						<button
							type="button"
							role="checkbox"
							aria-checked={isFragile}
							onClick={() => setIsFragile(!isFragile)}
							disabled={isLoading}
							// Adjusted style to match Figma 179:806
							className={`w-[19px] h-[18px] border rounded-[2px] flex items-center justify-center cursor-pointer transition-colors ${
								isFragile
									? "bg-[#2563EB] border-[#2563EB]" // Checked style
									: "bg-white border-gray-400 hover:border-gray-500" // Unchecked style
							} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							{/* Check icon from Figma 179:807 */}
							{isFragile && <Check className="w-3 h-3 text-white" />}
						</button>
						{/* Adjusted text style to match style_ZFAPMF */}
						<label
							className={`font-inter font-normal text-[14px] leading-[1.21em] text-black cursor-pointer ${
								isLoading ? "opacity-50 cursor-not-allowed" : ""
							}`}
							onClick={() => !isLoading && setIsFragile(!isFragile)}
						>
							Fragile item
						</label>
					</div>

					{/* Sender and Receiver Details Section - Adjusted spacing and title style */}
					<div className="space-y-[20px]">
						{/* Adjusted text style to match style_KP9TIP */}
						<h3 className="font-poppins font-normal text-[16px] leading-[1.5em] text-black">
							Enter Sender and Receiver’s Details
						</h3>
						{/* Details Card - Adjusted style to match Figma 179:668 */}
						<Card className="bg-[#F6F5F5] rounded-[10px] shadow-none border-none">
							{/* Adjusted padding and layout to match Figma 179:668 */}
							<CardContent className="p-[11px] space-y-[20px]">
								{/* Names Row */}
								<div className="flex justify-between items-start gap-4">
									{/* Sender Name */}
									<div className="flex-1">
										{/* Adjusted label style to match style_E54LEW */}
										<label
											htmlFor="senderName"
											className="block font-poppins font-medium text-[12px] leading-[1.33em] text-[#757575] mb-[5px]"
										>
											Sender’s Name
										</label>
										{/* Adjusted input style to match style_EBT0PH (applied via value) */}
										<Input
											type="text"
											id="senderName"
											name="senderName"
											value={formData.senderName}
											onChange={handleChange}
											required
											disabled={isLoading}
											className="bg-transparent border-none p-0 h-auto font-poppins font-medium text-[14px] leading-[1.14em] text-black focus-visible:ring-0"
										/>
									</div>
									{/* Receiver Name */}
									<div className="flex-1">
										{/* Adjusted label style */}
										<label
											htmlFor="receiverName"
											className="block font-poppins font-medium text-[12px] leading-[1.33em] text-[#757575] mb-[5px]"
										>
											Receiver’s Name
										</label>
										{/* Adjusted input style */}
										<Input
											type="text"
											id="receiverName"
											name="receiverName"
											value={formData.receiverName}
											onChange={handleChange}
											required
											disabled={isLoading}
											className="bg-transparent border-none p-0 h-auto font-poppins font-medium text-[14px] leading-[1.14em] text-black focus-visible:ring-0"
										/>
									</div>
								</div>
								{/* Phones Row */}
								<div className="flex justify-between items-start gap-4">
									{/* Sender Phone */}
									<div className="flex-1">
										{/* Adjusted label style */}
										<label
											htmlFor="senderPhone"
											className="block font-poppins font-medium text-[12px] leading-[1.33em] text-[#757575] mb-[5px]"
										>
											Sender’s phone number
										</label>
										{/* Adjusted input style to match style_LGBR8U */}
										<Input
											type="tel"
											id="senderPhone"
											name="senderPhone"
											value={formData.senderPhone}
											onChange={handleChange}
											required
											disabled={isLoading}
											className="bg-transparent border-none p-0 h-auto font-poppins font-normal text-[14px] leading-[1.14em] text-black focus-visible:ring-0"
										/>
									</div>
									{/* Receiver Phone */}
									<div className="flex-1">
										{/* Adjusted label style */}
										<label
											htmlFor="receiverPhone"
											className="block font-poppins font-medium text-[12px] leading-[1.33em] text-[#757575] mb-[5px]"
										>
											Receiver’s phone number
										</label>
										{/* Adjusted input style */}
										<Input
											type="tel"
											id="receiverPhone"
											name="receiverPhone"
											value={formData.receiverPhone}
											onChange={handleChange}
											required
											disabled={isLoading}
											className="bg-transparent border-none p-0 h-auto font-poppins font-normal text-[14px] leading-[1.14em] text-black focus-visible:ring-0"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Payment Method Section - Adjusted spacing and title style */}
					<div className="space-y-[20px]">
						{/* Adjusted text style to match style_KP9TIP */}
						<h3 className="font-poppins font-normal text-[16px] leading-[1.5em] text-black">
							Payment Method
						</h3>
						{/* Adjusted container and text styles to match Figma 179:686 */}
						<div className={`${isLoading ? "opacity-50" : ""}`}>
							<div className="flex items-center gap-[15px]">
								{/* Radio button style from Figma 179:688 */}
								<div className="w-[13px] h-[13px] border border-black rounded-full flex items-center justify-center p-[1px] shrink-0">
									{/* Inner dot */}
									<div className="w-full h-full bg-black rounded-full"></div>
								</div>
								<div className="flex items-center gap-[7px]">
									{/* Keep emoji icon */}
									<span className="text-xl">💵</span>
									{/* Adjusted text style to match style_ZFAPMF */}
									<span className="font-inter font-normal text-[14px] leading-[1.21em] text-black">
										Payment on delivery
									</span>
								</div>
							</div>
							{/* Adjusted description text style to match style_GULAW9 */}
							<p
								className={`font-poppins font-normal text-[12px] leading-[2em] text-[#605D5D] mt-[5px] ml-[28px]`} // Adjusted margin to align with text
							>
								Pay rider when your item is picked up or delivered
							</p>
						</div>
					</div>

					{/* Display Error */}
					{error && <p className="text-sm text-red-600 text-center">{error}</p>}

					{/* Submit Button - Adjusted style to match Figma 179:695 */}
					<Button
						type="submit"
						// Adjusted style to match Figma 179:695
						className={`w-full h-[44px] bg-[#3C74ED] rounded-[50px] text-white 
                   font-poppins font-semibold text-[17px] leading-[1.29em]
                   hover:bg-[#3C74ED]/90 focus-visible:ring-offset-2 focus-visible:ring-[#3C74ED]
                   ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
						disabled={isLoading}
					>
						{isLoading ? "Processing Booking..." : "Book Rider"} {/* Text from Figma 179:696 */}
					</Button>
				</form>
			</div>

			{/* Right side - Map - Keep existing map component */}
			<div className="hidden md:block md:w-1/2 h-screen sticky top-0"> {/* Make map sticky */}
				<MapboxMap
					markers={[
						{
							longitude: locationData.pickup.longitude,
							latitude: locationData.pickup.latitude,
							color: "#10B981",
							title: "Pickup",
						},
						{
							longitude: locationData.delivery.longitude,
							latitude: locationData.delivery.latitude,
							color: "#EF4444",
							title: "Delivery",
						},
					]}
					routeCoordinates={locationData.route}
					height="100%"
					width="100%"
				/>
			</div>
		</div>
	);
}
