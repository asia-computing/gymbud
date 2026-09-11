import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// The GYMBUD design system: defines every --gb-* custom property the Chakra
// theme in `theme/system.js` points at. Imported first so the variables exist
// before Chakra's own generated styles resolve them.
import "../styles/gymbud.css"
import { Provider } from "./components/Provider"
import App from "./App"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
