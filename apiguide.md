# API Guide for Cargo Connect 

This guide outlines the necessary API endpoints inferred from the current frontend application structure and prepared components.

## API Implementation Strategy

The frontend is prepared assuming the API will be built using **Next.js API Route Handlers** within the `app/api/` directory structure. Frontend components will use relative paths (e.g., `/api/auth/login`) to call these endpoints.

## Core API Endpoints (Required by Current Frontend)

These endpoints correspond to functionality already present or prepared in the frontend pages.

### Authentication (`app/api/auth/...`)

*   `POST /api/auth/signup`
    *   **Purpose:** User registration.
    *   **Used in:** `app/auth/signup/page.tsx` (handleSubmit)
    *   **Request Body (Example):** `{ fullName, email, phone, password }`
    *   **Response (Example):** `{ success: true }` or `{ success: false, error: { message: "..." } }`
*   `POST /api/auth/login`
    *   **Purpose:** User login.
    *   **Used in:** `app/auth/login/page.tsx` (handleSubmit)
    *   **Request Body (Example):** `{ email, password }`
    *   **Response (Example):** `{ success: true, token: "...", user: { id, name } }` or `{ success: false, error: { message: "..." } }`
*   `POST /api/auth/verify`
    *   **Purpose:** Verify OTP or token sent after signup.
    *   **Used in:** `app/auth/verification/page.tsx` (handleSubmit)
    *   **Request Body (Example):** `{ otp, /* maybe email/userId */ }`
    *   **Response (Example):** `{ success: true }` or `{ success: false, error: { message: "Invalid code" } }`
*   `POST /api/auth/resend-otp` (or similar)
    *   **Purpose:** Resend verification OTP/token.
    *   **Used in:** `app/auth/verification/page.tsx` (handleResend)
    *   **Request Body (Example):** `{ /* maybe email/userId */ }`
    *   **Response (Example):** `{ success: true, message: "Code resent" }`
*   `POST /api/auth/change-password` (or similar)
    *   **Purpose:** Allow logged-in user to change their password.
    *   **Used in:** `app/dashboard/profile/page.tsx` (handleChangePassword modal)
    *   **Request Body (Example):** `{ currentPassword, newPassword }`
    *   **Response (Example):** `{ success: true }`

### User Profile & Settings (`app/api/user/...`)

*   `GET /api/user/profile`
    *   **Purpose:** Fetch profile data for the logged-in user.
    *   **Used in:** `app/dashboard/profile/page.tsx` (useEffect), `app/dashboard/page.tsx` (getDashboardData)
    *   **Response (Example):** `{ success: true, profile: { id, name, email, phone, address, memberSince } }`
*   `PUT /api/user/profile`
    *   **Purpose:** Update profile data for the logged-in user.
    *   **Used in:** `app/dashboard/profile/page.tsx` (handleUpdateProfile modal)
    *   **Request Body (Example):** `{ name, email, phone, address }`
    *   **Response (Example):** `{ success: true, updatedProfile: { ... } }`
*   `GET /api/user/settings`
    *   **Purpose:** Fetch user settings (notifications, dark mode, preferences).
    *   **Used in:** `app/dashboard/settings/page.tsx` (useEffect), `app/dashboard/profile/page.tsx` (useEffect - potentially combined)
    *   **Response (Example):** `{ success: true, settings: { notificationsEnabled, darkModeEnabled, language, currency, theme, defaultPayment } }`
*   `PUT /api/user/settings` (or individual endpoints like `/api/user/settings/notifications`)
    *   **Purpose:** Update user settings (e.g., toggling notifications/dark mode).
    *   **Used in:** `app/dashboard/settings/page.tsx` (handleSettingChange)
    *   **Request Body (Example):** `{ notificationsEnabled: true }` or `{ darkModeEnabled: false }`
    *   **Response (Example):** `{ success: true }`
*   `PUT /api/user/preferences` (or combined with `/api/user/settings`)
    *   **Purpose:** Update user preferences (language, currency, etc.).
    *   **Used in:** `app/dashboard/profile/page.tsx` (handleSavePreferences modal)
    *   **Request Body (Example):** `{ language, currency, theme, defaultPayment }`
    *   **Response (Example):** `{ success: true }`
*   `DELETE /api/user/account` (or similar)
    *   **Purpose:** Delete the user's account.
    *   **Used in:** `app/dashboard/profile/page.tsx` (handleDeleteAccount modal)
    *   **Response (Example):** `{ success: true }`

### Shipments / Deliveries (`app/api/shipments/...` or `app/api/deliveries/...`)

*Note: Using "shipments" here, adjust if "deliveries" is preferred.*

*   `POST /api/shipments`
    *   **Purpose:** Create a new shipment/delivery booking.
    *   **Used in:** `app/dashboard/book/[vehicleType]/page.tsx` (handleSubmit)
    *   **Request Body (Example):** `{ vehicleType, pickupAddress, deliveryAddress, packageType, isFragile, senderDetails: { name, phone }, receiverDetails: { name, phone } }`
    *   **Response (Example):** `{ success: true, shipmentId: "...", trackingNumber: "...", estimatedDelivery: "...", price: ... }`
*   `GET /api/shipments`
    *   **Purpose:** List shipments (for history and active shipments list). Supports filtering/pagination.
    *   **Used in:** `app/dashboard/shipments/page.tsx` (useEffect), `app/dashboard/history/page.tsx` (getDeliveries), `app/dashboard/page.tsx` (getDashboardData - recent)
    *   **Query Params (Example):** `?status=active`, `?status=completed`, `?limit=10`, `?page=1`, `?sort=date_desc`
    *   **Response (Example):** `{ success: true, shipments: [ { id, trackingNumber, origin, destination, status, date, time, type } ], totalPages: ... }`
