// Using NEXT_PUBLIC_ for client-side accessibility
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UserRegistrationPayload {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}

// Actual response structure from POST /api/v1/users/register
export interface UserRegistrationResponse {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
}

// Types for User Login
export interface UserLoginCredentials {
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
}

export interface UserLoginResponse {
  access_token: string;
  token_type: string; // Typically "bearer"
  user: LoggedInUser;
}

export async function registerUser(payload: UserRegistrationPayload): Promise<UserRegistrationResponse> {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      throw new Error(response.statusText || 'User registration failed');
    }
    // Use a message from the error data if available, otherwise a generic one
    throw new Error(errorData?.message || `User registration failed with status: ${response.status}`);
  }

  try {
    // Assuming the success response is JSON.
    // If it's plain text as per user's .text() example, this will need to change.
    const data: UserRegistrationResponse = await response.json();
    return data;
  } catch (e) {
    // Handle cases where response.ok is true but body is not JSON or empty
    // This might happen if the API sends a 200/201 with no body or plain text
    // For now, we can return a simple success message or an empty object
    // depending on expected behavior.
    console.error('Registration successful (status ok) but failed to parse response as valid UserRegistrationResponse JSON.', e);
    throw new Error('Registration reported success, but the response from the server was not in the expected format.');
  }
}

export async function loginUser(credentials: UserLoginCredentials): Promise<UserLoginResponse> {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  const formBody = new URLSearchParams();
  formBody.append('grant_type', 'password');
  formBody.append('username', credentials.email);
  formBody.append('password', credentials.password);
  formBody.append('scope', ''); // As per Postman example, even if not strictly validated by backend for this flow

  const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error(response.statusText || 'Login failed');
    }
    // FastAPI often returns error details in a 'detail' field
    // For OAuth2PasswordRequestForm, a 401 might just return {"detail": "Incorrect username or password"}
    // or a 422 for validation errors on the form itself.
    let errorMessage = 'Login failed. Please check your credentials.';
    if (typeof errorData?.detail === 'string') {
      errorMessage = errorData.detail;
    } else if (Array.isArray(errorData?.detail)) { // For 422 validation errors
        errorMessage = errorData.detail.map((err: any) => `${err.loc?.join('/')}: ${err.msg}`).join(', ');
    } else if (errorData?.message) { // Generic message field
        errorMessage = errorData.message;
    }
    throw new Error(errorMessage);
  }

  try {
    const data: UserLoginResponse = await response.json();
    return data;
  } catch (e) {
    console.error('Login successful (status ok) but failed to parse response as valid UserLoginResponse JSON.', e);
    throw new Error('Login reported success, but the response from the server was not in the expected format.');
  }
}

export async function getCurrentUser(): Promise<LoggedInUser> {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  const token = localStorage.getItem('authToken');
  if (!token) {
    // It's important to handle this case: no token means user is not authenticated.
    // Depending on application flow, this might redirect to login or just mean no user data is fetched.
    // Throwing an error here is one way to signal this to the caller.
    throw new Error('No authentication token found. User is not logged in.');
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token, // Token from localStorage (should include "Bearer ")
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error(response.statusText || 'Failed to fetch user data');
    }
    // Handle specific errors like 401 Unauthorized
    if (response.status === 401 && errorData?.detail === "Not authenticated") {
        // Could also clear the invalid token from localStorage here
        // localStorage.removeItem('authToken');
        throw new Error('User not authenticated. Please log in again.');
    }
    throw new Error(errorData?.detail || errorData?.message || `Failed to fetch user data with status: ${response.status}`);
  }

  try {
    const data: LoggedInUser = await response.json();
    return data;
  } catch (e) {
    console.error('Successfully fetched /me (status ok) but failed to parse response as valid LoggedInUser JSON.', e);
    throw new Error('User data received from server was not in the expected format.');
  }
}
