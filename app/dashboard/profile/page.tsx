"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Edit, User, Settings, Bell, Lock, Trash2, X, MessageSquare, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconLabel } from "@/components/ui/icon-label"
import { FormField, Input } from "@/components/ui/form"

export default function ProfilePage() {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showContactSupport, setShowContactSupport] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: "Joy Williams",
    email: "joy.williams@example.com",
    phone: "+234 123 456 7890",
    address: "123 Main Street, Lekki Phase 1, Lagos, Nigeria",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    deliveryUpdates: true,
    promotions: false,
    accountActivity: true,
    emailNotifications: true,
    pushNotifications: true,
  })

  const [preferences, setPreferences] = useState({
    language: "English",
    currency: "NGN",
    theme: "Light",
    defaultPayment: "Card",
  })

  const [supportMessage, setSupportMessage] = useState("")

  // Handle form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))
  }

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submissions
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the profile here
    setShowEditProfile(false)
    // Show success notification
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would change the password here
    setShowChangePassword(false)
    // Show success notification
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const handleDeleteAccount = () => {
    // In a real app, you would delete the account here
    setShowDeleteConfirm(false)
    // Redirect to login page or show confirmation
  }

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save preferences here
    setShowPreferences(false)
    // Show success notification
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the support message here
    setShowContactSupport(false)
    setSupportMessage("")
    // Show success notification
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  return (
    <div className="p-6">
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-20 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80 animate-in slide-in-from-right">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <Package className="w-5 h-5 text-primary mr-2" />
              <h4 className="font-medium">Delivery Update</h4>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Your package is on the way to you. Chidera will arrive in approximately 15 minutes.
          </p>
          <Link href="/dashboard/track" className="text-primary text-sm hover:underline">
            Track delivery
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/images/user-avatar.png"
                alt="User Avatar"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full"
              onClick={() => setShowEditProfile(true)}
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-xl font-medium mt-4">{profileData.name}</h3>
          <p className="text-sm text-gray-500">Member since March 2025</p>

          <div className="mt-6 w-full space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => setShowEditProfile(true)}
            >
              <User className="w-5 h-5 text-primary" />
              <span>Edit Profile</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => setShowChangePassword(true)}
            >
              <Lock className="w-5 h-5 text-primary" />
              <span>Change Password</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => setShowPreferences(true)}
            >
              <Settings className="w-5 h-5 text-primary" />
              <span>Preferences</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => setShowContactSupport(true)}
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Contact Support</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-start border-red-200 text-red-500 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </Button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Button variant="ghost" className="flex items-center" onClick={() => setShowEditProfile(true)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <IconLabel
                icon={<Mail className="w-5 h-5 text-primary" />}
                label={profileData.email}
                description="Email"
              />
            </Card>

            <Card>
              <IconLabel
                icon={<Phone className="w-5 h-5 text-primary" />}
                label={profileData.phone}
                description="Phone"
              />
            </Card>

            <Card className="md:col-span-2">
              <IconLabel
                icon={<MapPin className="w-5 h-5 text-primary" />}
                label={profileData.address}
                description="Address"
              />
            </Card>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Notification Settings</h2>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <IconLabel
                icon={<Bell className="w-5 h-5 text-primary" />}
                label="Delivery Updates"
                description="Get notified about your delivery status"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.deliveryUpdates}
                  onChange={() => handleNotificationChange("deliveryUpdates")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <IconLabel
                icon={<Bell className="w-5 h-5 text-primary" />}
                label="Promotions & Offers"
                description="Receive promotional offers and discounts"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.promotions}
                  onChange={() => handleNotificationChange("promotions")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <IconLabel
                icon={<Bell className="w-5 h-5 text-primary" />}
                label="Account Activity"
                description="Get notified about account activities"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.accountActivity}
                  onChange={() => handleNotificationChange("accountActivity")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </Card>

          <h2 className="text-xl font-semibold mt-8 mb-4">Payment Methods</h2>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <IconLabel
                icon={
                  <svg
                    className="w-5 h-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                }
                label="**** **** **** 4321"
                description="Expires 12/25"
              />
              <Button variant="ghost">Edit</Button>
            </div>
          </Card>

          <Button variant="outline" className="mt-4">
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <FormField label="Full Name" htmlFor="name">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </FormField>

              <FormField label="Email" htmlFor="email">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </FormField>

              <FormField label="Phone" htmlFor="phone">
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  required
                />
              </FormField>

              <FormField label="Address" htmlFor="address">
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  required
                />
              </FormField>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowEditProfile(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the modals remain unchanged for now */}
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <button onClick={() => setShowChangePassword(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-500">Delete Account</h3>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be
                permanently removed.
              </p>
              <p className="text-gray-700">
                Please type <strong>delete</strong> to confirm.
              </p>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Type 'delete' to confirm"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={preferences.currency}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={preferences.theme}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                  <option value="System">System Default</option>
                </select>
              </div>

              <div>
                <label htmlFor="defaultPayment" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Payment Method
                </label>
                <select
                  id="defaultPayment"
                  name="defaultPayment"
                  value={preferences.defaultPayment}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Card">Credit/Debit Card</option>
                  <option value="Cash">Cash on Delivery</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {showContactSupport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Contact Support</h3>
              <button onClick={() => setShowContactSupport(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitSupport} className="space-y-4">
              <div>
                <label htmlFor="supportTopic" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <select
                  id="supportTopic"
                  name="supportTopic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="delivery">Delivery Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="account">Account Help</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="supportMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="supportMessage"
                  name="supportMessage"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactSupport(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

