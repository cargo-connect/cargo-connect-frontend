"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLogin = pathname === "/auth/login"

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className={`w-full md:w-1/2 ${isLogin ? "order-1" : "order-2"}`}>{children}</div>

      {/* Right side - Blue curved background */}
      <div
        className={`w-full md:w-1/2 bg-primary ${isLogin ? "order-2 md:rounded-l-[3rem]" : "order-1 md:rounded-r-[3rem]"} relative overflow-hidden flex items-center justify-center`}
      >
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          {isLogin ? (
            <div className="hidden md:block">
              <Image
                src="/images/logo-white.png"
                alt="Cargo Connect Logo"
                width={220}
                height={50}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="hidden md:block">
              <Image
                src="/images/logo-white.png"
                alt="Cargo Connect Logo"
                width={220}
                height={50}
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div className="text-white text-center p-8 max-w-md">
          {isLogin ? (
            <>
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-12">Login your account by entering your details</p>
              <div className="mt-8">
                <p className="mb-4">Don't have an account?</p>
                <Link
                  href="/auth/signup"
                  className="inline-block bg-white text-primary font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4">Get Started</h2>
              <p className="mb-12">Get started with cargo connect with these few steps</p>
              <div className="mt-8">
                <p className="mb-4">Already a user?</p>
                <Link
                  href="/auth/login"
                  className="inline-block bg-white text-primary font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

