# API Guide for Cargo Connect

This guide outlines the necessary API endpoints based on the backend FastAPI application and the frontend components.

## API Implementation Strategy

The frontend interacts with a separate **FastAPI backend application**. Frontend components use the full URL constructed from the `NEXT_PUBLIC_API_BASE_URL` environment variable (e.g., `http://127.0.0.1:8000`) and the specific API path (e.g., `/api/v1/users/register`).

**Base Path:** All backend routes are prefixed with `/api/v1`.

## Core API Endpoints (Implemented in Backend)

These endpoints correspond to functionality implemented in the backend and used by the frontend.

### Authentication (`/api/v1/users/...`)

*   `POST /api/v1/users/register`
    *   **Purpose:** User registration.
    *   **Used in:** `app/auth/signup/page.tsx` (handleSubmit)
    *   **Request Body (JSON):** `{ "full_name": "string", "email": "string", "phone_number": "string", "password": "string" }`
    *   **Response (Success - 201):** `{ "id": integer, "full_name": "string", "email": "string", "phone_number": "string" }`
    *   **Response (Error - 422):** Validation error details (e.g., `{ "detail": [...] }`)
    *   **Notes:** Sends a verification email with a token link upon successful registration.
*   `POST /api/v1/users/login`
    *   **Purpose:** User login.
    *   **Used in:** `app/auth/login/page.tsx` (handleSubmit)
    *   **Request Body (Form Data):** `username=user@example.com&password=yourpassword` (Content-Type: `application/x-www-form-urlencoded`)
    *   **Response (Success - 200):** `{ "access_token": "string", "token_type": "bearer", "user": { "id": integer, "full_name": "string", "email": "string", "phone_number": "string" } }`
    *   **Response (Error - 401/422):** Authentication failure or validation error.
*   `POST /api/v1/users/verify-email/{token}`
    *   **Purpose:** Verify user's email address using the token from the verification link.
    *   **Used in:** Backend handles this when user clicks the email link. Frontend might have a confirmation page or redirect upon success.
    *   **Response (Success - 200):** `{ "message": "Email verified successfully" }`
    *   **Response (Error - 400/404):** Invalid/expired token or user not found.
*   `POST /api/v1/users/resend-verification`
    *   **Purpose:** Resend the verification email. **Requires authentication.**
    *   **Used in:** Not currently implemented in frontend verification page. Could be added to login or profile if user is logged in but not verified.
    *   **Response (Success - 200):** `{ "message": "Verification email sent successfully" }`
    *   **Response (Error - 400):** Email already verified.
*   `GET /api/v1/users/me`
    *   **Purpose:** Get information about the currently authenticated and verified user. **Requires authentication.**
    *   **Used in:** Potentially in `app/dashboard/profile/page.tsx`, `app/dashboard/page.tsx`, etc. to fetch user data after login.
    *   **Response (Success - 200):** `{ "id": integer, "full_name": "string", "email": "string", "phone_number": "string" }`
    *   **Response (Error - 401/403):** Not authenticated or not verified.

*(Note: Endpoints for password change, profile update, settings, etc. inferred from the frontend UI are not present in the provided backend code (`user.py`) and would need to be added to the backend if required.)*

### Other Potential Endpoints (Inferred from Frontend UI)

The following endpoints are suggested by the frontend UI but are **not** defined in the provided backend `user.py`. They would need to be implemented in the backend.

*   `POST /api/v1/users/change-password` (Requires Auth)
*   `GET /api/v1/users/profile` (Likely same as `/api/v1/users/me`)
*   `PUT /api/v1/users/profile` (Requires Auth)
*   `GET /api/v1/users/settings` (Requires Auth)
*   `PUT /api/v1/users/settings` (Requires Auth)
*   `DELETE /api/v1/users/account` (Requires Auth)
*   `POST /api/v1/shipments` (Requires Auth)
*   `GET /api/v1/shipments` (Requires Auth)
*   `GET /api/v1/shipments/[id]` (Requires Auth)
*   `GET /api/v1/shipments/[id]/tracking` (Requires Auth)
*   `POST /api/v1/booking/confirm` (Requires Auth)
*   `POST /api/v1/support` (Requires Auth)

## HTTP Methods Summary (Implemented Backend Endpoints)

| Endpoint                          | GET | POST | PUT | DELETE | Notes                                      |
| :-------------------------------- | :-: | :--: | :-: | :----: | :----------------------------------------- |
| `/api/v1/users/register`          | ❌  | ✅   | ❌  |   ❌   | User registration                          |
| `/api/v1/users/login`             | ❌  | ✅   | ❌  |   ❌   | User login (Form Data)                     |
| `/api/v1/users/verify-email/{token}`| ❌  | ✅   | ❌  |   ❌   | Email verification via link                |
| `/api/v1/users/resend-verification`| ❌  | ✅   | ❌  |   ❌   | Resend email (Requires Auth)             |
| `/api/v1/users/me`                | ✅  | ❌   | ❌  |   ❌   | Get current user info (Requires Auth)    |

## General API Considerations

*   **Authentication:** Most dashboard/user-specific endpoints require authentication. The backend uses JWT Bearer tokens obtained via the `/login` endpoint. Frontend requests must include the `Authorization: Bearer <token>` header.
*   **Error Handling:** The backend uses standard HTTP status codes (e.g., 422 for validation, 401 for unauthorized, 404 for not found, 500 for internal errors) and often provides details in the JSON response body (`{"detail": ...}`).
*   **Input Validation:** FastAPI handles input validation based on Pydantic schemas defined in the backend.
*   **CORS:** The backend is configured with `CORSMiddleware` allowing `allow_origins=["*"]`, which should permit requests from the frontend development server (`http://localhost:3000`) and deployed frontend origins.

---
*(Previous examples can be removed or updated)*
