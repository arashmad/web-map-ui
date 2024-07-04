// Import main css style
import "./index.css";

// Import node packages
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Context
import MapContextProvider from "./context/map.context.tsx";

// Custom components
import router from "./Routes/Routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MapContextProvider>
    <RouterProvider router={router} />
  </MapContextProvider>
);
