import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Initialise Firebase (analytics) once the page has loaded, so it doesn't delay first paint
const loadFirebase = () => import("@/lib/firebase");
if (document.readyState === "complete") {
  loadFirebase();
} else {
  window.addEventListener("load", loadFirebase, { once: true });
}
