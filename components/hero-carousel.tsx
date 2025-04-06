"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

// Define the carousel items
const carouselItems = [
  {
    id: 1,
    title: "Welcome to Cargo Connect",
    description: "Fast, reliable logistics at your fingertips",
    image: "/images/hero-motorcycle.jpg",
    imageAlt: "Delivery motorcycle rider in blue jacket with delivery box",
  },
  {
    id: 2,
    title: "Welcome to Cargo Connect",
    description: "Streamlined shipping solutions for your business",
    image: "/images/hero-trucks.jpg",
    imageAlt: "Cargo trucks and shipping containers at a logistics yard",
  },
  {
    id: 3,
    title: "Welcome to Cargo Connect",
    description: "Connecting you with reliable carriers",
    image: "/images/hero-woman.jpg",
    imageAlt: "Woman using smartphone for delivery services",
  },
  {
    id: 4,
    title: "Welcome to Cargo Connect",
    description: "Track your deliveries in real-time",
    image: "/images/hero-phone.jpg",
    imageAlt: "Phone showing successful payment screen",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Carousel slides */}
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.imageAlt}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{item.title}</h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-md">{item.description}</p>
            <Link href="/auth/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

