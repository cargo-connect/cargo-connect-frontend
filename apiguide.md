### Comprehensive API Guide for Cargo Connect

## API Structure in Next.js App Router


### Planned API Endpoints Map for Cargo Connect


#### Authentication APIs

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - OTP verification


#### Delivery APIs

- `POST /api/deliveries` - Create new delivery
- `GET /api/deliveries` - List all deliveries
- `GET /api/deliveries/[id]` - Get specific delivery details
- `PUT /api/deliveries/[id]` - Update specific delivery
- `GET /api/deliveries/track` - Track delivery status


#### Booking APIs

- `POST /api/booking/calculate` - Calculate delivery price
- `POST /api/booking/confirm` - Confirm booking


#### Shipment APIs

- `GET /api/shipments` - List shipments
- `GET /api/shipments/[id]` - Get specific shipment details
- `PUT /api/shipments/[id]` - Update specific shipment
- `GET /api/shipments/[id]/tracking` - Get tracking events for a shipment


#### User Profile APIs

- `GET /api/user/profile` - Get user profile
- `GET /api/user/settings` - Get user settings
- `PUT /api/user/settings` - Update user settings
- `GET /api/user/notifications` - Get user notifications
- `PUT /api/user/notifications` - Update user notifications



#### Payment APIs

- `GET /api/payments/methods` - List payment methods
- `POST /api/payments/process` - Process a payment
- `GET /api/payments/status` - Get payment status


### HTTP Methods by Endpoint

| Endpoint | GET | POST | PUT | DELETE | PATCH |
|-----|-----|-----|-----|-----|-----|
| `/api/auth/signup` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/auth/login` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/auth/verify` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/deliveries` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/api/deliveries/[id]` | ✅ | ❌ | ✅ | ✅ | ✅ |
| `/api/deliveries/track` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/api/booking/calculate` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/api/booking/confirm` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/shipments` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `/api/shipments/[id]` | ✅ | ❌ | ✅ | ✅ | ✅ |
| `/api/shipments/[id]/tracking` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/api/user/profile` | ✅ | ❌ | ✅ | ❌ | ✅ |
| `/api/user/settings` | ✅ | ❌ | ✅ | ❌ | ✅ |
| `/api/payments/methods` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `/api/payments/process` | ❌ | ✅ | ❌ | ❌ | ❌ |


### HTTP Methods & Route Handlers

Each route file exports functions named after HTTP methods:

```typescript
// Example route handler
export async function GET(request: Request) {
  // Handle GET request
  return Response.json({ data: [...] })
}

export async function POST(request: Request) {
  // Handle POST request
  const data = await request.json()
  // Process data
  return Response.json({ success: true, id: "new-id" })
}
```

### Request/Response Patterns

#### Example: Creating a Delivery

**Request (POST to `/api/deliveries`):**

```json
{
  "pickupAddress": "Satelite town, Amuwo Odofin",
  "deliveryAddress": "Festac town, Amuwo Odofin",
  "vehicleType": "motorcycle",
  "packageType": "electronics",
  "isFragile": true,
  "senderDetails": {
    "name": "Favour",
    "phone": "08123456789"
  },
  "receiverDetails": {
    "name": "Joy",
    "phone": "08198765432"
  },
  "paymentMethod": "delivery"
}
```

**Response:**

```json
{
  "success": true,
  "deliveryId": "12345",
  "trackingNumber": "CC-12345",
  "estimatedDelivery": "2023-04-15T16:30:00Z",
  "price": 4500
}
```

#### Example: Tracking a Shipment

**Request (GET to `/api/shipments/12345/tracking`):**

**Response:**

```json
{
  "trackingNumber": "CC-12345",
  "status": "In Transit",
  "currentLocation": {
    "latitude": 6.5,
    "longitude": 3.33
  },
  "events": [
    {
      "status": "Picked Up",
      "location": "Satelite town, Amuwo Odofin",
      "timestamp": "2023-04-15T14:30:00Z"
    },
    {
      "status": "In Transit",
      "location": "En route to destination",
      "timestamp": "2023-04-15T15:15:00Z"
    }
  ],
  "estimatedDelivery": "2023-04-15T16:30:00Z"
}
```

### Error Handling

Consistent error responses should follow this pattern:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "The delivery address is required"
  }
}
```

Common error codes:

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `INVALID_INPUT` - Validation error
- `PAYMENT_FAILED` - Payment processing error


### Authentication & Authorization

API routes requiring authentication should:

1. Check for a valid JWT token in the Authorization header
2. Verify the token and extract the user ID
3. Check if the user has permission to access the requested resource


Example middleware pattern:

```typescript
import { getToken } from 'next-auth/jwt'

