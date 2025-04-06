# Cargo Connect

Cargo Connect is a web application designed to streamline the process of booking and managing cargo shipments. It acts as a platform connecting users who need to ship goods with transportation services. Users can register, log in, book various types of shipments, track their progress in real-time, view their shipment history, and manage their account details through a user-friendly dashboard interface.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Mapping:** Likely [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) via `react-map-gl` for tracking visualization.

## Features

This application provides a comprehensive workflow for cargo shipment management:

*   **User Authentication:** Secure sign-up and login (`app/auth/`) process to access the dashboard.
*   **Dashboard Overview:** A central hub (`app/dashboard/`) for accessing all user-specific features after login.
*   **Shipment Booking:** A step-by-step process (`app/dashboard/book/`) to create new shipment requests, potentially allowing users to select different vehicle types (e.g., `[vehicleType]`). Includes confirmation (`app/dashboard/book/confirmation/`) and success (`app/dashboard/success/`) pages.
*   **Shipment Tracking:** Real-time tracking (`app/dashboard/track/`) of active shipments, likely displayed on an interactive map. Users might also view details of specific shipments (`app/dashboard/shipments/[id]/`).
*   **Shipment History:** A dedicated section (`app/dashboard/history/`) to review past shipments and their details.
*   **Profile Management:** Allows users to view and update their personal information (`app/dashboard/profile/`).
*   **Settings:** Configuration options (`app/dashboard/settings/`) for user preferences.
*   **Responsive UI:** Built with modern components (`components/ui/`) designed to work across different screen sizes.

## Project Structure

The project follows the Next.js App Router structure:

*   `app/`: Contains all routes, pages, and layouts.
    *   The root layout (`app/layout.tsx`) defines the main page structure.
    *   `app/page.tsx` is the public landing page.
    *   `app/auth/`: Handles authentication flows (login, signup).
    *   `app/dashboard/`: Protected routes accessible only after login, organized by feature (booking, tracking, history, profile, settings). Dynamic routes like `[vehicleType]` and `[id]` handle variable parameters.
*   `components/`: Reusable React components.
    *   `components/ui/`: Core UI elements from shadcn/ui, providing a consistent look and feel.
*   `hooks/`: Custom React hooks encapsulating reusable logic (e.g., `use-toast`).
*   `lib/`: Utility functions (e.g., `lib/utils.ts` likely contains helper functions like `cn` for class names).
*   `public/`: Static assets (images, logos) directly served by the web server.
*   `styles/`: Global CSS styles (`globals.css`).

## Getting Started

Follow these steps to get the project running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Check project specifics if a `.nvmrc` file exists, otherwise latest LTS recommended)
*   [pnpm](https://pnpm.io/installation)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cargo-connect
    ```
    *(Replace `<repository-url>` with the actual URL if cloning)*
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Development Server

1.  **Start the server:**
    ```bash
    pnpm run dev
    ```
2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal).

## Environment Variables

*(Optional: If the application requires environment variables, e.g., for API keys, database connections, or map tokens, list them here with instructions on how to set them up, typically using a `.env.local` file.)*

---

*This README provides a functional overview. For deeper implementation details, refer to the code comments and specific module structures.*
