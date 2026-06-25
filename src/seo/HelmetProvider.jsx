import { Helmet, HelmetProvider } from "react-helmet-async";

// Convenience wrapper: keep a single provider at the app root.
export function AppHelmetProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export { Helmet };

