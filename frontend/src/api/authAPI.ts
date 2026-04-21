import { UserCreate, UserLogin } from "../types/user";

// If you have issue with CORS try swapping localhost to 127.0.0.1 or vice versa
const baseURL = "http://localhost:8000/auth";
// const baseURL = "http://127.0.0.1:8000/auth";

export async function login(user: UserLogin) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: user.email, // `username` is required for OAuth2PasswordRequestForm
        password: user.password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log();
      throw new Error(errorData.detail || "Login Failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error; // You can handle this error in the calling function
  }
}

export async function logout() {
  await fetch(`${baseURL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function register(user: UserCreate) {
  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export function getCSRFToken() {
  const name = "csrf_token=";
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

export async function checkLoginStatus() {
  try {
    const response = await fetch(`${baseURL}/check_login_status`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();

      // Check the message from the backend
      if (data.message === "User is logged in") {
        return true;
      } else {
        return false;
      }
    } else {
      console.error(`Error: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    // Catch any errors in the request (network errors, invalid JSON, etc.)
    console.error("Error checking login status:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const response = await fetchWithAuthRetry(`${baseURL}/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Unauthenticated");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchWithAuthRetry(
  input: RequestInfo,
  init?: RequestInit,
  retry = true,
): Promise<Response> {
  const csrfToken = getCSRFToken();

  // Ensure headers object exists and add CSRF token if method is not GET
  init = init || {};
  init.credentials = "include";
  init.headers = {
    ...(init.headers || {}),
    ...(init.method && init.method.toUpperCase() !== "GET"
      ? { "X-CSRF-Token": csrfToken }
      : {}),
  };

  let response = await fetch(input, init);

  if (response.status === 401 && retry) {
    // Try refreshing the access token
    const refreshResponse = await fetch(`${baseURL}/refresh`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
    });

    if (refreshResponse.ok) {
      // Token refreshed, retry original request once
      response = await fetch(input, init);
      return response;
    } else {
      // Refresh failed, don't retry again
      return response;
    }
  }

  return response;
}
