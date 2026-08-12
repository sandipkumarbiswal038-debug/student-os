const DEPLOYED_API_URL = "https://student-os-1-59k0.onrender.com";
// In local development, use Vite's proxy so API calls reach the deployed
// backend without a cross-origin browser request. Deployments use the public
// backend URL unless VITE_API_BASE_URL overrides it.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/backend" : DEPLOYED_API_URL)
).replace(/\/$/, "");

// The deployed backend exposes one login route.  Keeping this configurable
// avoids a failed request before every successful login when environments use
// different routes.
const LOGIN_API_PATH = import.meta.env.VITE_LOGIN_API_PATH || "/custom-login/api-login/";

const toError = async (response) => {
  const payload = await response.json().catch(() => null);
  if (payload?.detail) return payload.detail;
  if (payload && typeof payload === "object") {
    return Object.entries(payload)
      .map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("; ");
  }
  return `Request failed (${response.status}).`;
};

export const apiRequest = async (path, options = {}) => {
  const requestOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };
  let response;

  // Render can return a short-lived 502 while a sleeping instance wakes up.
  // Retry once so a faculty/student does not need to re-enter credentials.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      response = await fetch(`${API_BASE_URL}${path}`, requestOptions);
    } catch {
      if (attempt === 0) {
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
        continue;
      }
      throw new Error("Unable to reach the login server. Please try again shortly.");
    }

    if (response.status !== 502 || attempt === 1) break;
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
  }

  if (!response.ok) {
    const error = new Error(await toError(response));
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
};

export const loginUser = async (email, password, role) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ college_email: email.trim().toLowerCase(), password, role }),
  };

  const data = await apiRequest(LOGIN_API_PATH, options);

  // Keep the small Axios-like shape used by the existing login pages.
  return { data };
};

// Django REST Framework token logins commonly return `token`/`key`, while JWT
// logins return `access`/`access_token`. Preserve the matching auth scheme.
export const authSchemeFrom = (data) =>
  data?.access || data?.access_token ? "Bearer" : "Token";

export const authorizationHeader = (token) => {
  if (!token) return {};
  const scheme = localStorage.getItem("authScheme") || "Token";
  return { Authorization: `${scheme} ${token}` };
};

export const authenticatedRequest = (path, token, options = {}) =>
  apiRequest(path, {
    ...options,
    headers: {
      ...authorizationHeader(token),
      ...(options.headers || {}),
    },
  });

export { API_BASE_URL };