*   `GET /api/shipments/[id]`
    *   **Purpose:** Get details for a specific shipment.
    *   **Used in:** `app/dashboard/shipments/[id]/page.tsx` (useEffect)
    *   **Response (Example):** `{ success: true, shipment: { id, trackingNumber, ..., locations: { origin, destination, route }, trackingEvents: [...] } }`
*   `GET /api/shipments/[id]/tracking`
    *   **Purpose:** Get tracking information/events for a specific shipment. (Could potentially be combined with `GET /api/shipments/[id]`).
    *   **Used in:** `app/dashboard/track/page.tsx` (useEffect)
    *   **Response (Example):** `{ success: true, trackingInfo: { rider: { name, phone, location }, delivery: { pickup, destination }, route: [...], status: "...", trackingEvents: [...] } }`

### Booking Confirmation / Payment (`app/api/booking/...` or `app/api/payments/...`)

*   `POST /api/booking/confirm` (or `/api/payments/process`)
    *   **Purpose:** Confirm the booking details and potentially process payment.
    *   **Used in:** `app/dashboard/book/confirmation/page.tsx` (handleSubmit)
    *   **Request Body (Example):** `{ bookingId, paymentMethod, /* card details if applicable */ }`
    *   **Response (Example):** `{ success: true, confirmationId: "..." }` or `{ success: false, error: { message: "Payment failed" } }`

### Support (`app/api/support/...`)

*   `POST /api/support`
    *   **Purpose:** Submit a support request message.
    *   **Used in:** `app/dashboard/profile/page.tsx` (handleSubmitSupport modal)
    *   **Request Body (Example):** `{ topic, message }`
    *   **Response (Example):** `{ success: true, message: "Support request received" }`

## HTTP Methods Summary (Core Endpoints)

This table provides a quick overview of the primary HTTP methods for the core endpoints identified above. Note that some endpoints might support additional methods (like PATCH for updates) depending on the specific implementation.

| Endpoint                       | GET | POST | PUT | DELETE | Notes                                      |
| :----------------------------- | :-: | :--: | :-: | :----: | :----------------------------------------- |
| `/api/auth/signup`             | ❌  | ✅   | ❌  |   ❌   | User registration                          |
| `/api/auth/login`              | ❌  | ✅   | ❌  |   ❌   | User login                                 |
| `/api/auth/verify`             | ❌  | ✅   | ❌  |   ❌   | OTP/Token verification                     |
| `/api/auth/resend-otp`         | ❌  | ✅   | ❌  |   ❌   | Resend OTP/Token                           |
| `/api/auth/change-password`    | ❌  | ✅   | ❌  |   ❌   | Update user password                       |
| `/api/user/profile`            | ✅  | ❌   | ✅  |   ❌   | GET to fetch, PUT to update                |
| `/api/user/settings`           | ✅  | ❌   | ✅  |   ❌   | GET to fetch, PUT to update (or individual) |
| `/api/user/preferences`        | ✅  | ❌   | ✅  |   ❌   | GET (likely via settings), PUT to update   |
| `/api/user/account`            | ❌  | ❌   | ❌  |   ✅   | Delete user account                        |
| `/api/shipments`               | ✅  | ✅   | ❌  |   ❌   | GET to list, POST to create                |
| `/api/shipments/[id]`          | ✅  | ❌   | ❌  |   ❌   | GET specific shipment details              |
| `/api/shipments/[id]/tracking` | ✅  | ❌   | ❌  |   ❌   | GET tracking info (or part of `/[id]`)     |
| `/api/booking/confirm`         | ❌  | ✅   | ❌  |   ❌   | Confirm booking / Process payment          |
| `/api/support`                 | ❌  | ✅   | ❌  |   ❌   | Submit support message                     |

## Potential Future API Endpoints 

These endpoints are suggested by common application features but are not yet explicitly required by the current prepared frontend UI elements.

*   `POST /api/booking/calculate`
    *   **Purpose:** Calculate delivery price dynamically based on inputs before final booking.
    *   **Needed for:** Dynamic pricing on `app/dashboard/book/[vehicleType]/page.tsx`.
*   `GET /api/payments/methods`
    *   **Purpose:** List saved payment methods for the user.
    *   **Needed for:** Displaying saved cards on profile/settings or checkout.
*   `POST /api/payments/methods`
    *   **Purpose:** Add a new payment method.
    *   **Needed for:** "Add Payment Method" button functionality.
*   `DELETE /api/payments/methods/[methodId]`
    *   **Purpose:** Delete a saved payment method.
    *   **Needed for:** Managing saved payment methods.
*   `PUT /api/shipments/[id]` (or PATCH)
    *   **Purpose:** Update shipment details (e.g., cancel, modify address before pickup - if allowed).
    *   **Needed for:** Potential future shipment management features.
*   `GET /api/addresses` (or integration with external geocoding)
    *   **Purpose:** Search/validate addresses.
    *   **Needed for:** Address input fields in booking/profile if dynamic lookup is desired.

## General API Considerations

*   **Authentication:** Most dashboard endpoints (`/api/user/*`, `/api/shipments/*`, etc.) will require authentication (e.g., validating a JWT token).
*   **Error Handling:** Implement consistent error responses as shown in the examples below.
*   **Input Validation:** Validate all incoming request data (body, query params, path params).
*   **Data Structures:** Define clear request/response data structures (consider using shared TypeScript types if possible).

---
*(Previous examples for Request/Response, Error Handling, Auth Middleware, Implementation can remain or be updated as needed)*