export async function withAuth(request: Request, handler: Function) {
  const token = await getToken({ req: request })
  
  if (!token) {
    return Response.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    )
  }
  
  return handler(request, token)
}
```

### Implementation Example

Here's how you might implement the shipments API:

```typescript
// app/api/shipments/route.ts
export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  
  // Fetch shipments from database based on filters
  const shipments = await fetchShipmentsFromDB({ status })
  
  return Response.json({ shipments })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate input
    if (!data.origin || !data.destination) {
      return Response.json(
        { 
          success: false, 
          error: { code: 'INVALID_INPUT', message: 'Origin and destination are required' } 
        },
        { status: 400 }
      )
    }
    
    // Create shipment in database
    const shipment = await createShipmentInDB(data)
    
    return Response.json({ success: true, shipment })
  } catch (error) {
    return Response.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create shipment' } },
      { status: 500 }
    )
  }
}
```

This comprehensive guide should help you understand where and how to implement API endpoints in your Cargo Connect project using Next.js App Router.

### How I Identified API Endpoint Needs


1. UI Components That Fetch Data: The application has pages for tracking shipments, viewing delivery history, and managing bookings - all of which would need data from a backend.
2. Form Submissions: I noticed forms for user registration, login, booking deliveries, and updating profiles. These forms would submit data to API endpoints.
State Management Patterns: The code contains state variables and form handlers that would typically connect to API endpoints in a production application.
Application Domain Knowledge: Based on the nature of the application (logistics/delivery service), I identified standard operations like tracking, booking, and user management that would require API endpoints.
Page Structure: The routing structure (like /dashboard/shipments/[id]) suggests dynamic data that would be fetched from an API.
For example, in app/dashboard/track/page.tsx, there's tracking data that would realistically come from an API:

// Sample tracking data - in a real app, this would come from your backend
const trackingData = {
  rider: {
    name: "Chidera",
    phone: "+2349876543211",
    location: {
      latitude: 6.5244,
      longitude: 3.3792,
    },
  },
  // ...
}
Similarly, in app/dashboard/shipments/page.tsx, there's shipment data that would be fetched from an API.

MongoDB Integration
MongoDB would integrate with your Next.js application as follows:

1. Database Connection
You would establish a connection to MongoDB, typically in a utility file:

// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
2. Data Models
You would define data models that match your application's entities:

// models/types.ts
export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string; // Hashed
  createdAt: Date;
}

export interface Delivery {
  _id?: string;
  trackingNumber: string;
  userId: string;
  vehicleType: 'motorcycle' | 'car' | 'van';
  packageType: string;
  isFragile: boolean;
  pickupAddress: string;
  deliveryAddress: string;
  senderDetails: {
    name: string;
    phone: string;
  };
  receiverDetails: {
    name: string;
    phone: string;
  };
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  paymentMethod: string;
  price: number;
  createdAt: Date;
  estimatedDelivery: Date;
}

// More models for Shipment, TrackingEvent, etc.
3. Database Operations
You would create functions to interact with MongoDB:

// lib/db-operations.ts
import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'
import type { Delivery } from '../models/types'

export async function getDeliveries(userId: string) {
  const client = await clientPromise
  const db = client.db('cargo-connect')
  
  return db
    .collection('deliveries')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getDeliveryById(id: string) {
  const client = await clientPromise
  const db = client.db('cargo-connect')
  
  return db
    .collection('deliveries')
    .findOne({ _id: new ObjectId(id) })
}

export async function createDelivery(delivery: Delivery) {
  const client = await clientPromise
  const db = client.db('cargo-connect')
  
  const result = await db
    .collection('deliveries')
    .insertOne(delivery)
    
  return result.insertedId
}

// More functions for updating, deleting, etc.
4. API Integration
You would use these database operations in your API routes:

// app/api/deliveries/route.ts
import { getDeliveries, createDelivery } from '@/lib/db-operations'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const deliveries = await getDeliveries(session.user.id)
  return Response.json({ deliveries })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await request.json()
  const deliveryId = await createDelivery({
    ...data,
    userId: session.user.id,
    createdAt: new Date(),
    status: 'pending',
    trackingNumber: `CC-${Math.floor(Math.random() * 100000)}`
  })
  
  return Response.json({ success: true, deliveryId })
}
5. Environment Setup
You would need to add MongoDB connection details to your environment variables:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cargo-connect?retryWrites=true&w=majority
This approach allows your Next.js application to connect to MongoDB and perform CRUD operations through your API endpoints, while keeping the database logic separate from your UI components.

