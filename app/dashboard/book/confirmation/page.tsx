"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet, BikeIcon as Motorcycle, Car, Truck, Clock, AlertCircle } from "lucide-react" // Added AlertCircle
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconLabel } from "@/components/ui/icon-label"

// Define vehicle-specific data
const vehicleData = {
  motorcycle: { title: "Motorcycle", icon: Motorcycle },
  car: { title: "Car", icon: Car },
  van: { title: "Van", icon: Truck },
}

// Define interface for booking summary data (replace with actual structure if known)
interface BookingSummary {
    pickupAddress: string;
    deliveryAddress: string;
    vehicleType: string;
    estimatedTime: string;
    packageType: string;
    isFragile: boolean;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    deliveryFee: number;
    distanceFee: number;
    promoDiscount: number;
    totalAmount: number;
}

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("delivery")
  const [vehicleType, setVehicleType] = useState<string>("motorcycle") // Default
  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null); // State for summary data
  const [isLoading, setIsLoading] = useState(false); // Loading state for confirmation/payment
  const [error, setError] = useState<string | null>(null); // Error state

  // Get the selected vehicle type and potentially other details from session storage or fetch
  useEffect(() => {
    // TODO: Ideally, fetch full booking details using an ID passed from the previous step.
    // For now, retrieve from sessionStorage as fallback/example.
    const storedVehicleType = sessionStorage.getItem("selectedVehicleType");
    const storedPrice = sessionStorage.getItem("simulatedBookingPrice") || "4,500"; // Example retrieval

    if (storedVehicleType && ["motorcycle", "car", "van"].includes(storedVehicleType)) {
      setVehicleType(storedVehicleType);
    }

    // Simulate setting booking summary data (replace with actual fetch/retrieval)
    const simulatedSummary: BookingSummary = {
        pickupAddress: "Satelite town, Amuwo Odofin",
        deliveryAddress: "Festac town, Amuwo Odofin",
        vehicleType: storedVehicleType || "motorcycle",
        estimatedTime: "Today, 4:30 PM (25 mins)",
        packageType: "Electronics (Fragile)", // Combine type and fragile for display
        isFragile: true, // Assuming this was set
        senderName: "Favour", // Placeholder
        senderPhone: "08123456789", // Placeholder
        receiverName: "Joy", // Placeholder
        receiverPhone: "08198765432", // Placeholder
        deliveryFee: 4000,
        distanceFee: 750,
        promoDiscount: 250,
        totalAmount: 4500, // Calculate or fetch real total
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
        paymentMethod: paymentMethod,
        // Include other necessary details for confirmation/payment API
    };

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to confirm booking/payment with:", payload);
      // let endpoint = '/api/booking/confirm'; // Default confirmation endpoint
      // if (paymentMethod === 'card') {
      //    endpoint = '/api/payments/process'; // Different endpoint for card payment?
      // }
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to confirm booking');
      // }
      // console.log('Booking confirmation/payment successful:', result);
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
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
      console.error('Booking confirmation error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get the vehicle icon component
  const VehicleIcon = vehicleData[vehicleType as keyof typeof vehicleData]?.icon || Motorcycle;

  // Render loading state if summary isn't ready yet
  if (!bookingSummary) {
     return <div className="p-6 text-center text-gray-500">Loading booking summary...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href={`/dashboard/book/${vehicleType}`} className="flex items-center text-gray-600 mb-6 hover:text-primary">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back</span>
      </Link>

      <h2 className="text-2xl font-semibold mb-6">Confirm Your Booking</h2>

      {/* Display Error */}
      {error && (
         <div className="mb-4 flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
           <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
           <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <IconLabel icon={<div className="w-2 h-2 bg-blue-500 rounded-full"></div>} label={bookingSummary.pickupAddress} description="Pickup Address" iconBackground={false} />
                <IconLabel icon={<div className="w-2 h-2 bg-red-500 rounded-full"></div>} label={bookingSummary.deliveryAddress} description="Delivery Address" iconBackground={false} />
                <IconLabel icon={<VehicleIcon className="w-5 h-5 text-primary" />} label={vehicleData[bookingSummary.vehicleType as keyof typeof vehicleData]?.title || "N/A"} description="Delivery Mode" />
                <IconLabel icon={<Clock className="w-5 h-5 text-primary" />} label={bookingSummary.estimatedTime} description="Estimated Time of Arrival" />
                <IconLabel icon={<span className="text-primary">📦</span>} label={bookingSummary.packageType} description="Package Type" />
              </div>
            </CardContent>
          </Card>

          {/* Sender and Receiver Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Sender and Receiver Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500 mb-1">Sender's Name</p><div className="p-3 border rounded-lg bg-gray-50 truncate">{bookingSummary.senderName}</div></div>
                <div><p className="text-sm text-gray-500 mb-1">Receiver's Name</p><div className="p-3 border rounded-lg bg-gray-50 truncate">{bookingSummary.receiverName}</div></div>
                <div><p className="text-sm text-gray-500 mb-1">Sender's phone</p><div className="p-3 border rounded-lg bg-gray-50 truncate">{bookingSummary.senderPhone}</div></div>
                <div><p className="text-sm text-gray-500 mb-1">Receiver's phone</p><div className="p-3 border rounded-lg bg-gray-50 truncate">{bookingSummary.receiverPhone}</div></div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${ paymentMethod === "delivery" ? "border-primary bg-primary/5" : "hover:bg-gray-50" } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isLoading && setPaymentMethod("delivery")}
                >
                  <input type="radio" id="delivery" name="paymentMethod" checked={paymentMethod === "delivery"} onChange={() => setPaymentMethod("delivery")} className="mr-3 focus:ring-primary" disabled={isLoading} />
                  <Wallet className="w-5 h-5 mr-3 text-primary" />
                  <label htmlFor="delivery" className={`cursor-pointer ${isLoading ? 'cursor-not-allowed' : ''}`}>Payment on delivery</label>
                </div>
                <div
                  className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${ paymentMethod === "card" ? "border-primary bg-primary/5" : "hover:bg-gray-50" } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isLoading && setPaymentMethod("card")}
                >
                  <input type="radio" id="card" name="paymentMethod" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mr-3 focus:ring-primary" disabled={isLoading} />
                  <CreditCard className="w-5 h-5 mr-3 text-primary" />
                  <label htmlFor="card" className={`cursor-pointer ${isLoading ? 'cursor-not-allowed' : ''}`}>Credit/Debit Card</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between"><p className="text-gray-500">Delivery Fee</p><p className="font-medium">₦{bookingSummary.deliveryFee.toLocaleString()}</p></div>
              <div className="flex justify-between"><p className="text-gray-500">Distance Fee</p><p className="font-medium">₦{bookingSummary.distanceFee.toLocaleString()}</p></div>
              <div className="flex justify-between"><p className="text-gray-500">Promo Code</p><p className="font-medium text-green-600">-₦{bookingSummary.promoDiscount.toLocaleString()}</p></div>
              <div className="border-t pt-3 flex justify-between"><p className="font-medium">Total</p><p className="font-bold text-lg">₦{bookingSummary.totalAmount.toLocaleString()}</p></div>
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
