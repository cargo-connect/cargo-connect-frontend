"use client"

import { useState, useEffect } from "react" // Added useEffect
import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, ChevronRight, AlertCircle, Loader2 } from "lucide-react" // Added AlertCircle, Loader2
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { IconLabel } from "@/components/ui/icon-label" // Assuming this component exists and works

// Define interface for settings data
interface UserSettings {
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  language?: string; // Optional if fetched here
}

export default function Settings() {
  // State for fetched settings
  const [settings, setSettings] = useState<UserSettings | null>(null);
  // State for initial page load
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  // State for individual setting updates
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [isSavingDarkMode, setIsSavingDarkMode] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null); // General save error

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoadingPage(true);
      setPageError(null);
      try {
        // --- Placeholder for actual API call ---
        console.log("Fetching user settings...");
        // const response = await fetch('/api/user/settings');
        // if (!response.ok) {
        //   throw new Error('Failed to load settings');
        // }
        // const data = await response.json();
        // setSettings(data.settings); // Assuming API returns { settings: {...} }
        // --- End Placeholder ---

        // Simulate API delay and data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const simulatedSettings: UserSettings = {
          notificationsEnabled: true,
          darkModeEnabled: false,
          language: "English (US)", // Example if language is part of settings
        };
        setSettings(simulatedSettings);

      } catch (err: any) {
        console.error("Failed to fetch settings:", err);
        setPageError(err.message || "Could not load settings.");
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchSettings();
  }, []);

  // Handler for saving a setting change
  const handleSettingChange = async (settingName: keyof UserSettings, newValue: boolean) => {
    // Optimistically update UI state
    setSettings(prev => prev ? { ...prev, [settingName]: newValue } : null);
    setSaveError(null); // Clear previous save errors

    // Set specific loading state
    if (settingName === 'notificationsEnabled') setIsSavingNotifications(true);
    if (settingName === 'darkModeEnabled') setIsSavingDarkMode(true);

    try {
      // --- Placeholder for actual API call ---
      console.log(`Saving setting: ${settingName} = ${newValue}`);
      // const response = await fetch('/api/user/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ [settingName]: newValue }), // Send only the changed setting
      // });
      // if (!response.ok) {
      //    const result = await response.json().catch(() => ({}));
      //    throw new Error(result.error?.message || `Failed to save ${settingName}`);
      // }
      // --- End Placeholder ---

      await new Promise(resolve => setTimeout(resolve, 700)); // Simulate save delay
      // Optional: Show success feedback?

    } catch (err: any) {
      console.error(`Failed to save ${settingName}:`, err);
      setSaveError(err.message || "Failed to save setting.");
      // Revert optimistic update on error
      setSettings(prev => prev ? { ...prev, [settingName]: !newValue } : null);
    } finally {
      // Clear specific loading state
      if (settingName === 'notificationsEnabled') setIsSavingNotifications(false);
      if (settingName === 'darkModeEnabled') setIsSavingDarkMode(false);
    }
  };

  // --- Render Logic ---

  if (isLoadingPage) {
    return <div className="p-6 text-center text-gray-500">Loading settings...</div>;
  }

  if (pageError) {
    return (
      <div className="p-4">
         <div className="flex items-center mb-6">
           <Link href="/dashboard" className="mr-2 text-primary hover:underline"><ArrowLeft size={20} /></Link>
           <h1 className="text-xl font-bold text-red-600">Error</h1>
         </div>
         <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
           <AlertCircle className="w-5 h-5 mr-2" />
           <span>{pageError}</span>
        </div>
      </div>
    );
  }

  if (!settings) {
    return <div className="p-6 text-center text-gray-500">Settings data not available.</div>;
  }

  // --- Main Component Return ---
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-2 p-1 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Display general save error */}
      {saveError && (
         <div className="mb-4 flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
           <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
           <span>{saveError}</span>
        </div>
      )}

      {/* Settings sections */}
      <div className="space-y-6">
        {/* Notifications */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <IconLabel
                icon={<Bell size={20} className="text-primary" />}
                label="Notifications"
                description="Manage notification preferences"
              />
              <div className="flex items-center">
                 {isSavingNotifications && <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-400" />}
                 <label className="relative inline-flex items-center cursor-pointer">
                   <input
                     type="checkbox"
                     className="sr-only peer"
                     checked={settings.notificationsEnabled}
                     onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                     disabled={isSavingNotifications || isSavingDarkMode} // Disable while any save is happening
                   />
                   <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${isSavingNotifications || isSavingDarkMode ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                 </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <IconLabel
                icon={<Moon size={20} className="text-primary" />}
                label="Dark Mode"
                description="Toggle dark theme"
              />
               <div className="flex items-center">
                 {isSavingDarkMode && <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-400" />}
                 <label className="relative inline-flex items-center cursor-pointer">
                   <input
                     type="checkbox"
                     className="sr-only peer"
                     checked={settings.darkModeEnabled}
                     onChange={(e) => handleSettingChange('darkModeEnabled', e.target.checked)}
                     disabled={isSavingNotifications || isSavingDarkMode}
                   />
                   <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${isSavingNotifications || isSavingDarkMode ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                 </label>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Link href="/dashboard/settings/language" className="block">
          <Card className="hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <IconLabel
                  icon={<Globe size={20} className="text-primary" />}
                  label="Language"
                  description={settings.language || "Select Language"}
                />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Privacy & Security */}
        <Link href="/dashboard/settings/privacy" className="block">
          <Card className="hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <IconLabel
                  icon={<Shield size={20} className="text-primary" />}
                  label="Privacy & Security"
                  description="Manage your data and security"
                />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Help & Support */}
        <Link href="/dashboard/settings/help" className="block">
          <Card className="hover:border-primary transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <IconLabel
                  icon={<HelpCircle size={20} className="text-primary" />}
                  label="Help & Support"
                  description="Get help and contact support"
                />
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* App version */}
      <p className="text-center text-sm text-gray-500 mt-8">Version 1.0.0</p>
    </div>
  )
}
