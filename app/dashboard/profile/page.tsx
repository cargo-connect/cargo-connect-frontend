"use client"

import type React from "react"
import { useState, useEffect } from "react" // Added useEffect
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Edit, User, Settings, Bell, Lock, Trash2, X, MessageSquare, Package } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card" // Added CardHeader, CardFooter
import { Button } from "@/components/ui/button"
import { IconLabel } from "@/components/ui/icon-label"
import { FormField, Input, Select, Textarea } from "@/components/ui/form" // Added Select, Textarea

// Define interfaces for the data structures (replace with actual types if available)
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince?: string; // Optional example
}

interface NotificationSettings {
  deliveryUpdates: boolean;
  promotions: boolean;
  accountActivity: boolean;
  // emailNotifications: boolean; // Assuming these might come from a settings endpoint
  // pushNotifications: boolean;
}

interface Preferences {
  language: string;
  currency: string;
  theme: string;
  defaultPayment: string;
}

export default function ProfilePage() {
  // Modal visibility states
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showNotification, setShowNotification] = useState(false) // This seems like a generic success/update notification
  const [showContactSupport, setShowContactSupport] = useState(false)

  // State for initial page load
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  // State for actual data (initialized as null)
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [supportMessage, setSupportMessage] = useState("");

  // State for specific actions/modals
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [updateProfileError, setUpdateProfileError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState(""); // For delete confirmation
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [savePreferencesError, setSavePreferencesError] = useState<string | null>(null);
  const [isSendingSupport, setIsSendingSupport] = useState(false);
  const [sendSupportError, setSendSupportError] = useState<string | null>(null);

  // Temporary state for editing profile data within the modal
  const [editFormData, setEditFormData] = useState<ProfileData | null>(null);

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingPage(true);
      setPageError(null);
      try {
        // --- Placeholder for actual API calls ---
        console.log("Fetching initial profile page data...");
        // const profileRes = await fetch('/api/user/profile');
        // if (!profileRes.ok) throw new Error('Failed to load profile data');
        // const profileResult = await profileRes.json();

        // const settingsRes = await fetch('/api/user/settings'); // Assuming settings includes notifications/prefs
        // if (!settingsRes.ok) throw new Error('Failed to load settings data');
        // const settingsResult = await settingsRes.json();
        // --- End Placeholder ---

        // Simulate API delay and data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const simulatedProfileData: ProfileData = {
          name: "Joy Williams",
          email: "joy.williams@example.com",
          phone: "+234 123 456 7890",
          address: "123 Main Street, Lekki Phase 1, Lagos, Nigeria",
          memberSince: "March 2025"
        };
        const simulatedNotificationSettings: NotificationSettings = {
          deliveryUpdates: true,
          promotions: false,
          accountActivity: true,
        };
        const simulatedPreferences: Preferences = {
          language: "English",
          currency: "NGN",
          theme: "Light",
          defaultPayment: "Card",
        };

        setProfileData(simulatedProfileData);
        setNotificationSettings(simulatedNotificationSettings);
        setPreferences(simulatedPreferences);
        setEditFormData(simulatedProfileData); // Initialize edit form state

      } catch (err: any) {
        console.error("Failed to fetch profile page data:", err);
        setPageError(err.message || "Could not load profile information.");
      } finally {
        setIsLoadingPage(false);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Open Edit Profile Modal Handler
  const handleOpenEditProfile = () => {
    setEditFormData(profileData); // Reset edit form to current profile data
    setUpdateProfileError(null); // Clear previous errors
    setShowEditProfile(true);
  };

  // Handle changes within the Edit Profile modal form
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Handle form changes (for other forms like password, preferences, support)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    // This should likely trigger an API call immediately or have a save button
    // For now, just update local state
    setNotificationSettings((prev) => (prev ? { ...prev, [setting]: !prev[setting] } : null));
    // TODO: Add API call here to save notification settings if needed
    console.log("Notification setting changed (needs API call):", setting);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // --- Updated Form Submission Handlers ---

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return; // Should not happen if modal is open

    setIsUpdatingProfile(true);
    setUpdateProfileError(null);

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to update profile with:", editFormData);
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editFormData),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to update profile');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      // On success: update the main profileData state and close modal
      setProfileData(editFormData);
      setShowEditProfile(false);
      // Optionally show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

    } catch (err: any) {
      console.error("Update profile error:", err);
      setUpdateProfileError(err.message || "Could not update profile.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setChangePasswordError(null);

    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setChangePasswordError("New passwords do not match.");
      setIsChangingPassword(false);
      return;
    }
    if (passwordData.newPassword.length < 8) {
       setChangePasswordError("New password must be at least 8 characters.");
       setIsChangingPassword(false);
       return;
    }

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to change password");
      // const response = await fetch('/api/auth/change-password', { // Example endpoint
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(passwordData),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to change password');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setShowChangePassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Clear form
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

    } catch (err: any) {
      console.error("Change password error:", err);
      setChangePasswordError(err.message || "Could not change password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmInput !== 'delete') {
        setDeleteAccountError("Please type 'delete' to confirm.");
        return;
    }
    setIsDeletingAccount(true);
    setDeleteAccountError(null);

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to delete account");
      // const response = await fetch('/api/user/account', { method: 'DELETE' }); // Example endpoint
      // if (!response.ok) {
      //    const result = await response.json().catch(() => ({})); // Try to get error message
      //    throw new Error(result.error?.message || 'Failed to delete account');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setShowDeleteConfirm(false);
      // Redirect to login page or show confirmation
      // router.push('/auth/login?deleted=true'); // Example redirect

    } catch (err: any) {
       console.error("Delete account error:", err);
       setDeleteAccountError(err.message || "Could not delete account.");
    } finally {
       setIsDeletingAccount(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences) return;

    setIsSavingPreferences(true);
    setSavePreferencesError(null);

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to save preferences:", preferences);
      // const response = await fetch('/api/user/preferences', { // Example endpoint
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(preferences),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to save preferences');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setShowPreferences(false);
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

    } catch (err: any) {
      console.error("Save preferences error:", err);
      setSavePreferencesError(err.message || "Could not save preferences.");
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const handleSubmitSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingSupport(true);
    setSendSupportError(null);
    const topic = (e.target as HTMLFormElement).supportTopic.value; // Get topic from form

    try {
      // --- Placeholder for actual API call ---
      console.log("Attempting to submit support message:", { topic, message: supportMessage });
      // const response = await fetch('/api/support', { // Example endpoint
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ topic, message: supportMessage }),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error?.message || 'Failed to send message');
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setShowContactSupport(false);
      setSupportMessage(""); // Clear message field
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

    } catch (err: any) {
      console.error("Submit support error:", err);
      setSendSupportError(err.message || "Could not send message.");
    } finally {
      setIsSendingSupport(false);
    }
  };

  // --- Render Logic ---

  if (isLoadingPage) {
    return <div className="p-6 text-center">Loading profile information...</div>; // Or use a Skeleton loader
  }

  if (pageError) {
    return <div className="p-6 text-center text-red-600">Error loading profile: {pageError}</div>;
  }

  if (!profileData || !notificationSettings || !preferences) {
    // This case should ideally not be reached if loading/error states are handled properly
    return <div className="p-6 text-center">Could not load profile data.</div>;
  }

  // --- Main Component Return ---
  return (
    <div className="p-6">
      {/* Notification Popup (Generic Success/Update) */}
      {showNotification && (
        <div className="fixed top-20 right-6 bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-lg p-4 z-50 w-80 animate-in slide-in-from-right">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium">Success</h4>
            <button onClick={() => setShowNotification(false)} className="text-green-800 hover:text-green-900">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm">Your changes have been saved.</p>
          {/* Example of specific message (could be passed via state) */}
          {/* <p className="text-sm text-gray-600 mb-2">
            Your package is on the way... (This seems out of place here)
          </p>
          <Link href="/dashboard/track" className="text-primary text-sm hover:underline">
            Track delivery
          </Link> */}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture & Actions */}
        <div className="flex flex-col items-center md:w-1/4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {/* Placeholder or actual image */}
              <Image
                src="/images/user-avatar.png" // Use actual image source if available in profileData
                alt="User Avatar"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
              onClick={handleOpenEditProfile}
              aria-label="Edit profile picture"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-xl font-medium mt-4">{profileData.name}</h3>
          <p className="text-sm text-gray-500">Member since {profileData.memberSince || "N/A"}</p>

          {/* Action Buttons */}
          <div className="mt-6 w-full space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleOpenEditProfile}>
              <User className="w-5 h-5 text-primary" /><span>Edit Profile</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setChangePasswordError(null); setShowChangePassword(true); }}>
              <Lock className="w-5 h-5 text-primary" /><span>Change Password</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setSavePreferencesError(null); setShowPreferences(true); }}>
              <Settings className="w-5 h-5 text-primary" /><span>Preferences</span>
            </Button>
             <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setSendSupportError(null); setShowContactSupport(true); }}>
              <MessageSquare className="w-5 h-5 text-primary" /><span>Contact Support</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => { setDeleteAccountError(null); setDeleteConfirmInput(''); setShowDeleteConfirm(true); }}>
              <Trash2 className="w-5 h-5" /><span>Delete Account</span>
            </Button>
          </div>
        </div>

        {/* Profile Details & Settings */}
        <div className="flex-1">
          {/* Personal Information */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Button variant="ghost" className="flex items-center gap-1" onClick={handleOpenEditProfile}>
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card><IconLabel icon={<Mail className="w-5 h-5 text-primary" />} label={profileData.email} description="Email" /></Card>
            <Card><IconLabel icon={<Phone className="w-5 h-5 text-primary" />} label={profileData.phone} description="Phone" /></Card>
            <Card className="md:col-span-2"><IconLabel icon={<MapPin className="w-5 h-5 text-primary" />} label={profileData.address} description="Address" /></Card>
          </div>

          {/* Notification Settings */}
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <Card className="p-6 space-y-4 mb-8">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <IconLabel
                  icon={<Bell className="w-5 h-5 text-primary" />}
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // Format key to label
                  description={`Get notified about ${key.toLowerCase().replace(/([A-Z])/g, ' $1')}`}
                />
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                    // Add disabled state if saving notifications requires a separate action
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
             {/* TODO: Add save button for notification settings if needed */}
          </Card>

          {/* Payment Methods (Placeholder) */}
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <IconLabel
                icon={<svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" /></svg>}
                label="**** **** **** 4321"
                description="Expires 12/25"
              />
              <Button variant="ghost">Edit</Button>
            </div>
          </Card>
          <Button variant="outline">Add Payment Method</Button>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Edit Profile Modal */}
      {showEditProfile && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700" disabled={isUpdatingProfile}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <FormField label="Full Name" htmlFor="name">
                <Input type="text" id="name" name="name" value={editFormData.name} onChange={handleEditFormChange} required disabled={isUpdatingProfile} />
              </FormField>
              <FormField label="Email" htmlFor="email">
                <Input type="email" id="email" name="email" value={editFormData.email} onChange={handleEditFormChange} required disabled={isUpdatingProfile} />
              </FormField>
              <FormField label="Phone" htmlFor="phone">
                <Input type="tel" id="phone" name="phone" value={editFormData.phone} onChange={handleEditFormChange} required disabled={isUpdatingProfile} />
              </FormField>
              <FormField label="Address" htmlFor="address">
                <Input type="text" id="address" name="address" value={editFormData.address} onChange={handleEditFormChange} required disabled={isUpdatingProfile} />
              </FormField>
              {updateProfileError && <p className="text-sm text-red-600">{updateProfileError}</p>}
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowEditProfile(false)} disabled={isUpdatingProfile}>Cancel</Button>
                <Button type="submit" disabled={isUpdatingProfile}>{isUpdatingProfile ? 'Saving...' : 'Save Changes'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg max-w-md w-full p-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-semibold">Change Password</h3>
               <button onClick={() => setShowChangePassword(false)} className="text-gray-500 hover:text-gray-700" disabled={isChangingPassword}>
                 <X className="w-5 h-5" />
               </button>
             </div>
             <form onSubmit={handleChangePassword} className="space-y-4">
               <FormField label="Current Password" htmlFor="currentPassword">
                 <Input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required disabled={isChangingPassword} />
               </FormField>
               <FormField label="New Password" htmlFor="newPassword">
                 <Input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required minLength={8} disabled={isChangingPassword} />
               </FormField>
               <FormField label="Confirm New Password" htmlFor="confirmPassword">
                 <Input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required disabled={isChangingPassword} />
               </FormField>
               {changePasswordError && <p className="text-sm text-red-600">{changePasswordError}</p>}
               <div className="flex justify-end space-x-3 pt-4">
                 <Button type="button" variant="outline" onClick={() => setShowChangePassword(false)} disabled={isChangingPassword}>Cancel</Button>
                 <Button type="submit" disabled={isChangingPassword}>{isChangingPassword ? 'Updating...' : 'Update Password'}</Button>
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
              <h3 className="text-xl font-semibold text-red-600">Delete Account</h3>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 hover:text-gray-700" disabled={isDeletingAccount}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">Are you sure? This action cannot be undone.</p>
              <FormField label="Please type 'delete' to confirm." htmlFor="deleteConfirm">
                 <Input
                   type="text"
                   id="deleteConfirm"
                   value={deleteConfirmInput}
                   onChange={(e) => setDeleteConfirmInput(e.target.value)}
                   className="focus:ring-red-500"
                   placeholder="delete"
                   disabled={isDeletingAccount}
                 />
              </FormField>
              {deleteAccountError && <p className="text-sm text-red-600 mt-2">{deleteAccountError}</p>}
            </div>
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeletingAccount}>Cancel</Button>
              <Button variant="danger" onClick={handleDeleteAccount} disabled={isDeletingAccount || deleteConfirmInput !== 'delete'}>
                {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && preferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="text-gray-500 hover:text-gray-700" disabled={isSavingPreferences}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePreferences} className="space-y-4">
              <FormField label="Language" htmlFor="language">
                <Select id="language" name="language" value={preferences.language} onChange={handlePreferenceChange} disabled={isSavingPreferences}>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Arabic">Arabic</option>
                </Select>
              </FormField>
              <FormField label="Currency" htmlFor="currency">
                 <Select id="currency" name="currency" value={preferences.currency} onChange={handlePreferenceChange} disabled={isSavingPreferences}>
                   <option value="NGN">Nigerian Naira (₦)</option>
                   <option value="USD">US Dollar ($)</option>
                   <option value="EUR">Euro (€)</option>
                   <option value="GBP">British Pound (£)</option>
                 </Select>
              </FormField>
              <FormField label="Theme" htmlFor="theme">
                 <Select id="theme" name="theme" value={preferences.theme} onChange={handlePreferenceChange} disabled={isSavingPreferences}>
                   <option value="Light">Light</option>
                   <option value="Dark">Dark</option>
                   <option value="System">System Default</option>
                 </Select>
              </FormField>
              <FormField label="Default Payment Method" htmlFor="defaultPayment">
                 <Select id="defaultPayment" name="defaultPayment" value={preferences.defaultPayment} onChange={handlePreferenceChange} disabled={isSavingPreferences}>
                   <option value="Card">Credit/Debit Card</option>
                   <option value="Cash">Cash on Delivery</option>
                   <option value="Bank">Bank Transfer</option>
                 </Select>
              </FormField>
              {savePreferencesError && <p className="text-sm text-red-600">{savePreferencesError}</p>}
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowPreferences(false)} disabled={isSavingPreferences}>Cancel</Button>
                <Button type="submit" disabled={isSavingPreferences}>{isSavingPreferences ? 'Saving...' : 'Save Preferences'}</Button>
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
              <button onClick={() => setShowContactSupport(false)} className="text-gray-500 hover:text-gray-700" disabled={isSendingSupport}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitSupport} className="space-y-4">
              <FormField label="Topic" htmlFor="supportTopic">
                <Select id="supportTopic" name="supportTopic" defaultValue="delivery" disabled={isSendingSupport}>
                  <option value="delivery">Delivery Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="account">Account Help</option>
                  <option value="other">Other</option>
                </Select>
              </FormField>
              <FormField label="Message" htmlFor="supportMessage">
                <Textarea
                  id="supportMessage"
                  name="supportMessage"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={4}
                  required
                  disabled={isSendingSupport}
                />
              </FormField>
              {sendSupportError && <p className="text-sm text-red-600">{sendSupportError}</p>}
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowContactSupport(false)} disabled={isSendingSupport}>Cancel</Button>
                <Button type="submit" disabled={isSendingSupport}>{isSendingSupport ? 'Sending...' : 'Send Message'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
