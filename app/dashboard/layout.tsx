"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation" // Added useRouter
import { Home, Package, Clock, User, LogOut, Bell, Menu, X, Loader2 } from "lucide-react" // Added Loader2
import { useState, useEffect } from "react" // Added useEffect
import { getCurrentUser, LoggedInUser } from "../../lib/services/userService" // Corrected path for userService

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter() // Initialize router
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error: any) {
        console.error("DashboardLayout: Failed to fetch current user:", error);
        // If token is not found or invalid, redirect to login
        if (error.message === 'No authentication token found. User is not logged in.' || error.message === 'User not authenticated. Please log in again.') {
          router.push("/auth/login");
        }
        // Optionally set an error state here if you want to display an error in the layout
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Function to check if a path is active (exact match or starts with for nested routes)
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-[220px] bg-primary flex-col fixed h-full">
        {/* Logo */}
        <div className="p-5">
          <Image
            src="/images/logo-white.png"
            alt="Cargo Connect Logo"
            width={180}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard") &&
                  !isActive("/dashboard/track") &&
                  !isActive("/dashboard/history") &&
                  !isActive("/dashboard/profile")
                    ? "bg-primary-700 font-medium"
                    : ""
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/track"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/track") ? "bg-primary-700 font-medium" : ""
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Track</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/history"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/history") ? "bg-primary-700 font-medium" : ""
                }`}
              >
                <Clock className="w-5 h-5 mr-3" />
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/profile") ? "bg-primary-700 font-medium" : ""
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-5 mt-auto">
          <Link href="/" className="flex items-center text-white hover:text-red-200">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log out</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar - Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 w-[80%] max-w-[280px] bg-primary flex-col h-full z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-5 mt-12">
          <Image
            src="/images/logo-white.png"
            alt="Cargo Connect Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard") &&
                  !isActive("/dashboard/track") &&
                  !isActive("/dashboard/history") &&
                  !isActive("/dashboard/profile")
                    ? "bg-primary-700 font-medium"
                    : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/track"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/track") ? "bg-primary-700 font-medium" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Track</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/history"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/history") ? "bg-primary-700 font-medium" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Clock className="w-5 h-5 mr-3" />
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className={`flex items-center px-5 py-3 text-white hover:bg-primary-700 ${
                  isActive("/dashboard/profile") ? "bg-primary-700 font-medium" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-5 mt-auto">
          <Link
            href="/"
            className="flex items-center text-white hover:text-red-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log out</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="w-full md:ml-[220px] flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-xl font-semibold ml-8 md:ml-0">
            {pathname === "/dashboard" && "Dashboard"}
            {pathname.startsWith("/dashboard/track") && "Track"}
            {pathname.startsWith("/dashboard/history") && "History"}
            {pathname.startsWith("/dashboard/profile") && "Profile"}
            {pathname.startsWith("/dashboard/book") && "Book Delivery"}
          </h1>

          <div className="flex items-center">
            <Link href="/dashboard/track" className="relative mr-4">
              <Bell className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                1
              </span>
            </Link>

            <div className="flex items-center">
              {isLoadingUser ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <span className="mr-2 text-sm font-medium hidden sm:inline">
                  {currentUser?.full_name || "User"}
                </span>
              )}
              <Link href="/dashboard/profile">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <Image
                    src={currentUser?.email ? `/images/user-avatar.png` : "/images/placeholder-user.jpg"} // Placeholder logic, ideally avatar URL comes from user object
                    alt={currentUser?.full_name || "User Avatar"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-0">{children}</div>
      </main>
    </div>
  )
}
