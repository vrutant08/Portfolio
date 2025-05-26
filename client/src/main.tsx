import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import GSAP and ScrollTrigger using dynamic imports to ensure proper bundling
import("gsap").then(({ gsap }) => {
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
  });
});

createRoot(document.getElementById("root")!).render(<App />);
