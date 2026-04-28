export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
}

export function clearAuthStorage() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("isLoggedIn");

  window.dispatchEvent(
    new CustomEvent("authChanged", { detail: { loggedIn: false } })
  );
}
