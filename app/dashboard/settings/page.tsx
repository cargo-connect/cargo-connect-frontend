"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { IconLabel } from "@/components/ui/icon-label"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

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
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
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
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
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
                  description="English (US)"
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

