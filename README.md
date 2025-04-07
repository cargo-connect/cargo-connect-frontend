# Cargo Connect
A modern logistics and delivery management platform built with Next.js.

![Cargo Connect Logo](public/images/logo.png)

## Overview

Cargo Connect is a comprehensive logistics platform that connects users with delivery services. The application allows users to book deliveries, track shipments in real-time, manage their delivery history, and maintain their profile information.

## Features
This application provides a comprehensive workflow for cargo shipment management:

*   **User Authentication:** Secure sign-up and login (`app/auth/`) process to access the dashboard.
*   **Dashboard Overview:** A central hub (`app/dashboard/`) for accessing all user-specific features after login.
*   **Real-time Tracking**: Track deliveries with map integration
*   **Shipment Booking:** A step-by-step process (`app/dashboard/book/`) to create new shipment requests, potentially allowing users to select different vehicle types (e.g., `[vehicleType]`). Includes confirmation (`app/dashboard/book/confirmation/`) and success (`app/dashboard/success/`) pages.
*   **Shipment Tracking:** Real-time tracking (`app/dashboard/track/`) of active shipments, likely displayed on an interactive map. Users might also view details of specific shipments (`app/dashboard/shipments/[id]/`).
*   **Shipment History:** A dedicated section (`app/dashboard/history/`) to review past shipments and their details.
*   **User Profile Management:** Allows users to view and update their personal information (`app/dashboard/profile/`).
*   **Settings:** Configuration options (`app/dashboard/settings/`) for user preferences.
*   **Responsive UI:** Built with modern components (`components/ui/`) designed to work across different screen sizes.

