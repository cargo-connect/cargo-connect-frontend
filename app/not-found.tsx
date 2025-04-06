import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <Image src="/images/not-found.svg" alt="Page not found" width={250} height={250} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>

      <Link href="/" className="btn-primary">
        Go to Home
      </Link>
    </div>
  )
}

