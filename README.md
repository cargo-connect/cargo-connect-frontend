# Cargo Connect
A modern logistics and delivery management platform built with Next.js.

![Cargo Connect Logo](public/images/logo.png)

## Overview

Cargo Connect is a comprehensive logistics platform that connects users with delivery services. The application allows users to book deliveries, track shipments in real-time, manage their delivery history, and maintain their profile information.

## Current Status (April 11, 2025)

The frontend application structure and UI components are largely complete. Key pages have been prepared with loading states, error handling, and placeholder structures for API calls. However, the application currently uses **simulated data and placeholder API logic**.

**Next Steps:** The primary next step is the implementation of the backend API endpoints (as outlined in `apiguide.md`) and the integration of the frontend components to make real API calls.

## Features (Implemented UI)
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

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
*   [pnpm](https://pnpm.io/installation) (Package manager used in this project)
*   Mapbox account and access token for map functionality.

### Installation & Setup

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
    Create a `.env.local` file in the root directory and add your Mapbox token:
    ```plaintext
    # .env.local
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
    ```
    *(Note: The `NEXT_PUBLIC_` prefix is required for client-side access)*

### Running the Development Server

1.  **Start the server:**
    ```bash
    pnpm run dev
    ```
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal).

## Project Structure Overview

```plaintext
cargo-connect/
├── app/                      # Next.js App Router pages and layouts
│   ├── api/                  # API routes (to be implemented by backend)
│   ├── auth/                 # Authentication pages (login, signup, verify)
│   ├── dashboard/            # Authenticated user dashboard sections
│   │   ├── book/             # Booking flow (vehicle selection, confirmation)
│   │   ├── history/          # Delivery history list
│   │   ├── profile/          # User profile view/edit
│   │   ├── settings/         # User settings page
│   │   ├── shipments/        # Shipments list and details ([id])
│   │   ├── success/          # Success confirmation pages
│   │   └── track/            # Shipment tracking page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable React components
│   └── ui/                   # UI library components (e.g., Button, Card)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions (e.g., cn for classnames)
├── public/                   # Static assets (images, fonts)
├── styles/                   # Additional styles (if needed beyond globals/Tailwind)
├── .env.local                # Local environment variables (ignored by git)
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # pnpm lockfile
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Core Frontend Features & Flows

### Authentication Flow
- **Signup**: `app/auth/signup/` - User registration form.
- **Login**: `app/auth/login/` - User login form.
- **Verification**: `app/auth/verification/` - OTP/Token verification form.

### Dashboard
- **Home**: `app/dashboard/` - Overview, delivery type selection, recent activity summary.
- **Profile**: `app/dashboard/profile/` - View/edit user details, change password, manage preferences, delete account.
- **Settings**: `app/dashboard/settings/` - Toggle notifications/dark mode, links to other settings.
- **History**: `app/dashboard/history/` - List of past shipments/deliveries.
- **Shipments**: `app/dashboard/shipments/` - List of active/completed shipments.
- **Shipment Details**: `app/dashboard/shipments/[id]/` - Detailed view of a specific shipment.
- **Track Shipment**: `app/dashboard/track/` - Real-time tracking map and timeline for a specific shipment (requires `?id=` query param).

### Booking Flow
1.  Select vehicle type from Dashboard Home (`app/dashboard/`).
2.  Fill booking details (`app/dashboard/book/[vehicleType]/`).
3.  Confirm details and payment method (`app/dashboard/book/confirmation/`).
4.  View success page (`app/dashboard/success/booking/`).

## API Integration Status & Handover Notes

*   **Frontend Preparation:** Key frontend pages (listed above) have been prepared to handle API interactions. This includes:
    *   Adding `loading` and `error` states using `useState`.
    *   Structuring API call logic within `useEffect` (for data fetching) or form handlers (`handleSubmit`, etc.) using `async/await` and `try...catch`.
    *   Implementing UI feedback for loading and error states (e.g., disabling buttons, showing messages).
*   **Placeholder Logic:** Currently, the API call sections contain `console.log` statements and simulated delays/data instead of actual `fetch` calls.
*   **Next Step (Backend):** Implement the API endpoints detailed in the [API Guide](apiguide.md).
*   **Next Step (Frontend):** Replace the placeholder comments and simulated logic in the prepared frontend components with actual `fetch` calls to the implemented backend endpoints. Ensure request bodies and response handling match the finalized API contract.
*   **TypeScript Errors:** Note that the editor may currently show spurious TypeScript errors (e.g., "Cannot find module", incorrect prop errors). These seem related to the TS server/environment and often resolve after restarting the editor or TS server. The code structure itself should align with the component definitions.

## API Endpoints

Refer to the [**API Guide (apiguide.md)**](./apiguide.md) for a detailed breakdown of required and potential future API endpoints, including methods, purpose, usage locations, and example request/response structures.

## Environment Variables

| Variable                        | Description                                     | Required | Used By      |
| :------------------------------ | :---------------------------------------------- | :------: | :----------- |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox GL JS access token for map components    |   Yes    | Client-side  |
| `MONGODB_URI`                   | MongoDB connection string                       |    No    | Backend (TBD)|
| `JWT_SECRET`                    | Secret key for JWT session/token validation     |    No    | Backend (TBD)|

## Database Schema (Planned)

*(Refer to `apiguide.md` or implement based on backend requirements)*

## Future Improvements

*(List remains relevant)*
- **Backend Integration**: Connect to a real database and implement API endpoints
- **Authentication**: Implement JWT authentication and user sessions
- **Payment Integration**: Add payment gateway integration
- **Push Notifications**: Implement real-time notifications for delivery updates
- **Admin Dashboard**: Create an admin interface for managing deliveries and users
- **Analytics**: Add analytics for tracking user behavior and business metrics
- **Internationalization**: Support multiple languages
- **Dark Mode**: Implement dark mode theme (frontend toggle exists, needs theme provider integration)

---

*This README provides a functional overview. For deeper implementation details, refer to the code comments and specific module structures.*