## Tech Stack
*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Mapping:** [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) via `react-map-gl` for tracking visualization.
*   **Icons**: [Lucide React](https://lucide.dev/)


## Core Components and API Endpoints
The project follows the Next.js App Router structure which can be seen in the [API Guide](apiguide.md)


### Core Components

```markdown project="Cargo Connect" file="README.md"
...
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```


4. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Project Structure

```plaintext
cargo-connect/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (to be implemented)
│   ├── auth/                 # Authentication pages
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── verification/     # OTP verification page
│   ├── dashboard/            # Dashboard pages
│   │   ├── book/             # Booking flow
│   │   ├── history/          # Delivery history
│   │   ├── profile/          # User profile
│   │   ├── settings/         # User settings
│   │   ├── shipments/        # Shipment management
│   │   ├── success/          # Success pages
│   │   └── track/            # Tracking page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   └── ui/                   # UI components
│       ├── badge.tsx         # Badge component
│       ├── button.tsx        # Button component
│       ├── card.tsx          # Card component
│       ├── form.tsx          # Form components
│       ├── icon-label.tsx    # Icon with label component
│       ├── map-container.tsx # Map container component
│       ├── simple-map.tsx    # Simplified map component
│       └── ...               # Other UI components
├── lib/                      # Utility functions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
│   └── images/               # Image assets
└── ...                       # Configuration files
```

## Core Components

### Authentication Flow
The authentication flow consists of three main pages:
- **Signup**: User registration with name, email, phone, and password
- **Login**: User login with email and password
- **Verification**: OTP verification after signup
### Dashboard
The dashboard is the main interface after login, featuring:
- **Home**: Overview with delivery type selection
- **Track**: Real-time tracking of active deliveries
- **History**: Past delivery records
- **Profile**: User profile management
- **Vehicle selection**: selection of vehicle type


### Booking Flow
The booking process follows these steps:
1. Selected vehicle type (motorcycle, car, van)
2. Enter pickup and delivery addresses
3. Specify package details
4. Enter sender and receiver information
5. Choose payment method
6. Confirm booking


### Tracking System
The tracking system provides:
- Real-time location of the delivery rider
- Delivery status updates
- Estimated arrival time
- Route visualization on a map


### Shipment Management
Users can:
- View all active and completed shipments
- Access detailed information about each shipment
- Track shipment status
- View shipment history


## API Endpoints can be seen in the [API Guide](apiguide.md)

### Authentication APIs

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - OTP verification


### Delivery APIs
- `GET /api/deliveries` - List deliveries
- `POST /api/deliveries` - Create delivery
- `GET /api/deliveries/:id` - Get delivery details
- `PUT /api/deliveries/:id` - Update delivery
- `GET /api/deliveries/track` - Track delivery status


### Booking APIs

- `POST /api/booking/calculate` - Calculate delivery price
- `POST /api/booking/confirm` - Confirm booking


### Shipment APIs

- `GET /api/shipments` - List shipments
- `GET /api/shipments/:id` - Get shipment details
- `GET /api/shipments/:id/tracking` - Get tracking events


### User Profile APIs

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/settings` - Update user settings



## Getting Started
### Prerequisites

*   [Node.js](https://nodejs.org/) (Check project specifics if a `.nvmrc` file exists, otherwise 18.x or higher)
*   [pnpm](https://pnpm.io/installation)
*   Mapbox account with api key for map functionality

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cargo-connect
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Set up environment variables:**
    ```bash
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
    ```
    *(Fill in the values for the environment variables in the `.env` file)*

### Running the Development Server

1.  **Start the server:**
    ```bash
    pnpm run dev
    ```
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal).


### Deploying to Vercel

1. Push code to GitHub repository
2. Import the project in Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy the application
---

## Future Improvements

- **Backend Integration**: Connect to a real database and implement API endpoints
- **Authentication**: Implement JWT authentication and user sessions
- **Payment Integration**: Add payment gateway integration
- **Push Notifications**: Implement real-time notifications for delivery updates
- **Admin Dashboard**: Create an admin interface for managing deliveries and users
- **Analytics**: Add analytics for tracking user behavior and business metrics
- **Internationalization**: Support multiple languages
- **Dark Mode**: Implement dark mode theme


## Extra detail: DB schema (Planned)

```markdown project="Cargo Connect" file="README.md"
...
```

2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```


4. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Project Structure

```plaintext
cargo-connect/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (to be implemented)
│   ├── auth/                 # Authentication pages
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── verification/     # OTP verification page
│   ├── dashboard/            # Dashboard pages
│   │   ├── book/             # Booking flow
│   │   ├── history/          # Delivery history
│   │   ├── profile/          # User profile
│   │   ├── settings/         # User settings
│   │   ├── shipments/        # Shipment management
│   │   ├── success/          # Success pages
│   │   └── track/            # Tracking page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   └── ui/                   # UI components
│       ├── badge.tsx         # Badge component
│       ├── button.tsx        # Button component
│       ├── card.tsx          # Card component
│       ├── form.tsx          # Form components
│       ├── icon-label.tsx    # Icon with label component
│       ├── map-container.tsx # Map container component
│       ├── simple-map.tsx    # Simplified map component
│       └── ...               # Other UI components
├── lib/                      # Utility functions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
│   └── images/               # Image assets
└── ...                       # Configuration files
```

## Core Components

### Authentication Flow

The authentication flow consists of three main pages:

- **Signup**: User registration with name, email, phone, and password
- **Login**: User login with email and password
- **Verification**: OTP verification after signup


### Dashboard

The dashboard is the main interface after login, featuring:

- **Home**: Overview with delivery type selection
- **Track**: Real-time tracking of active deliveries
- **History**: Past delivery records
- **Profile**: User profile management


### Booking Flow

The booking process follows these steps:

1. Select vehicle type (motorcycle, car, van)
2. Enter pickup and delivery addresses
3. Specify package details
4. Enter sender and receiver information
5. Choose payment method
6. Confirm booking


### Tracking System

The tracking system provides:

- Real-time location of the delivery rider
- Delivery status updates
- Estimated arrival time
- Route visualization on a map


### Shipment Management

Users can:

- View all active and completed shipments
- Access detailed information about each shipment
- Track shipment status
- View shipment history


## API Endpoints (Planned)

### Authentication APIs

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - OTP verification


### Delivery APIs

- `GET /api/deliveries` - List deliveries
- `POST /api/deliveries` - Create delivery
- `GET /api/deliveries/:id` - Get delivery details
- `PUT /api/deliveries/:id` - Update delivery
- `GET /api/deliveries/track` - Track delivery status


### Booking APIs

- `POST /api/booking/calculate` - Calculate delivery price
- `POST /api/booking/confirm` - Confirm booking


### Shipment APIs

- `GET /api/shipments` - List shipments
- `GET /api/shipments/:id` - Get shipment details
- `GET /api/shipments/:id/tracking` - Get tracking events


### User Profile APIs

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/settings` - Update user settings


## Environment Variables

| Variable | Description | Required
|-----|-----|-----
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox GL JS access token for maps | Yes
| `MONGODB_URI` | MongoDB connection string (for future implementation) | No
| `JWT_SECRET` | Secret for JWT authentication (for future implementation) | No


## Database Schema (Planned)

### Users Collection

```json
{
  "_id": "ObjectId",
  "fullName": "String",
  "email": "String",
  "phone": "String",
  "password": "String (hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Deliveries Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "trackingNumber": "String",
  "vehicleType": "String (motorcycle, car, van)",
  "packageType": "String",
  "isFragile": "Boolean",
  "pickupAddress": "String",
  "deliveryAddress": "String",
  "senderDetails": {
    "name": "String",
    "phone": "String"
  },
  "receiverDetails": {
    "name": "String",
    "phone": "String"
  },
  "status": "String (pending, picked_up, in_transit, delivered)",
  "paymentMethod": "String",
  "price": "Number",
  "createdAt": "Date",
  "estimatedDelivery": "Date"
}
```

### Shipments Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "trackingNumber": "String",
  "origin": "String",
  "destination": "String",
  "status": "String",
  "carrier": "String",
  "weight": "String",
  "dimensions": "String",
  "service": "String",
  "createdAt": "Date",
  "estimatedDelivery": "Date"
}
```

### Tracking Events Collection

```json
{
  "_id": "ObjectId",
  "deliveryId": "ObjectId",
  "status": "String",
  "location": "String",
  "coordinates": {
    "latitude": "Number",
    "longitude": "Number"
  },
  "timestamp": "Date"
}
```




*This README provides a functional overview. For deeper implementation details, refer to the code comments and specific module structures.*


