// Import node packages
import { Outlet } from "react-router";

// Import Context Providers
import MapContextProvider from "./context/map.context";

function App() {
  return (
    <>
      <MapContextProvider>
        <Outlet />
      </MapContextProvider>
    </>
  );
}

export default App;
