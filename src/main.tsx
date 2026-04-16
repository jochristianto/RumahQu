import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerAppServiceWorker } from "@/lib/browser-notifications";

function markAppMounted() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-rumahqu-mounted", "true");
  window.dispatchEvent(new Event("rumahqu:mounted"));
}

void registerAppServiceWorker();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(<App />);
markAppMounted();
